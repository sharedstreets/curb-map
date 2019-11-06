import { FeatureCollection, LineString } from '@turf/helpers'
import { CurbFeature, CurbFeatureCollection } from "@/common/curblr";

interface CurblrDataType {
    time: string,
    day: string,
    mode: string,
    data: CurbFeatureCollection;
}  

export interface GlobalState {
    curblr:CurblrDataType;
}