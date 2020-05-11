import React from "react";
import styles from "./index.css";
import logo from '../assets/azavea-logo.svg';
import { 
  Layout, 
  Icon, 
  Radio, 
  Select, 
  Button,
  Typography,
  Form,
  Input,
  Divider
} from "antd";

import { Pie } from "ant-design-pro/lib/Charts";
import "ant-design-pro/dist/ant-design-pro.css"; // Import whole style

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

import { formatMessage } from "umi-plugin-locale";
import { connect } from "dva";

import mapStyle from "../assets/style.json";
import { fromJS } from "immutable";

import MapGL from "react-map-gl";
import { GlobalState } from "@/common/types";

import {
  CurbFeature,
  CurbFeatureCollection,
  filterTimeAndDay
} from "@/common/curblr";
import {
  FeatureCollection,
  featureCollection,
  feature,
  LineString
} from "@turf/helpers";

var mapboxAccessToken =
  "pk.eyJ1IjoiYXphdmVhIiwiYSI6IkFmMFBYUUUifQ.eYn6znWt8NzYOa3OrWop8A";

//loads map style
const defaultMapStyle = fromJS(mapStyle);

//blues
const MAXSTAY_COLOR_MAP: { [key: string]: any } = {
  "30": "#4fc3f7",
  "60": "#03a9f4",
  "120": "#0277bd",
  "180": "#01579b",
  "240": "#00345D"
};


const ACTIVITY_COLOR_MAP = {
  "no standing": "#777777",
  "no parking": "#DD2C00",
  "passenger loading": "#FF9100",
  "loading": "#FFEA00",
  "transit": "#37B34A",
  "free parking": "#00E5FF",
  "paid parking": "#2979FF",
  "restricted": "#AA00FF"
};

const scaledOffset = (offset: number) => {
  return {
    type: "exponential",
    base: 2,
    stops: [
      [12, offset * Math.pow(2, 12 - 16)],
      [16, offset * Math.pow(2, 16 - 16)]
    ]
  };
};

const scaledWidth = (width: number) => {
  return {
    type: "exponential",
    base: 2,
    stops: [
      [12, width * Math.pow(2, 12 - 16)],
      [16, width * Math.pow(2, 16 - 16)]
    ]
  };
};

const dataLayer = fromJS({
  id: "dataLayer",
  source: "curblrData",
  type: "line",
  interactive: true,
  paint: {
    "line-color": ["get", "color"],
    "line-offset": ["get", "offset"],
    "line-width": scaledWidth(6.8)
  }
});

// sets average parking length (roughly 7m, per NACTO) for use in estimating length in # of parking spaces
const avgParkingLength = 7;


