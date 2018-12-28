import React, { Component } from 'react';
import './NavBar.scss';

 const NavBar = ({ title, color, hasBack, onGoBack }) =>
	<header className={`nav-bar bg-${color}`}>
		<div className="page-width page-margins">
			{hasBack ?
				(
					<a href="#" className="back-button" onClick={onGoBack}>
						<i className="fas fa-arrow-left"></i>
					</a>
				)
				: ''}
			<h1>{title}</h1>
		</div>
	</header>;

export default NavBar;