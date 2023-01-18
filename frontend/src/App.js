// React
import React from 'react';

// CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Components
import Menu from './components/menu/Menu';
import Panel from './components/panel/Panel';
import CustomAlert from './components/layout/CustomAlert';
import HilsDemo from './HilsDemo';

// ppark
import { Router, Route, Switch } from 'react-router-dom';

// Setup the animation loop
import TWEEN from '@tweenjs/tween.js';
const animate = () => {
  window.requestAnimationFrame(animate);
  TWEEN.update();
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // set local initial state
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        longitude: 129,
        latitude: 36,
        zoom: 4,
        pitch: 60,
        bearing: 0,
      },
    };

    // bind methods defined within a component's Class to the current object's lexical `this` instance
    this._onResize = this._onResize.bind(this);
    this._updateViewport = this._updateViewport.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    this._onResize();
    animate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  _onResize() {
    this._updateViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  _updateViewport(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  }

  render() {
    // destructure state
    const { viewport } = this.state;

    return (
      <React.Fragment>
        <HilsDemo viewport={viewport} />
        <Menu />
        <Panel />
        <CustomAlert />
      </React.Fragment>
    );
  }
}
