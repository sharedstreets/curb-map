import { FeatureCollection } from '@turf/helpers'
import { CurbFeature } from "@/common/curblr";

declare module '*.css';
declare module "*.png";

declare module "*.curblr.json" {
    const value: FeatureCollection<CurbFeature>;
    export default value;
}