import React from 'react';
import styles from './index.css';

import { Layout, Menu, Icon, Card, Radio, Select, Badge } from 'antd';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css'; // Import whole style

const { Header, Content, Footer, Sider } = Layout;

import { formatMessage } from 'umi-plugin-locale';
import { connect } from "dva";

//mapstyle, change to dark matter
import mapStyle from '../assets/style.json';
import {fromJS} from 'immutable';

import MapGL from 'react-map-gl';
import { GlobalState } from '@/common/types';

import { CurbFeature, CurbFeatureCollection, filterTimeAndDay } from '@/common/curblr';
import { FeatureCollection, featureCollection, feature, LineString } from '@turf/helpers';


var mapboxAccessToken= 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

//loads map style
const defaultMapStyle = fromJS(mapStyle)

const MAXSTAY_COLOR_MAP:{ [key: string]: any } = {
    "3": "#f7fcf5",
    "15": "#f7fcf5",
    "30": "#e5f5e0",
    "45": "#c7e9c0",
    "60": "#a1d99b",
    "90": "#74c476",
    "120": "#41ab5d",
    "180": "#238b45",
    "240": "#006d2c",
    "360": "#00441b",
    "480": "#00441b"
}

const ACTIVITY_COLOR_MAP = {
    "no standing":"#000000",
    "no parking":"#FF3D00",
    "passenger loading":"#FF9100",
    "transit":"#FFC400",
    "loading":"#FFEA00",
    "taxi stand": "#37B34A",
    "free parking":"#00E5FF",
    "paid parking":"#2979FF",
    "restricted parking":"#304FFE",
    "bike/scooter parking":"#7C4DFF"
};

const scaledOffset = (offset:number) => {return {
    "type": "exponential",
    "base": 2,
    "stops": [
        [12, offset * Math.pow(2, (12 - 16))],
        [16, offset * Math.pow(2, (16 - 16))]
    ]
}};


const scaledWidth = (width:number) => {return {
  "type": "exponential",
  "base": 2,
  "stops": [
      [12, width * Math.pow(2, (12 - 16))],
      [16, width * Math.pow(2, (16 - 16))]
  ]
}};

const dataLayer = fromJS({
  id: 'dataLayer',
  source: 'curblrData',
  type: 'line',
  interactive: true,
  paint: {
    'line-color': ['get', 'color'],
    'line-offset': ['get', 'offset'],
    'line-width' : scaledWidth(7)
  }
});

// sets average parking length (roughly 7m, per NACTO) for use in estimating length in # of parking spaces
const avgParkingLength = 7


const filterCurblrData = (data:CurbFeatureCollection, day:string, time:string, filterType:string):FeatureCollection<LineString> => {

  var filteredData = featureCollection<LineString>([]);

  for(var curbFeature of data.features) {
      var filteredFeature = feature<LineString>(curbFeature.geometry);
      filteredFeature.properties = {};

      if(!filterTimeAndDay(curbFeature, day, time))
                  continue;

      for(var regulation of curbFeature.properties.regulations) {
        // marks each feature with its length
          filteredFeature.properties.length = curbFeature.properties.location.shstLocationEnd - curbFeature.properties.location.shstLocationStart;

          if(regulation.priority) {

              var baseOffset =  6 ;
              if(curbFeature.properties.location.sideOfStreet === 'left')
                  baseOffset = -6;

              filteredFeature.properties['offset'] = scaledOffset(baseOffset * (regulation.priority - 1));

              if(filterType === "maxStay") {
                  if(regulation.rule.maxStay) {
                      var maxStay = regulation.rule.maxStay + "";
                      if(MAXSTAY_COLOR_MAP[maxStay]) {
                          filteredFeature.properties['color'] = MAXSTAY_COLOR_MAP[maxStay]
                          filteredFeature.properties.maxStay = maxStay
                          filteredData.features.push(filteredFeature);
                      }
                  }
              }
              // Splits out common activities and variants for an overall view. Features that fall into more than one "bucket" are duplicated, but handled by ensuring that they ultimately fall into the more specific bucket via painter's algorithm.
              // Requires ts.3.7 because of null arrays - I lucked out on mine but this will break on a different environment

              else if(filterType === "activity") {
                  if(regulation.rule.activity === "no parking") {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["no parking"];
                    // set the activty to use later in hooking up chart to map data
                    filteredFeature.properties.activity = "no parking"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.rule.activity === "no standing") {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["no standing"];
                    // set the activty to use later in hooking up chart to map data
                    filteredFeature.properties.activity = "no standing"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.rule.activity === "parking" && regulation.userClasses.classes?.length > 0) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["restricted parking"];
                    filteredFeature.properties.activity = "restricted parking"
                    filteredData.features.push(filteredFeature);
                  }
                  // if(Object.keys(ACTIVITY_COLOR_MAP).includes(regulation.rule.activity)) {
                  //   filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP[regulation.rule.activity];
                  //   filteredData.features.push(filteredFeature);
                  // }
                if(regulation.rule.activity === "parking" && !regulation.rule.payment && regulation.payment?.rates?.fees?.length === 0) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["free parking"];
                    filteredFeature.properties.activity = "free parking"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.rule.activity === "parking" && (regulation.rule.payment || regulation.payment?.rates?.fees?.length > 0)) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["paid parking"];
                    filteredFeature.properties.activity = "paid parking"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.rule.activity === "loading") {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["loading"];
                    filteredFeature.properties.activity = "loading"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.rule.activity === "standing" && regulation.userClasses.classes?.includes("taxi") || regulation.rule.reason?.includes("taxi")) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["taxi stand"];
                    filteredFeature.properties.activity = "taxi stand"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.rule.activity === "loading" && regulation.userClasses.classes?.includes("passenger") || regulation.rule.reason?.includes("passenger")) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["passenger loading"];
                    filteredFeature.properties.activity = "passenger loading"
                    filteredData.features.push(filteredFeature);
                  }
                  if(regulation.userClasses.classes?.includes("bus")) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["transit"];
                    filteredFeature.properties.activity = "transit"
                    filteredData.features.push(filteredFeature);
                  }
                  if (["bicycle", "micromobility"].some(c => regulation.userClasses.classes?.includes(c))) {
                    filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP["bike/scooter parking"];
                    filteredFeature.properties.activity = "bike/scooter parking"
                    filteredData.features.push(filteredFeature);
                  }
              }
          }
      }
  }

  return filteredData;
};


