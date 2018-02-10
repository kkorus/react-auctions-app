import React from 'react';
import { Link } from 'react-router-dom';

class LinkButton extends React.Component {
	render() {
		const { to, label } = this.props;
		return (
			<Link to={to}>
				<input type="button" value={label} />
			</Link>
		);
	}
}

export default LinkButton;
