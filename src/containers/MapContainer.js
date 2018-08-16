import React from 'react';
import MapDoc from '../components/Map'

class MapContainer extends React.Component {
    render() {
<<<<<<< HEAD
        return <div>Map container<Map /></div>
=======
        return <div><MapDoc long={this.props.long} lat={this.props.lat} events={this.props.events}/></div>
>>>>>>> f2af4f6c084b44de9061a63e9dbcf479857339ec
    }
}

export default MapContainer;