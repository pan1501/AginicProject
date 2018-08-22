import React from 'react';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';

export default class LocationInput extends React.Component {
	state = {
		name: '',
		address: ''
	};

	handleNameChange = event => {
		this.setState({ name: event.target.value });

	}
	handleAddressChange = event => {
		this.setState({ address: event.target.value });

	}
	handleClick(e) {
		this.refs.fileUploader.click();
	}
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleSubmit = event => {
		event.preventDefault();

		axios.post('http://localhost:3000/api/locations', { name: this.state.name, address: this.state.address }).then(res => {
			window.location.reload();
		});
	};
	handleFiles = files => {
		var reader = new FileReader();
		reader.onload = function (e) {
			var fileResult = String(reader.result);
			var linebreak = fileResult.split("\n");
			for (var i = 1; i < linebreak.length; i++) {
				var usefuldata = linebreak[i].split(",")
				for (var j = 0; j < usefuldata.length; j++) {
					if (j === 0) {
						var pureLocationName = String(usefuldata[j].split(",")).replace('"', '')

					} else if (j === 1) {
						var pureStreet = String(usefuldata[j].split(",")).replace('"', '').replace(" ", "")
					}
					else {
						var pureSuburb = String(usefuldata[j].split(",")).replace('"', '').replace(" ", "")
					}
					var pureLocationAddress = pureStreet + " , " + pureSuburb
				}
				axios.post('http://localhost:3000/api/locations', { name: pureLocationName, address: pureLocationAddress }).then(res => {
					window.location.reload();
					
				});

			}

		}
		reader.readAsText(files[0]);
		alert("Load successful!");
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="col">
						<label className="inputelabel">
							Location name:
						</label>
					</div>
					<div className="col">
						<input className="inputbox" required type="text" name="name" onChange={this.handleNameChange} />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<label className="inputelabel">
							Location address:
						</label>
					</div>
					<div className="col">
						<input className="inputbox" required type="text" name="address" onChange={this.handleAddressChange} />
					</div>
				</div>
				<button className="btn btn-primary" type="submit">Add</button>
				{/* <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/> */}
				<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
					<button className='btn btn-info'>Upload</button>
				</ReactFileReader>
			</form>
		);
	}
}