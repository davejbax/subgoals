import React, { Component } from 'react';
import './NavBar.scss';

class NavBar extends Component {

	render() {
		const background = 'bg-' + this.props.color;
		return (
			<header className={`nav-bar ${background}`}>
				<div className="page-width page-margins">
					{this.props.hasBack ?
						(<a href="#" className="back-button" onClick={this.props.onGoBack}><i className="fas fa-arrow-left"></i></a>)
						: ''}
					<h1>{this.props.title}</h1>
				</div>
			</header>
		);
	}

}

export default NavBar;