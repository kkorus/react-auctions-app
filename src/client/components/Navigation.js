import * as React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
	render() {
		return (
			<div>
				<Link to="/">Strona glowna</Link>
				<Link to="/register">Rejestracja</Link>
			</div>
		);
	}
}

export default Navigation;
