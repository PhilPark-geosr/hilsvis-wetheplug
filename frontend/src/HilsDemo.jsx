// React, Redux
import React from 'react';
import { connect } from 'react-redux';

// Luma.gl
import { SphereGeometry } from '@luma.gl/core';

// Deck.gl
import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { MapView, _GlobeView as GlobeView, COORDINATE_SYSTEM } from '@deck.gl/core';

// Deck.gl built-in layers
import { GeoJsonLayer } from '@deck.gl/layers';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';

// Deck.gl custom layers
import RasterLayer from './components/layers/raster-layer/raster-layer';
import CurrentVectorFieldLayer from './components/layers/current-vector-field-layer/current-vector-field-layer';

// Constant
import { EARTH_RADIUS_METERS } from './constants/Constants';

// Mapbox Acess Token
import * as config from './config';
const TOKEN = config.MapboxAccessToken;

class HilsDemo extends React.Component {
  constructor(props) {
    super(props);

    // initialize local state
    this.state = {
      webGL2Supported: true,
    };

    // bind methods defined within a component's Class to the current object's lexical `this` instance
    this._geojsonifyPaths = this._geojsonifyPaths.bind(this);
  }

  componentWillUnmount() {
    console.clear();
  }

  // convert typhoon paths to geojson
  _geojsonifyPaths(arr) {
    // preallocate
    let geojson = {
      type: 'FeatureCollection',
      features: [],
    };

    // add points
    arr.map((obj) => {
      geojson.features.push({
        type: 'Feature',
        properties: {
          태풍아이디: obj.typhoon_id,
          일시: obj.datetime,
          기압: obj.kma_pres,
          풍속: obj.kma_wind,
          강풍반경: obj.kma_r15,
          강도: obj.kma_grade,
        },
        geometry: {
          type: 'Point',
          coordinates: [obj.lon, obj.lat],
        },
      });
    });

    // add lines
    const lines = arr.map((obj) => {
      return [obj.lon, obj.lat];
    });

    geojson.features.push({
      type: 'Feature',
      properties: null,
      geometry: {
        type: 'LineString',
        coordinates: lines,
      },
    });

    return geojson;
  }

  render() {
    // destructure props
    const {
      viewport,
      // 위험사례 모델정보 관련
      scalar_variable,
      sband,
      vector_variable,
      mband,
      mband_data,
      opacity,
      // 위험사례 관측정보 관련
      typhoons_selected,
      // 디스플레이 관련
      view,
      basemap,
    } = this.props;

    // set up background layers
    const backgroundLayers = [
      // add a sphere
      view.type === 'GlobeView' &&
        new SimpleMeshLayer({
          id: 'earth-sphere',
          data: [0],
          mesh: new SphereGeometry({ radius: EARTH_RADIUS_METERS, nlat: 18, nlong: 36 }),
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          getPosition: [0, 0, 0],
          getColor: [255, 255, 255],
        }),

      // add a coastline
      view.type === 'GlobeView' &&
        new GeoJsonLayer({
          id: 'earth-land',
          data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson',
          stroked: false,
          filled: true,
          opacity: 0.1,
          getFillColor: [30, 80, 120],
        }),
    ].filter(Boolean); // filter null and undefined

    // set up data layers
    const dataLayers = [
      // if a single band raster exists, create a Raster layer
      Object.keys(sband).length !== 0 &&
        new RasterLayer({
          id: 'single-band-raster',
          opacity: opacity / 100,
          // [minX, minY, maxX, maxY]
          imageBounds: [
            sband.metadata.ipX,
            sband.metadata.ipY,
            sband.metadata.ipX + sband.metadata.scaleX * sband.metadata.width,
            sband.metadata.ipY + sband.metadata.scaleY * sband.metadata.height,
          ],
          // [width, height]
          imageTextureSize: [sband.metadata.width, sband.metadata.height],
          // pixels data
          imageData: sband.bands[0].data,
          // color range, [mix, max]
          colorRange: [scalar_variable.min, scalar_variable.max],
          // lookup table palette
          paletteTexture: `/data/lut/${scalar_variable.scheme}.png`,
        }),

      // if a multi band raster exists and vector variable is not none, create a vector field layer
      Object.keys(mband).length !== 0 &&
        mband_data.length !== 0 &&
        vector_variable.var_name !== 'none' &&
        new CurrentVectorFieldLayer({
          id: 'multi-band-raster',
          opacity: opacity / 100,
          data: mband_data,
          radiusPixels: 1,
          getPosition: (d) => d.position,
          getDirection: (d) => {
            const direction = Math.atan2(d.v, d.u);

            // TODO: add case for wind
            // const direction = -(Math.atan2(d.v, d.u) + Math.PI / 2);

            return direction;
          },
          getColor: [255, 255, 255, 255], // white
        }),

      // if typhoons_selected.length > 0, create GeoJson layer(s)
      typhoons_selected.length > 0 &&
        // for each typhoon
        typhoons_selected.map((item) => {
          // convert typhoon paths to geojson
          const data = this._geojsonifyPaths(item.paths);

          // create GeoJson layer(s)
          return new GeoJsonLayer({
            id: `typhoon-path-layer-${item.typhoon_id}`,
            data: data,
            pickable: true,
            filled: true,
            getFillColor: [255, 255, 255, 255], // white
            pointType: 'circle',
            lineWidthScale: 10,
            lineWidthMinPixels: 2,
            stroked: true,
            getLineColor: [0, 0, 255, 255], // blue
            getPointRadius: 2,
            pointRadiusUnits: 'pixels',
            getLineWidth: 5,
          });
        }),
    ].filter(Boolean); // filter null and undefined

    return (
      <DeckGL
        initialViewState={{ ...viewport }}
        controller={true}
        layers={[dataLayers, backgroundLayers]}
        views={view.type === 'GlobeView' ? new GlobeView() : new MapView()}
      >
        {view.type !== 'GlobeView' && (
          <Map mapStyle={`mapbox://styles/mapbox/${basemap.map_style}`} mapboxAccessToken={TOKEN} />
        )}
      </DeckGL>

      /* <DeckGL
        views={new GlobeView()}
        initialViewState={{ ...viewport }}
        controller={true}
        layers={[dataLayers, backgroundLayers]}
      ></DeckGL> */
    );
  }
}

const mapStateToProps = (state) => ({
  // raster
  scalar_variable: state.raster.scalar_variable,
  vector_variable: state.raster.vector_variable,
  sband: state.raster.sband_raster,
  mband: state.raster.mband_raster,
  mband_data: state.raster.mband_data_array,
  opacity: state.raster.opacity,
  // display
  basemap: state.display.basemap,
  view: state.display.view,
  // danger; typhoon
  typhoons_selected: state.danger.typhoons_selected,
});

export default connect(mapStateToProps)(HilsDemo);