const filterCurblrData = (
  data: CurbFeatureCollection,
  day: string,
  time: string,
  filterType: string
): FeatureCollection<LineString> => {
  var filteredData = featureCollection<LineString>([]);

  for (var curbFeature of data.features) {
    var filteredFeature = feature<LineString>(curbFeature.geometry);
    filteredFeature.properties = {};
    for (var regulation of curbFeature.properties.regulations) {
      // marks each feature with its length
      if (filterTimeAndDay(regulation, curbFeature, day, time)) {
        filteredFeature.properties.length =
          curbFeature.properties.location.shstLocationEnd -
          curbFeature.properties.location.shstLocationStart;
        
        if (isNaN(filteredFeature.properties.length)) {
          filteredFeature.properties.length = 0
        }

        if (filterType === "maxStay") {
          if (regulation.rule.activity === "parking" || regulation.rule.activity === "loading") {
            if (!regulation.userClasses) {
              if (regulation.rule.maxStay) {
                var ms = regulation.rule.maxStay;
                if (ms > 240) {
                  ms = 240;
                }
                var maxStay = ms + "";
              }
              else {
                if (regulation.rule.activity === "loading") {
                  var maxStay = "20";
                } else {
                  var maxStay = "240";
                }
              }
              if (MAXSTAY_COLOR_MAP[maxStay]) {
                filteredFeature.properties["color"] = MAXSTAY_COLOR_MAP[maxStay];
                  filteredFeature.properties.maxStay = maxStay;
                  filteredData.features.push(filteredFeature);
              }
            }
          }
        }

        // Splits out common activities and variants for an overall view. Features that fall into more than one "bucket" are duplicated, but handled by ensuring that they ultimately fall into the more specific bucket via painter's algorithm.
        // Requires ts.3.7 because of null arrays - I lucked out on mine but this will break on a different environment
        if (filterType === "activity") {

          if (regulation.userClasses != undefined) {
            if (regulation.userClasses[0].classes[0] == "contractor") {
              continue;
            }
          }

          // PARKING
          if (regulation.rule.activity === "parking") {
            // if there's a user class
            if (regulation.userClasses?.some(uc => uc.classes?.length > 0)) {
              if (regulation.userClasses?.some(uc => uc.classes?.includes("bus"))) {
                filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["transit"];
                filteredFeature.properties.activity = "transit";
                filteredData.features.push(filteredFeature);
                break;
              }
              else {
                filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["restricted"];
                filteredFeature.properties.activity = "restricted";
                filteredData.features.push(filteredFeature);
                break;
              }
              // if there's no user class
            } else {
              // if payment is required
              if (!regulation.rule.payment) {
                filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["free parking"];
                filteredFeature.properties.activity = "free parking";
                filteredData.features.push(filteredFeature);
                break;
              } else {
                filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["paid parking"];
                filteredFeature.properties.activity = "paid parking";
                filteredData.features.push(filteredFeature);
                break;
              }
            }
          }

          // NO PARKING
          if (regulation.rule.activity === "no parking") {
            filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["no parking"];
            filteredFeature.properties.activity = "no parking";
            filteredData.features.push(filteredFeature);
            break;
          }

          // STANDING
          if (regulation.rule.activity === "standing") {
            filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["loading"];
            filteredFeature.properties.activity = "loading";
            filteredData.features.push(filteredFeature);
            break;
          }

          // NO STANDING
          if (regulation.rule.activity === "no standing") {

            filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["no standing"];
            filteredFeature.properties.activity = "no standing";
            filteredData.features.push(filteredFeature);
            break;
          }

          if (regulation.rule.activity === "loading") {
            if (regulation.userClasses != undefined) {
              if (regulation.userClasses?.some(uc => uc.classes?.length > 0)) {
                if (regulation.userClasses?.some(uc => ["taxi", "passenger", "passenger loading"].some(c => uc.classes?.includes(c)))) {
                  filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["passenger loading"];
                  filteredFeature.properties.activity = "passenger loading";
                  filteredData.features.push(filteredFeature);
                  break;
                } else if (regulation.userClasses?.some(uc => uc.classes?.includes("bus"))) {
                  filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["transit"];
                  filteredFeature.properties.activity = "transit";
                  filteredData.features.push(filteredFeature);
                  break;
                } else {
                  filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["restricted"];
                  filteredFeature.properties.activity = "restricted";
                  filteredData.features.push(filteredFeature);
                  break;
                }
              }
            }
            else {
              filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["loading"];
              filteredFeature.properties.activity = "loading";
              filteredData.features.push(filteredFeature);
              break;
            }
          }

          if (typeof filteredFeature.properties.activity == undefined) {
            filteredFeature.properties["color"] = ACTIVITY_COLOR_MAP["free parking"];
            filteredFeature.properties.activity = "free parking";
            filteredData.features.push(filteredFeature);
            break;
          }
        }
      }
    }
  }

  // sort filtered data in order of priority so that the map displays the highest-priority feature on top
  filteredData.features.sort((a, b) => b.properties.priority - a.properties.priority)

  return filteredData;
};

const mapStateToProps = (d: GlobalState) => {
  return d.curblr;
};

type PageStateProps = ReturnType<typeof mapStateToProps>;

