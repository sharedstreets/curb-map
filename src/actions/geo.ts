import { actionCreatorFactory } from 'dva-model-creator';
import { CurbFeatureCollection } from '../common/curblr'
const actionCreator = actionCreatorFactory("curblr");

export const fetchGeoData = actionCreator<string>('fetchGeoData');
export const loadGeoData = actionCreator<CurbFeatureCollection>('loadGeoData');