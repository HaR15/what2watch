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
		var filterValue = this.props.filter.values[0];
		if(this.props.filter.name.indexOf("IMDb") > -1)
			filterValue = "7+";
		if(this.props.filter.name.indexOf("RottenTomatoes") > -1)
			filterValue = "70+";
		this.setState({
			filterName: this.props.filter.name, 
			filterValues: this.props.filter.values, 
			filterValue: filterValue
		});
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
						<h6 style={this.labelStyle}>{this.state.filterName.toUpperCase()}</h6>
						<button style={this.buttonStyle} type="button" id="filterValue" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{this.state.filterValue}							
						</button>
						<div style={this.ddMenuStyle} className="dropdown-menu">
							{/*{this.state.filterValues.map(val => <button className="dropdown-item" onClick={this.changeOption.bind(this)}>{val}</button>)}																*/}
							{this.state.filterValues.map(val => <button className="dropdown-item" onClick={this.props.filter.onClickHandler}>{val}</button>)}																
						</div>
					</div>						
				</div>					
		);
  }
}

export default Filter;