import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import { Provider, connect } from 'react-redux';
import store from '../../store';
import "mapbox-gl/dist/mapbox-gl.css";
import './styles.css';
import { Creators as ModalActions } from '../../store/ducks/modal';
import { bindActionCreators } from 'redux';

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleMapClick = async e => {
    const [latitude, longitude] = e.lngLat;
    const { showModal } = this.props;

    await showModal({ latitude, longitude });
  }

  render() {
    const { users } = this.props;
    const { viewport: viewportState } = this.state;
    
    return (
      <Provider store={store}>
        <MapGL
          {...viewportState }
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={
            "pk.eyJ1IjoidmluYWxpdHkiLCJhIjoiY2pzdDVyYnIzMHV1aDQ0cGJocXE3bm1paCJ9.XhMofqZrhVKKFbKLfJdlgw"
          }
          onViewportChange={viewport => this.setState({ viewport })}
        > 
          {users.data.map(user => (
            <Marker
              latitude={user.cordinates.latitude}
              longitude={user.cordinates.longitude}
              key={user.id}
            >
              <div className="marker-wrapper">
                <img className="avatar" alt={`${user.name} Avatar`} src={user.avatar} />
                <h1>{user.name}</h1>
              </div>
            </Marker>
          ))}
        </MapGL>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);