const mapStateToProps = (d:GlobalState) => {
  return d.curblr;
};

type PageStateProps = ReturnType<typeof mapStateToProps>;

type PageProps = PageStateProps;

class Map extends React.Component<PageProps, {}> {

    _mapRef:any;

    state= {
      mode: "activity",
      day: "mo",
      time: "08:00",
      mapStyle: defaultMapStyle,
      viewport: {
        width: '100vw',
        height: '100vh',
// needs update? default viewport is hard-coded and should dynamically set based on data. PHL viewport:
//        latitude:  39.950,
//        longitude:-75.174,
//        zoom: 16
// LA viewport
      latitude:  34.040,
      longitude:-118.257,
      zoom: 14
      }
    };

    constructor(props:any) {
      super(props);

      this._mapRef = React.createRef();
    }

    _setMapData = (newData:any) => {
      const map = this._getMap();
      if (map) {
        map.getSource("curblrData").setData(newData);
      }
    };

    _getMap = () => {
      return this._mapRef ? this._mapRef.current.getMap() : null;
    };

    componentDidMount() {
      this._loadData();

      const map = this._getMap();

      if(map) {
        map.on('click', 'places', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
          });
      }

    window.onresize = () => {
      const { viewport } = this.state;
      this.setState({
        viewport: {
          ...viewport,
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    }
  }


    componentWillUnmount() {
      window.onresize = null;
    }

    _loadData() {
      const mapStyle = defaultMapStyle
        // Add geojson source to map
        .setIn(['sources', 'curblrData'], fromJS({type: 'geojson', data: filterCurblrData(this.props.curblr.data, this.state.day, this.state.time, this.state.mode) }))
        // Add point layer to map
        .set('layers', defaultMapStyle.get('layers').push(dataLayer));

      this.setState({mapStyle});
    };



    changeTime = (value:any) => {
      this.setState({time:value});

      var data = filterCurblrData(this.props.curblr.data, this.state.day, value, this.state.mode)
      this._setMapData(data);

    }

    changeDay = (value:any) => {
      this.setState({day:value});

      var data = filterCurblrData(this.props.curblr.data, value, this.state.time, this.state.mode)
      this._setMapData(data);

    }

    changeMode = (event:any) => {
      this.setState({mode:event.target.value});

      var data = filterCurblrData(this.props.curblr.data, this.state.day, this.state.time, event.target.value)
      this._setMapData(data);

    }


    render() {
      const {viewport, mapStyle, day, time, mode} = this.state;

      var legend;

      // if(mode === "maxStay") {
      //   legend = (<div style={{"margin": "15px"}}>
      //     <b>Max Stay (minutes)</b>:<br/>
      //     <Badge color="#f7fcf5" text="15 min" /> &nbsp;
      //     <Badge color="#e5f5e0" text="30 min" /> &nbsp;
      //     <Badge color="#c7e9c0" text="45 min" /> &nbsp;
      //     <Badge color="#a1d99b" text="60 min" />&nbsp;
      //     <Badge color="#74c476" text="90 min" />&nbsp;
      //     <Badge color="#41ab5d" text="120 min" />&nbsp;
      //     <Badge color="#238b45" text="180 min" />&nbsp;
      //     <Badge color="#006d2c" text="240 min" />&nbsp;
      //   </div>)
      // }


// shows everything. would be great if this could intersect the feature collection with the viewport bounding box. i can't figure it out. for kevin?
      const features = filterCurblrData(this.props.curblr.data, this.state.day, this.state.time, this.state.mode)

      const ACTIVITY_LENGTH_CALC = {
          "no standing": features.features.filter(f => f.properties.activity === 'no standing').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "no parking": features.features.filter(f => f.properties.activity === 'no parking').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "passenger loading": features.features.filter(f => f.properties.activity === 'passenger loading').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "transit": features.features.filter(f => f.properties.activity === 'transit').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "loading": features.features.filter(f => f.properties.activity === 'loading').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "taxi stand": features.features.filter(f => f.properties.activity === 'taxi stand').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "free parking": features.features.filter(f => f.properties.activity === 'free parking').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "paid parking": features.features.filter(f => f.properties.activity === 'paid parking').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "restricted parking": features.features.filter(f => f.properties.activity === 'restricted parking').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "bike/scooter parking": features.features.filter(f => f.properties.activity === 'bike/scooter parking').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
      };

      const MAXSTAY_LENGTH_CALC = {
          "3": features.features.filter(f => f.properties.maxStay === '3').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "15": features.features.filter(f => f.properties.maxStay === '15').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "30": features.features.filter(f => f.properties.maxStay === '30').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "45": features.features.filter(f => f.properties.maxStay === '45').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "60": features.features.filter(f => f.properties.maxStay === '60').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "90": features.features.filter(f => f.properties.maxStay === '90').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "120": features.features.filter(f => f.properties.maxStay === '120').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "180": features.features.filter(f => f.properties.maxStay === '180').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "240": features.features.filter(f => f.properties.maxStay === '240').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "360": features.features.filter(f => f.properties.maxStay === '360').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
          "480": features.features.filter(f => f.properties.maxStay === '480').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
      };


      const activityPieData = [
        {
          x: 'No Standing',
          y: ACTIVITY_LENGTH_CALC['no standing'],
        },
        {
          x: 'No Parking',
          y: ACTIVITY_LENGTH_CALC['no parking'],
        },
        {
          x: 'Passenger Pick-Up',
          y: ACTIVITY_LENGTH_CALC['passenger loading'],
        },
        {
          x: 'Transit',
          y: ACTIVITY_LENGTH_CALC['transit'],
        },
        {
          x: 'Loading',
          y: ACTIVITY_LENGTH_CALC['loading'],
        },
        {
          x: 'Taxi Stand',
          y: ACTIVITY_LENGTH_CALC['taxi stand'],
        },
        {
          x: 'Free Parking',
          y: ACTIVITY_LENGTH_CALC['free parking'],
        },
        {
          x: 'Paid Parking',
          y: ACTIVITY_LENGTH_CALC['paid parking'],
        },
        {
          x: 'Restricted Parking',
          y: ACTIVITY_LENGTH_CALC['restricted parking'],
        },
        {
          x: 'Bike & scooter',
          y: ACTIVITY_LENGTH_CALC['bike/scooter parking'],
        },
      ];

      const maxStayPieData = [
        {
          x: '3 mins',
          y: MAXSTAY_LENGTH_CALC['3'],
        },
        {
          x: '15 mins',
          y: MAXSTAY_LENGTH_CALC['15'],
        },
        {
          x: '30 mins',
          y: MAXSTAY_LENGTH_CALC['30'],
        },
        {
          x: '45 mins',
          y: MAXSTAY_LENGTH_CALC['45'],
        },
        {
          x: '60 mins',
          y: MAXSTAY_LENGTH_CALC['60'],
        },
        {
          x: '90 mins',
          y: MAXSTAY_LENGTH_CALC['90'],
        },
        {
          x: '120 mins',
          y: MAXSTAY_LENGTH_CALC['120'],
        },
        {
          x: '180 mins',
          y: MAXSTAY_LENGTH_CALC['180'],
        },
        {
          x: '240 mins',
          y: ACTIVITY_LENGTH_CALC['240'],
        },
        {
          x: '360 mins',
          y: ACTIVITY_LENGTH_CALC['360'],
        },
        {
          x: '480 mins',
          y: ACTIVITY_LENGTH_CALC['480'],
        },
      ];


      return (

        <Layout>
          <Content>

              <MapGL
              ref={this._mapRef}
              mapboxApiAccessToken={mapboxAccessToken}
              mapStyle={mapStyle}
              {...viewport}
              onViewportChange={(viewport) => this.setState({viewport})}
            />
          </Content>

          <Card size="small" title="CurbLR (Los Angeles meter data)" bordered={true} style={{ position: "fixed", top: "40px", left: "40px", width:"300px"}}>
          Day: <Select defaultValue={day} onChange={this.changeDay}>
            <Select.Option value="mo">Monday</Select.Option>
            <Select.Option value="tu">Tuesday</Select.Option>
            <Select.Option value="we">Wednesday</Select.Option>
            <Select.Option value="th">Thursday</Select.Option>
            <Select.Option value="fr">Friday</Select.Option>
            <Select.Option value="sa">Saturday</Select.Option>
            <Select.Option value="su">Sunday</Select.Option>
          </Select>
          &nbsp; &nbsp;
          Time: <Select defaultValue={time} onChange={this.changeTime}>
            <Select.Option value="00:00">00:00</Select.Option>
            <Select.Option value="01:00">01:00</Select.Option>
            <Select.Option value="02:00">02:00</Select.Option>
            <Select.Option value="03:00">03:00</Select.Option>
            <Select.Option value="04:00">04:00</Select.Option>
            <Select.Option value="05:00">05:00</Select.Option>
            <Select.Option value="06:00">06:00</Select.Option>
            <Select.Option value="07:00">07:00</Select.Option>
            <Select.Option value="08:00">08:00</Select.Option>
            <Select.Option value="09:00">09:00</Select.Option>
            <Select.Option value="10:00">10:00</Select.Option>
            <Select.Option value="11:00">11:00</Select.Option>
            <Select.Option value="12:00">12:00</Select.Option>
            <Select.Option value="13:00">13:00</Select.Option>
            <Select.Option value="14:00">14:00</Select.Option>
            <Select.Option value="15:00">15:00</Select.Option>
            <Select.Option value="16:00">16:00</Select.Option>
            <Select.Option value="17:00">17:00</Select.Option>
            <Select.Option value="18:00">18:00</Select.Option>
            <Select.Option value="19:00">19:00</Select.Option>
            <Select.Option value="20:00">20:00</Select.Option>
            <Select.Option value="21:00">21:00</Select.Option>
            <Select.Option value="22:00">22:00</Select.Option>
            <Select.Option value="23:00">23:00</Select.Option>
          </Select>
          <br />
          <br />
          <Radio.Group defaultValue={mode} buttonStyle="solid" position="center" onChange={this.changeMode}>
            <Radio.Button value="activity">Activity</Radio.Button>
            <Radio.Button value="maxStay">Max Stay</Radio.Button>
          </Radio.Group>
          <br />
          <br />

          <Pie
            animate={false}
            colors={Object.values(ACTIVITY_COLOR_MAP)}
            hasLegend
            title="Activities"
            subTitle="Total parking spaces:"
            total={() => (
              <>
                <span>
                  { (activityPieData.reduce((pre, now) => now.y + pre, 0) / avgParkingLength).toLocaleString('en', { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 }) }
                </span>
              </>
            )}
            data={activityPieData}
            valueFormat={val => <span>{ (val / avgParkingLength).toLocaleString('en', { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 })} spaces</span>}
            height={240}
          />

          <br />

            {legend}

          </Card>
        </Layout>


      );
    }
  }


  // <Pie
  //   animate={false}
  //   colors={Object.values(MAXSTAY_COLOR_MAP)}
  //   hasLegend
  //   title="MaxStay"
  //   subTitle="Max Stay (mins)"
  //   total={() => (
  //     <>
  //       <span>
  //         { (maxStayPieData.reduce((pre, now) => now.y + pre, 0) / avgParkingLength).toLocaleString('en', { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 }) }
  //       </span>
  //     </>
  //   )}
  //   data={maxStayPieData}
  //   valueFormat={val => <span>{(val / avgParkingLength).toLocaleString('en', { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 })} spaces</span>}
  //   height={240}
  // />


            // <Pie
            //   animate={false}
            //   colors={Object.values(ACTIVITY_COLOR_MAP)}
            //   hasLegend
            //   title="Activities"
            //   subTitle="Total parking spaces:"
            //   total={() => (
            //     <>
            //       <span>
            //         { (activityPieData.reduce((pre, now) => now.y + pre, 0) / avgParkingLength).toLocaleString('en', { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 }) }
            //       </span>
            //     </>
            //   )}
            //   data={activityPieData}
            //   valueFormat={val => <span>{ (val / avgParkingLength).toLocaleString('en', { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 })} spaces</span>}
            //   height={240}
            // />

  export default connect(mapStateToProps)(Map);
