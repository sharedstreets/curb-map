import { GlobalState } from "../common/types";
import { DvaModelBuilder } from "dva-model-creator";
import { time, day, priority, activity } from "../actions/filter";
import { fetchGeoData, loadGeoData } from "../actions/geo"

// import geojsonData from '@/assets/data/mtl-subset-segment-rosemont.curblr.json';
// import geojsonData from '@/assets/data/mtl-subset-segment.curblr.json';
// import geojsonData from '@/assets/data/mtl-subset-segment-Mercier-Hochelaga-Maisonneuve.curblr.json';
import geojsonData from '@/assets/data/mtl-subset-segment-Villeray-Saint-Michel.curblr.json';
// import geojsonData from '@/assets/data/mtl-subset-segment-Ville-Marie.curblr.json';
// import geojsonData from '@/assets/data/mtl-subset-segment-Plateau-Mont-Royal.curblr.json';
// import geojsonData from '@/assets/data/mtl-subset-segment-Ahuntsic - Cartierville.curblr.json';
// import geojsonData from '@/assets/data/mtl-subset-segment-Outremont.curblr.json';

// import geojsonData from '@/assets/data/qc-subset-segment-full.curblr.json';
// import geojsonData from '@/assets/data/qc-subset-segment-saint-sauveur.curblr.json';
// import geojsonData from '@/assets/data/qc-subset-segment-vieux-Moulin.curblr.json';

import { CurbFeature, CurbFeatureCollection, filterTimeAndDay } from '@/common/curblr';
import { FeatureCollection, featureCollection, feature, LineString } from '@turf/helpers';

import {fromJS} from 'immutable';
import mapStyle from '../assets/style.json';

// fix to avoid useless warnings about action type namespace
const errorLog = console.error;
console.error = (...args : any[]) => {
    if (args[0] && args[0].indexOf('[sagaEffects.put]') === -1) {
        errorLog.call(console, ...args);
    }
};

const geoDataFiles = [
    // Autres
    // { path: "downtown_portland_2020-01-06.curblr.json", label: "Portland 2020-01" },
    // { path: "downtown_portland_2020-02-20.curblr.json", label: "Portland 2020-02" },
    // { path: "la.curblr.json", label: "LA" },

    { path: "mtl-subset-segment_all.curblr.json", label: "MTL - ALL" }, //last from data convert
    // { path: "mtl-subset-segment.curblr.json", label: "mtl" }, //trop lourd pour etre affiche

    { path: "mtl-parco-Outremont.filtred.curblr.json", label: "mtl-parco - Outremont"},
    { path: "mtl-parco-Ville-Marie.filtred.curblr.json", label: "mtl-parco - Ville-Marie (lent)"}, //> 10 mo
    { path: "mtl-parco-Ahuntsic-Cartierville.filtred.curblr.json", label: "mtl-parco - Ahuntsic-Cartierville"},                  
    { path: "mtl-parco-Côte-des-Neiges-Notre-Dame-de-Grâce.filtred.curblr.json", label: "mtl-parco - Côte-des-Neiges-Notre-Dame-de-Grâce"},       
    { path: "mtl-parco-Lachine.filtred.curblr.json", label: "mtl-parco - Lachine"},                                
    { path: "mtl-parco-Le-Plateau-Mont-Royal.filtred.curblr.json", label: "mtl-parco - Le-Plateau-Mont-Royal (un peu lent)"}, // > 10 mo                 
    { path: "mtl-parco-Le-Sud-Ouest.filtred.curblr.json", label: "mtl-parco - Le-Sud-Ouest"}, 
    { path: "mtl-parco-Mercier-Hochelaga-Maisonneuve.filtred.curblr.json", label: "mtl-parco - Mercier-Hochelaga-Maisonneuve"},          
    { path: "mtl-parco-Rosemont-La-Petite-Patrie.filtred.curblr.json", label: "mtl-parco - Rosemont-La-Petite-Patrie"},
    { path: "mtl-parco-Verdun.filtred.curblr.json", label: "mtl-parco - Verdun"},
    { path: "mtl-parco-Villeray-Saint-Michel-Parc-Extension.filtred.curblr.json", label: "mtl-parco - Villeray-Saint-Michel-Parc-Extension"}, 

    { path: "mtl-subset-places-oasis-bellechasse-plaza.curblr.json", label: "mtl - Oasis bellechasse + plaza"},

    { path: "mtl-subset-segment-rosemont.curblr.json", label: "mtl - Rosemont" },
    { path: "mtl-subset-segment-Mercier-Hochelaga-Maisonneuve.curblr.json", label: "mtl - Mercier Hochelaga-Maisonneuve" },
    { path: "mtl-subset-segment-Villeray-Saint-Michel.curblr.json", label: "mtl - Villeray Saint-Michel"},
    { path: "mtl-subset-segment-Ville-Marie.curblr.json", label: "mtl - Ville-marie" },
    { path: "mtl-subset-segment-Plateau-Mont-Royal.curblr.json", label: "mtl - Plateau Mont-Royal" },
    { path: "mtl-subset-segment-Ahuntsic - Cartierville.curblr.json", label: "mtl - Ahuntsic-Cartierville" },

    { path: "qc-subset-segment-full.curblr.json", label: "Québec (lent)" }, // > 9 mo
    { path: "qc-subset-segment-saint-sauveur.curblr.json", label: "Québec - Saint-Sauveur" },    
    { path: "qc-subset-segment-vieux-Moulin.curblr.json", label: "Québec - Vieux-Moulin" }
];

const curblrData = geojsonData as CurbFeatureCollection;

const initState:GlobalState = {
    curblr: {
        time: "08:01",
        day: "mo",
        mode: "time",
        data: curblrData
    }
}

async function loadAsset(path : string){
    return await import(`../assets/data/${path}`)
}

const builder = new DvaModelBuilder(initState, "curblr")
    .takeLatest(fetchGeoData, function* (payload, { call, put }) {
        const geoData = yield call(loadAsset, payload);
        yield put(loadGeoData(geoData));
    })
    .case(loadGeoData, (state, payload) => {
        return {
            curblr:{
                time: state.curblr.time,
                day: state.curblr.day,
                mode: state.curblr.mode,
                data: payload
            }
        }
    });

export default builder.build();

export const actions = {
    time,
    day,
    fetchGeoData
};


export { geoDataFiles }