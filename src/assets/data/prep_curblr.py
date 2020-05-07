#!/usr/bin/env python3

import click
import json
import geopandas as gpd

in_file = 'philadelphia_download.curblr.json'
out_file = 'philadelphia.curblr.json'

@click.command()
@click.argument('in_file')
@click.argument('out_file')
def main(in_file, out_file):
    with open(in_file, 'r') as src:
        clr = json.load(src)
        
    clr_gdf = gpd.read_file('philadelphia_download.curblr.json').to_crs('epsg:2272')
    clr_gdf['length'] = clr_gdf['geometry'].apply(lambda x: x.length / 3.28084)
    clr_gdf['objectId'] = clr_gdf['location'].apply(lambda x: x['objectId'])
    lookup = dict(zip(clr_gdf['objectId'], clr_gdf['length']))

    for feature in clr['features']:
        loc = feature['properties']['location']
        if loc['shstRefId'] == 'unmatched':
            length = lookup[loc['objectId']]
            loc['shstLocationStart'] = 0
            loc['shstLocationEnd'] = length

    with open(out_file, 'w') as dst:
        json.dump(clr, dst)

if __name__ == "__main__":
    main()