import React from 'react';

class Filter extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			filterName: "",
		  filterValues: []
		};
	}

	componentDidMount() {
		this.setState({
			filterName: this.props.filter.name, 
			filterValues: this.props.filter.values, 
			filterValue: this.props.filter.values[0]
		});
		// fetch("")
		// .then(res => res.json)
		// .then(results => {
				
		// });
	}

	changeOption(e) {
		let filterValue = e.target.innerText;
		this.setState( {filterValue : filterValue });
	}

	labelStyle = {
		color: 'white'
	}

	buttonStyle = {
		width: '100%',
		display: 'inline-block'
	}

	ddMenuStyle = {
		height: 'auto',
		maxHeight: '200px',
		overflow: 'auto'
	}

	filterDivStyle = {
		width: '100%'
	}

	render() {
		return(
				<div className="input-group-btn col-sm-2">
					<div style={this.filterDivStyle}>
						<h6 style={this.labelStyle}>{this.state.filterName}</h6>
						<button style={this.buttonStyle} type="button" id="filterValue" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{this.state.filterValue}							
						</button>
						<div style={this.ddMenuStyle} className="dropdown-menu">
							{this.state.filterValues.map(val => <button className="dropdown-item" onClick={this.changeOption.bind(this)}>{val}</button>)}																
						</div>
					</div>						
				</div>					
		);
  }
}

export default Filter;