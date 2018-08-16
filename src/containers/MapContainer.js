import React from 'react';
import MapDoc from '../components/Map'

class MapContainer extends React.Component {
    render() {
        return <div><MapDoc long={this.props.long} lat={this.props.lat} events={this.props.events}/></div>
    }
}

export default MapContainer;