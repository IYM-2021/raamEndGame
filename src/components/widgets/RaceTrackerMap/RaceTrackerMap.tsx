import * as _ from 'lodash';
import * as React from "react";

import ReactMapGL, {
  NavigationControl,
  FlyToInterpolator
} from "react-map-gl";
import {
  defaultMapStyle,
  pointLayer
} from "./MapStyle";
import {fromJS} from "immutable";
import {Img} from 'components/Img/Img';

import imgPersonPin from 'assets/images/personPin.png';

import styles from './RaceTrackerMap.module.css';



const TOKEN = "pk.eyJ1IjoicnNiYXVtYW5uIiwiYSI6ImNqdzg5aWxkYzF1azI0OW5uaWVmazhleXUifQ.XAm1dRGmXuRAMSQm0TJKXg";



class RaceTrackerMap extends React.Component<object, any> {



  constructor(props: any) {
    super(props);

    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        width: "100%",
        height: 750,
        latitude: 33.176215,
        longitude: -117.363864,
        zoom: 9.75,
        bearing: 0,
        pitch: 0
      },

      riderData: []
    };
  }



  public componentDidMount = () => {
    setInterval(() => {
      fetch("/api/trackleads")
        .then(res => res.json())
        .then(data => {

          var trackleaders = data["trackleaders_aggregate_feed"]["trackleaders_feed"];

          const geojsonWrapper = {
            type: "FeatureCollection",
            features: []
          } as any;

          _.forEach(trackleaders, trackLeader => {
            const pointData = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [
                  parseFloat(trackLeader.message[0].longitude[0]),
                  parseFloat(trackLeader.message[0].latitude[0])
                ]
              },
              properties: {
                speed: 10
              }
            };
            geojsonWrapper.features.push(pointData);
          });

          let {mapStyle} = this.state;
          if (!mapStyle.hasIn(["sources", "point"])) {
            mapStyle = mapStyle
              .setIn(
                ["sources", "point"],
                fromJS({type: "geojson", data: geojsonWrapper})
              )
              .set("layers", mapStyle.get("layers").push(pointLayer));
          }

          // Update data source
          mapStyle = mapStyle.setIn(
            ["sources", "point", "data"],
            geojsonWrapper
          );

          this.setState({mapStyle});
        })

        .catch(error => {
          console.log("Looks like there was a problem: \n", error);
        });

    }, 5000);
  };



  public render = () => (
    <div className={styles.root}>
      <ReactMapGL
        className={styles.map}
        mapboxApiAccessToken={TOKEN}
        mapStyle={this.state.mapStyle}
        {...this.state.viewport}
        onViewportChange={this.__handleViewportChange}>
        <NavigationControl
          className={styles.nav}
          onViewportChange={this.__handleViewportChange} />

        <button
          className={styles.goToDave}
          onClick={this.__handleGoToCyclist}>
          <Img src={imgPersonPin} />
        </button>
      </ReactMapGL>
    </div>
  );



  private __handleGoToCyclist = () => {
    const viewport = {
      ...this.state.viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator()
    };
    this.setState({viewport});
  };



  private __handleViewportChange = (viewport: any) => {
    this.setState({viewport});
  };

}

export default RaceTrackerMap;