
import {Feature, LineString, Point, FeatureCollection} from '@turf/helpers'

function convertTimeSrtToMinOfDay(timeStr:string):number {
    var timeParts = timeStr.split(":");
    return (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);
}

export function filterTimeAndDay(regulation: Regulation, filterDayOfWeek: string, filterTimeStr: string): boolean {
    var filterTime = convertTimeSrtToMinOfDay(filterTimeStr);
    if (regulation.timeSpans && regulation.timeSpans.length) {
        for (var timeSpan of regulation.timeSpans) {
            var days:string[] = [];
            if (timeSpan.daysOfWeek == undefined) {
                days = days.concat(["mo", "tu", "we", "th", "fr", "sa", "su"]);
            } else {
                days = days.concat(timeSpan.daysOfWeek.days);
            }
            for (var day of days) {
                if (day == filterDayOfWeek) {
                    if (timeSpan.timesOfDay) {
                        for (var times of timeSpan.timesOfDay) {
                            var from = convertTimeSrtToMinOfDay(times.from);
                            var to = convertTimeSrtToMinOfDay(times.to);
                            if (filterTime >= from && filterTime <= to) {
                                return true;
                            }
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
        }
        return false;
    } else {
        return true;
    }
}



export function filterCurblrData (
    data: CurbFeatureCollection,
    day: string,
    time: string
  ): CurbFeatureCollection {
    let filteredData = new CurbFeatureCollection();
    filteredData.manifest = data.manifest;
    let sortedCurbFeatures = new CurbFeaturesMap();

    for (var curbFeature of data.features) {
        let filteredFeatureDefault = new CurbFeature();
        filteredFeatureDefault.geometry = curbFeature.geometry;
        filteredFeatureDefault.properties.location = {...curbFeature.properties.location};
        let defaultRegulation = new Regulation();
        defaultRegulation.rule = new Rule();
        defaultRegulation.rule.priorityCategory = "free parking";  // defaults to free parking. TODO make configurable
        defaultRegulation.rule.activity = "parking";  // defaults to free parking. TODO make configurable
        filteredFeatureDefault.properties.regulations.push(defaultRegulation);
        sortedCurbFeatures.add(filteredFeatureDefault);

        for (const regulation of curbFeature.properties.regulations) {
            if (!filterTimeAndDay(regulation, day, time)) continue;

            let filteredFeature = new CurbFeature();
            filteredFeature.geometry = curbFeature.geometry;
            filteredFeature.properties.location = {...curbFeature.properties.location};
            filteredFeature.properties.regulations.push(regulation);
            sortedCurbFeatures.add(filteredFeature)
        }
    }


    for(let curbFeatures of sortedCurbFeatures.values()){
        let filteredFeatures: CurbFeature[] = [];

        curbFeatures.sort((a, b) => data.manifest.priorityHierarchy.indexOf(a.properties.regulations[0].rule.priorityCategory) - data.manifest.priorityHierarchy.indexOf(b.properties.regulations[0].rule.priorityCategory));

        while(curbFeatures.length>0){
            let curbFeature = curbFeatures.shift()
            if(!curbFeature) continue;
            let start = curbFeature.properties.location.shstLocationStart;
            let end = curbFeature.properties.location.shstLocationEnd;
            for(let alreadyFilteredFeatures of filteredFeatures){
                if(end <= alreadyFilteredFeatures.properties.location.shstLocationStart
                    || start >= alreadyFilteredFeatures.properties.location.shstLocationEnd){
                    continue;
                } else if(start < alreadyFilteredFeatures.properties.location.shstLocationStart
                    && end > alreadyFilteredFeatures.properties.location.shstLocationEnd){
                        let splitFeature = JSON.parse(JSON.stringify(curbFeature));      //TODO: use beter deep copy
                        splitFeature.properties.location.shstLocationStart = alreadyFilteredFeatures.properties.location.shstLocationEnd;
                        curbFeatures.unshift(splitFeature);
                        end = alreadyFilteredFeatures.properties.location.shstLocationStart;
                } else if(start < alreadyFilteredFeatures.properties.location.shstLocationStart){
                    end = alreadyFilteredFeatures.properties.location.shstLocationStart;
                } else if(end > alreadyFilteredFeatures.properties.location.shstLocationEnd){
                    start = alreadyFilteredFeatures.properties.location.shstLocationEnd;
                } else {
                    start=end;
                }
            }

            curbFeature.properties.location.shstLocationStart=start;
            curbFeature.properties.location.shstLocationEnd=end;
            if(start<end){
                filteredFeatures.push(curbFeature);
            }
        }
        filteredData.features.push(...filteredFeatures.reverse());
    }

    return filteredData;
};

export class Location {
    shstRefId:string;
    shstLocationStart:number;
    shstLocationEnd:number;
    sideOfStreet:"left"|"right";
    objectId?:string;
    derivedFrom?:string;
    marker?:string;
    baysAngle?: "parallel" | "perpendicular" | "diagonal";
    baysCount?:number;
    streetName?:string;
}

export class Authority {
    name?:string;
    url?:string;
    phone?:string;
}

export class Manifest {
    createdDate?:string; // should this be a full timestamp? ISO format
    lastUpdatedDate?:string; // should this be a full timestamp? ISO format
    curblrVersion?:string;
    priorityHierarchy:Array<string>;
    timeZone?:string;
    currency?:string;
    authority?:Authority;
}

export class Rule  {
    activity:"parking" | "no parking" | "stopping" | "no stopping" | "loading" | "no loading";
    priorityCategory?:string;
    maxStay?:number
    noReturn?:number
    payment?:boolean;
    authority?:Authority; // changed v1 draft spec to object to simplify inclusion in rule
}

export class DaysOfWeek {
    days:Array<"mo"|"tu"|"we"|"th"|"fr"|"sa"|"su">;
    occurrencesInMonth?:Array<"1st"|"2nd"|"3rd"|"4th"|"5th"|"last">
}

export class TimesOfDay {
    from:string;
    to:string;
}

export interface DesignatedPeriods {
    name:string;
    apply:"only during"|"except during";
}

export class TimeSpan {
    effectiveDates?:[{to:string, from:string}];
    daysOfWeek:DaysOfWeek;
    daysOfMonth?:Array<string|"even"|"odd"|"last">;
    timesOfDay?:Array<TimesOfDay>;
    designatedPeriods?:Array<DesignatedPeriods>
}

export class UserClass {
    classes?:string[];
    subclasses?:string[];
    maxHeight?:number;
    maxLength?:number;
    maxWeight?:number;
    minHeight?:number;
    minLength?:number;
    minWeight?:number;
}

export class Rates {
    fees?:number[] = [];
    durations?:number[] = [];
    timeSpans?:TimeSpan[] = [];
}

export class Payment {
    rates?:Rates;
    methods?:string[] = [];
    forms?:string[] = [];
    operator?:string;
    phone?:string;
    deviceID?:string;
}

export class Regulation {
    rule:Rule;
    timeSpans?:TimeSpan[] = [];
    userClasses?:UserClass[] = [];
    payment?:Payment;
}

export class CurbProperties {
    location:Location;
    regulations:Regulation[] = [];
}

export class CurbFeature implements Feature<LineString, CurbProperties> {
    type:"Feature";
    geometry:LineString;
    properties:CurbProperties;

    constructor() {
        this.properties = new CurbProperties();
    }
}

export class CurbFeatureCollection implements FeatureCollection<LineString, CurbProperties> {
    type:"FeatureCollection";
    manifest?:Manifest;
    features:CurbFeature[] = [];
}

class CurbFeaturesMap extends Map<string, CurbFeature[]>{
    add(curbFeature:CurbFeature){
        let shstRefId = curbFeature.properties.location.shstRefId + curbFeature.properties.location.sideOfStreet;
        if(this.has(shstRefId)){
            this.get(shstRefId)?.push(curbFeature);
        } else {
            this.set(shstRefId, [curbFeature]);
        }
    }
}
