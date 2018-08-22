import React from 'react';
import axios from 'axios';
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyD9l3QrVo9QYKQ1Z3g-VWv4u-f4ckaRX8g");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

export default class GetCoordination extends React.Component {
    state = {
        id: '',
        address: '',
        lat: '',
        lng: ''
    };

    handleIdChange = event => {
        this.setState({ id: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.get('http://localhost:3000/api/locations/' + this.state.id).then(res => {
            this.setState({ address: res.data.address });
            Geocode.fromAddress('"' + this.state.address + '"').then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({ lat: response.results[0].geometry.location.lat });
                    this.setState({ lng: response.results[0].geometry.location.lng });
                    console.log();
                    console.log(lat, lng);
                },
                error => {
                    console.error(error);
                }
            );
        },
            error => {
                console.error(error);
                this.setState({ lat: "Depending" });
                this.setState({ lng: "Depending" });
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label className="inputelabel">
                                Location ID:
                            </label>
                        </div>
                        <div className="col">
                            <input className="inputbox" required type="text" name="id" onChange={this.handleIdChange} />
                        </div>
                    </div>
                    <button className="btn btn-danger" type="submit">Check</button>
                </form>
                <div className="row">
                    <div className="col">
                        <p>Lat: {this.state.lat}</p>
                    </div>
                    <div className="col">
                        <p>Lng:{this.state.lng}</p>
                    </div>
                </div>
            </div>

        );
    }
}