type PageProps = PageStateProps;

class Map extends React.Component<PageProps, {}> {
  _mapRef: any;

  state = {
    mode: "activity",
    day: "mo",
    time: "09:01",
    mapStyle: defaultMapStyle,
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 39.9535903,
      longitude: -75.1587843,
      zoom: 14.5
    }
  };

  constructor(props: any) {
    super(props);

    this._mapRef = React.createRef();
  }

  _setMapData = (newData: any) => {
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

    window.onresize = () => {
      const { viewport } = this.state;
      this.setState({
        viewport: {
          ...viewport,
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    };
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  _loadData() {
    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(
        ["sources", "curblrData"],
        fromJS({
          type: "geojson",
          data: filterCurblrData(
            this.props.curblr.data,
            this.state.day,
            this.state.time,
            this.state.mode
          )
        })
      )
      // Add point layer to map
      .set("layers", defaultMapStyle.get("layers").push(dataLayer));

    this.setState({ mapStyle });
  }

  changeTime = (value: any) => {
    this.setState({ time: value });

    var data = filterCurblrData(
      this.props.curblr.data,
      this.state.day,
      value,
      this.state.mode
    );
    this._setMapData(data);
  };

  changeDay = (value: any) => {
    this.setState({ day: value });

    var data = filterCurblrData(
      this.props.curblr.data,
      value,
      this.state.time,
      this.state.mode
    );
    this._setMapData(data);
  };

  changeMode = (event: any) => {
    this.setState({ mode: event.target.value });

    var data = filterCurblrData(
      this.props.curblr.data,
      this.state.day,
      this.state.time,
      event.target.value
    );
    this._setMapData(data);
  };

  render() {
    const { viewport, mapStyle, day, time, mode } = this.state;

    // shows everything. would be great if this could intersect the feature collection with the viewport bounding box. i can't figure it out. for kevin?
    const features = filterCurblrData(
      this.props.curblr.data,
      this.state.day,
      this.state.time,
      this.state.mode
    );

    // takes CurbLR feed (loaded into map as a prop, above) and puts it into a "dataUri" that can be downloaded from the export button. (Linking to file pathway doesn't work bc of umi build... couldn't find a static location for the data)
    let curblrStr = JSON.stringify(this.props.curblr.downloadData);
    let curblrDataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(curblrStr);

    const ACTIVITY_LENGTH_CALC = {
      "no standing": features.features
        .filter(f => f.properties.activity === "no standing")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "no parking": features.features
        .filter(f => f.properties.activity === "no parking")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "passenger loading": features.features
        .filter(f => f.properties.activity === "passenger loading")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "loading": features.features
        .filter(f => f.properties.activity === "loading")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "free parking": features.features
        .filter(f => f.properties.activity === "free parking")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "transit": features.features
        .filter(f => f.properties.activity === "transit")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "paid parking": features.features
        .filter(f => f.properties.activity === "paid parking")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0),
      "restricted": features.features
        .filter(f => f.properties.activity === "restricted")
        .map(f => f.properties.length)
        .reduce((acc, x) => acc + x, 0)
    };

    const MAXSTAY_LENGTH_CALC = {
      "30": features.features
        .filter(f => Number(f.properties.maxStay) <= 30)
        .map(f => Number(f.properties.length))
        .reduce((acc, x) => acc + x, 0),
      //"45": features.features.filter(f => f.properties.maxStay === '45').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
      "60": features.features
        .filter(f => Number(f.properties.maxStay) === 60)
        .map(f => Number(f.properties.length))
        .reduce((acc, x) => acc + x, 0),
      //"90": features.features.filter(f => f.properties.maxStay === '90').map(f => f.properties.length).reduce((acc, x) => acc + x, 0),
      "120": features.features
        .filter(f => Number(f.properties.maxStay) === 120)
        .map(f => Number(f.properties.length))
        .reduce((acc, x) => acc + x, 0),
      "180": features.features
        .filter(f => Number(f.properties.maxStay) === 180)
        .map(f => Number(f.properties.length))
        .reduce((acc, x) => acc + x, 0),
      "240": features.features
        .filter(f => Number(f.properties.maxStay) >= 240)
        .map(f => Number(f.properties.length))
        .reduce((acc, x) => acc + x, 0)
    };

    const activityPieData = [
      {
        x: "No Standing",
        y: ACTIVITY_LENGTH_CALC["no standing"]
      },
      {
        x: "No Parking",
        y: ACTIVITY_LENGTH_CALC["no parking"]
      },
      {
        x: "Pasenger Loading",
        y: ACTIVITY_LENGTH_CALC["passenger loading"]
      },
      {
        x: "Loading",
        y: ACTIVITY_LENGTH_CALC["loading"]
      },
      {
        x: "Transit",
        y: ACTIVITY_LENGTH_CALC["transit"]
      },
      {
        x: "Free Parking",
        y: ACTIVITY_LENGTH_CALC["free parking"]
      },
      {
        x: "Paid Parking",
        y: ACTIVITY_LENGTH_CALC["paid parking"]
      },
      {
        x: "Other Restricted Uses",
        y: ACTIVITY_LENGTH_CALC["restricted"]
      }
    ];

    const maxStayPieData = [
      {
        x: "30 min or fewer",
        y: MAXSTAY_LENGTH_CALC["30"]
      },
      {
        x: "1 hr",
        y: MAXSTAY_LENGTH_CALC["60"]
      },
      {
        x: "2 hr",
        y: MAXSTAY_LENGTH_CALC["120"]
      },
      {
        x: "3 hr",
        y: MAXSTAY_LENGTH_CALC["180"]
      },
      {
        x: "4+ hr",
        y: MAXSTAY_LENGTH_CALC["240"]
      }
    ];

    const dayPicker = (
      <>
      <Select defaultValue={day} onChange={this.changeDay}>
        <Select.Option value="mo">Monday</Select.Option>
        <Select.Option value="tu">Tuesday</Select.Option>
        <Select.Option value="we">Wednesday</Select.Option>
        <Select.Option value="th">Thursday</Select.Option>
        <Select.Option value="fr">Friday</Select.Option>
        <Select.Option value="sa">Saturday</Select.Option>
        <Select.Option value="su">Sunday</Select.Option>
      </Select>
      </>
    );

    const timePicker = (
      <>
        <Select defaultValue={time} onChange={this.changeTime}>
          <Select.Option value="00:01">00:00</Select.Option>
          <Select.Option value="01:01">01:00</Select.Option>
          <Select.Option value="02:01">02:00</Select.Option>
          <Select.Option value="03:01">03:00</Select.Option>
          <Select.Option value="04:01">04:00</Select.Option>
          <Select.Option value="05:01">05:00</Select.Option>
          <Select.Option value="06:01">06:00</Select.Option>
          <Select.Option value="07:01">07:00</Select.Option>
          <Select.Option value="08:01">08:00</Select.Option>
          <Select.Option value="09:01">09:00</Select.Option>
          <Select.Option value="10:01">10:00</Select.Option>
          <Select.Option value="11:01">11:00</Select.Option>
          <Select.Option value="12:01">12:00</Select.Option>
          <Select.Option value="13:01">13:00</Select.Option>
          <Select.Option value="14:01">14:00</Select.Option>
          <Select.Option value="15:01">15:00</Select.Option>
          <Select.Option value="16:01">16:00</Select.Option>
          <Select.Option value="17:01">17:00</Select.Option>
          <Select.Option value="18:01">18:00</Select.Option>
          <Select.Option value="19:01">19:00</Select.Option>
          <Select.Option value="20:01">20:00</Select.Option>
          <Select.Option value="21:01">21:00</Select.Option>
          <Select.Option value="22:01">22:00</Select.Option>
          <Select.Option value="23:01">23:00</Select.Option>
        </Select>
      </>
    );

    const viewOptions = (
      <>
        <Radio.Group
          className="full-width-radioGroup"
          defaultValue={mode}
          buttonStyle="solid"
          position="center"
          onChange={this.changeMode}
        >
          <Radio.Button value="activity">Activity</Radio.Button>
          <Radio.Button value="maxStay">Max Stay</Radio.Button>
        </Radio.Group>
      </>
    );

    const pieMaxStay = (
      <>
        <Pie
          animate={false}
          colors={Object.values(MAXSTAY_COLOR_MAP)}
          hasLegend
          title="Maximum Stay"
          subTitle={
            <>
              Total car
              <br />
              lengths
            </>
          }
          total={() => (
            <>
              <span>
                {(
                  maxStayPieData.reduce((pre, now) => now.y + pre, 0) /
                  avgParkingLength
                ).toLocaleString("en", {
                  style: "decimal",
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                })}
              </span>
            </>
          )}
          data={maxStayPieData}
          valueFormat={val => (
            <span>
              {(val / avgParkingLength).toLocaleString("en", {
                style: "decimal",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              })}{" "}
              cars
            </span>
          )}
          height={240}
          />
      </>
    );

    const pieActivity = (
      <>
        <Pie
          animate={false}
          colors={Object.values(ACTIVITY_COLOR_MAP)}
          hasLegend
          title="Activities"
          subTitle={
            <>
              Total car
            <br />
            lengths
          </>
          }
          total={() => (
            <>
              <span>
                {(
                  activityPieData.reduce((pre, now) => now.y + pre, 0) /
                  avgParkingLength
                ).toLocaleString("en", {
                  style: "decimal",
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                })}
              </span>
            </>
          )}
          data={activityPieData}
          valueFormat={val => (
            <span>
              {(val / avgParkingLength).toLocaleString("en", {
                style: "decimal",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              })}{" "}
            cars
            </span>
          )}
          height={240}
        />
      </>
    );

    const stickyHeader = (
      <div className="sticky-header">
        <Title level={4} style={{fontSize: '16px', margin: '0'}}>CurbLR Regulation Map (Philadelphia, PA)</Title>
      </div>
    );

    const branding = (
      <div className="branding">
        <a href="https://azavea.com" target="_blank">
          <img src={logo} alt="Azavea logo"/>
        </a>
      </div>
    );

    // time query below adds one minute to selected time, to reconcile conflicting regulations that begin and end at the hour mark
    return (
      <Layout>
          <Sider 
            className="app-sidebar"
            theme="light" 
            width="340"
            style={{
              padding: '10px'
            }}>
            {branding}
            {stickyHeader}
            <Form>
              <Form.Item label="Time and Day">
                <Input.Group compact className="compact-input-group">
                    {dayPicker}
                    <span className="input-group-addon">@</span>
                    {timePicker}
                </Input.Group>
              </Form.Item>
              <Form.Item label="View by">
                {viewOptions}
              </Form.Item>
            </Form>

            {mode === "maxStay" ? ( pieMaxStay ) : ( pieActivity )}
            <br />
            {/* <Button type="primary" icon="download" block href={curblrDataUri} download="export.curblr.json">
              Download CurbLR data
            </Button> */}
            <Divider />
            <Paragraph style={{ "fontSize": "14px" }}>
              The data for this map was developed in partnership with {" "}
              <a href="https://www.centercityphila.org/">Center City District</a> in May 2020.
             This is not an authoritative dataset; users should verify any parking decisions
            at the street level. This map design was created by {" "}
            <a href="https://sharedstreets.io/">Shared Streets.</a>
            </Paragraph>
          </Sider>
        <Content style={{
          height: '100vh',
          position: 'sticky',
          top: '0'
        }}>
          <MapGL
            ref={this._mapRef}
            mapboxApiAccessToken={mapboxAccessToken}
            mapStyle={mapStyle}
            {...viewport}
            onViewportChange={viewport => this.setState({ viewport })}
          />
        </Content>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(Map);
