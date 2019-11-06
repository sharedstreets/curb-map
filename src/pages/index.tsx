import React from 'react';
import styles from './index.css';

import { Layout, Menu, Icon, Card, Radio, Select, Badge } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

import { formatMessage } from 'umi-plugin-locale';
import { connect } from "dva";

import mapStyle from '../assets/style.json';
import {fromJS} from 'immutable';

import MapGL from 'react-map-gl';
import { GlobalState } from '@/common/types';

import { CurbFeature, CurbFeatureCollection, filterTimeAndDay } from '@/common/curblr';
import { FeatureCollection, featureCollection, feature, LineString } from '@turf/helpers';

 
var mapboxAccessToken= 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

const defaultMapStyle = fromJS(mapStyle)

const USER_CLASS_COLOR_MAP = {
    'any': 'purple',
    'bike': 'green',
    'car share': 'blue',
    'carpool': 'yellow',
    'commercial': 'orange',
    'compact': 'brown',
    'construction': 'green',
    'electric': 'blue',
    'emergency': 'yellow',
    'food truck': 'orange',
    'handicap': 'brown',
    'micromobility': 'green',
    'motorcycle': 'blue',
    'passenger': 'yellow',
    'per  ': 'orange',
    'police': 'blue',
    'rideshare': 'brown',
    'staff': 'green',
    'student': 'blue',
    'taxi': 'yellow',
    'truck': 'brown',
    'visitor': 'orange',
}

const MAXSTAY_COLOR_MAP:{ [key: string]: any } = {
    "15": "#f7fcf5",
    "30": "#e5f5e0",
    "45": "#c7e9c0",
    "60": "#a1d99b",
    "90": "#74c476",
    "120": "#41ab5d",
    "180": "#238b45",
    "240": "#006d2c",
    "480": "#00441b"
}

const ACTIVITY_COLOR_MAP = {
    "parking":"blue",
    "no parking":"red",
    "standing":"green",
    "no standing":"orange",
    "loading":"purple",
    "no loading":"yellow"
};



const scaledOffet = (offset:number) => {return {
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
    'line-width' : scaledWidth(6)
  }
});


const filterCurblrData = (data:CurbFeatureCollection, day:string, time:string, filterType:string):FeatureCollection<LineString> => {

  var fitleredData = featureCollection<LineString>([]);
  
  for(var curbFeature of data.features) {
      var filteredFeature = feature<LineString>(curbFeature.geometry);
      filteredFeature.properties = {};

      if(!filterTimeAndDay(curbFeature, day, time))
                  continue;

      for(var regulation of curbFeature.properties.regulations) {
          if(regulation.priority) {

              var baseOffset =  6 ;
              if(curbFeature.properties.location.sideOfStreet === 'left')
                  baseOffset = -6;
  
              filteredFeature.properties['offset'] = scaledOffet(baseOffset * (regulation.priority - 1));
  
              if(filterType === "time") {
                  if(regulation.rule.activity === "parking" && regulation.rule.maxStay) {
                      var maxStay = regulation.rule.maxStay + "";
                      if(MAXSTAY_COLOR_MAP[maxStay]) {
                          filteredFeature.properties['color'] = MAXSTAY_COLOR_MAP[maxStay]
                          fitleredData.features.push(filteredFeature);
                      }
                  }
              }
              else  {
                  filteredFeature.properties['color'] = ACTIVITY_COLOR_MAP[regulation.rule.activity];
                  fitleredData.features.push(filteredFeature);
              }
          }  
      }
  }

  return fitleredData;
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
      return this._mapRef.  nt ? this._mapRef.current.getMap() : null;
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
        // TODO manage viewport change
        this.setState({
          viewport: {
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
      
      if(mode === "time") {
        legend = (<div style={{"margin": "15px"}}>
          <b>Max Stay (minutes)</b>:<br/>
          <Badge color="#f7fcf5" text="15 min" /> &nbsp;
          <Badge color="#e5f5e0" text="30 min" /> &nbsp;
          <Badge color="#c7e9c0" text="45 min" /> &nbsp;
          <Badge color="#a1d99b" text="60 min" />&nbsp;
          <Badge color="#74c476" text="90 min" />&nbsp;
          <Badge color="#41ab5d" text="120 min" />&nbsp;
          <Badge color="#238b45" text="180 min" />&nbsp;
          <Badge color="#006d2c" text="240 min" />&nbsp;
        </div>)
      }
      else {
        legend = (<div style={{"margin": "15px"}}>
          <b>Activity</b>:<br/>
          <Badge color="blue" text="parking" /> &nbsp;
          <Badge color="red" text="no parking" /> &nbsp;<br/>
          <Badge color="green" text="standing" /> &nbsp;
          <Badge color="orange" text="no standing" /> &nbsp;<br/>
          <Badge color="purple" text="loading" /> &nbsp;
          <Badge color="yellow" text="no loading" /> &nbsp;
        </div>)
      }
      

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

          <Card size="small" title="CurbLR (Los Angeles Meter Data)" bordered={true} style={{ position: "fixed", top: "40px", right: "40px", width:"300px"}}>
          Day: <Select defaultValue={day} onChange={this.changeDay}>
            <Select.Option value="mo">Monday</Select.Option>
            <Select.Option value="tu">Tuesday</Select.Option>
            <Select.Option value="we">Wednesday</Select.Option>
            <Select.Option value="th">Thursday</Select.Option>
            <Select.Option value="fr">Friday</Select.Option>
            <Select.Option value="sa">Saturday</Select.Option>
            <Select.Option value="su">Sunday</Select.Option>
          </Select>
          &nbsp; 
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
          <Radio.Group defaultValue={mode} buttonStyle="solid" onChange={this.changeMode}>
            <Radio.Button value="time">Time</Radio.Button>
            <Radio.Button value="activity">Activity</Radio.Button>
          </Radio.Group>
      
            {legend}

          </Card>
        </Layout>


      );
    }
  }
  
  export default connect(mapStateToProps)(Map);
