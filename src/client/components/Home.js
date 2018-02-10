import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { getAuthKey } from '../services/userService';

class Home extends React.Component {
    onSignOut(e) {
        e.preventDefault();
        localStorage.removeItem('x-auth');
        this.props.history.push('/');
    }

    render() {
        let loginSection = null;
        if (getAuthKey()) {
            loginSection = (
                <ul>
                    <li>
                        <NavLink to="/login" activeClassName="active" onClick={this.onSignOut.bind(this)}>
                            Wyloguj
						</NavLink>
                    </li>
                </ul>
            );
        } else {
            loginSection = (
                <ul>
                    <li>
                        <NavLink to="/login" activeClassName="active">
                            Zaloguj
						</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" activeClassName="active">
                            Rejestracja
						</NavLink>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                <div>{loginSection}</div>
                <p>Witamy na głównej stronie przetargów!</p>
                <p>W celu korzystania aplikacji należy się zalogować.</p>
            </div>
        );
    }
}

export default withRouter(Home);
