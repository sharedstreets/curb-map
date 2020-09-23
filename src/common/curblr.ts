
import {Feature, LineString, Point, FeatureCollection} from '@turf/helpers'

function convertTimeSrtToMinOfDay(timeStr:string):number {
    var timeParts = timeStr.split(":");
    return (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);
}

export function filterTimeAndDay(feature:CurbFeature, filterDayOfWeek:string, filterTimeStr:string):boolean {
    var filterTime = convertTimeSrtToMinOfDay(filterTimeStr);

    for(var regulation of feature.properties.regulations) {
        if(regulation.timeSpans && regulation.timeSpans.length) {
            for(var timeSpan of regulation.timeSpans) {
                if(timeSpan.daysOfWeek) {
                    for(var day of timeSpan.daysOfWeek.days) {
                        if(day == filterDayOfWeek) {
                            if(timeSpan.timesOfDay) {
                                for(var times of timeSpan.timesOfDay) {
                                    var from = convertTimeSrtToMinOfDay(times.from);
                                    var to = convertTimeSrtToMinOfDay(times.to);
                                    if(filterTime >= from && filterTime <= to) {
                                        return true;
                                    }
                                }
                            }
                            else
                                return false;
                        }
                    }
                }
            }
        }
        else
            return true;
    }

    return false;
}

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
    timeZone?:string;
    currency?:string;
    authority?:Authority;
}

export class Rule  {
    activity:"parking" | "no parking" | "stopping" | "no stopping" | "loading" | "no loading";
    reason?:string;
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
    priority:number;
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
