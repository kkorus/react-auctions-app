import * as axios from 'axios';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { login } from '../services/userService';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            login: {
                name: '',
                password: ''
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            login: Object.assign(this.state.login, {
                [e.target.name]: e.target.value
            })
        });
    };

    onSubmit = () => {
        if (!this.isFormValid()) return;

        let self = this;

        axios.post('/api/users/login', {
            name: this.state.login.name,
            password: this.state.login.password
        }).then(function (res) {
            login(res);
            self.props.history.push('/');
        }).catch(function (error) {
        })
    }

    isFormValid = () => {
        const errors = [];
        this.setState({ errors });
        const { name, password } = this.state.login;

        if (!name || name.length < 3) {
            errors.push('Nazwa musi mieć co najmniej 3 znaki');
        }

        if (!password || password.length < 6) {
            errors.push('Hasło musi miec co najmniej 6 znakow');
        }

        if (errors.length > 0) {
            this.setState({ errors });
            return false;
        }

        return true;
    };

    render() {
        return (
            <div>
                {this.state.errors.length > 0 &&

                    <div className="errors">
                        <ul>
                            {this.state.errors.map(error => {
                                return <li>{error}</li>;
                            })}
                        </ul>
                    </div>
                }
                <form className="form" onChange={this.handleChange} >
                    <div className="form-group">
                        <label for="name">Name:</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={this.state.login.name}
                        />
                    </div>

                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            value={this.state.login.password}
                        />
                    </div>

                    <div className="form-buttons">
                        <input type="button" value="Zaloguj" onClick={this.onSubmit} />
                        <input type="button" value="Zarejestruj" onClick={() => this.props.history.push('/register')} />
                        <input type="button" value="Wróć" onClick={() => this.props.history.push('/')} />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);
