import React from 'react';
import axios from 'axios';

export default class LocationList extends React.Component {
    state = {
        locations: [],
    };

    componentDidMount() {
        axios.get('http://localhost:3000/api/locations').then(res => {
            this.setState({ locations: res.data });
        })
    }

    render() {
        var cards = [];
        for (var i = 0; i < this.state.locations.length; i++) {
            const location = this.state.locations[i];
            cards.push(
                <div key={location._id} className="col">
                    <div className="card">
                        <div className="card-body">
                            <p>ID: {location._id}</p>
                            <p>Name: {location.name}</p>
                            <p>Address: {location.address}</p>
                        </div>
                    </div>
                </div>
            )

        }
        return (
            <div className="container">
                <div className="row">
                    {cards}
                </div>
            </div>
        )
    }
}
