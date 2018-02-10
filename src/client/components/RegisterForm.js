import * as axios from 'axios';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { login } from '../services/userService';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            register: {
                name: '',
                password: '',
                confirmPassword: ''
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            register: Object.assign(this.state.register, {
                [e.target.name]: e.target.value
            })
        });
    };

    onSubmit = () => {
        if (!this.isFormValid()) return;

        let self = this;
        axios
            .post('/api/users', {
                name: this.state.register.name,
                password: this.state.register.password,
            })
            .then(function (res) {
                login(res);
                self.props.history.push('/');
            })
            .catch(function (error) {
                const errors = ['Nazwa użytkownika zajęta, proszę wybrać inną'];
                self.setState({ errors });
            });
    };

    isFormValid = () => {
        const errors = [];
        this.setState({ errors });

        if (!this.state.register.name || this.state.register.name.length < 3) {
            errors.push('Nazwa musi mieć co najmniej 3 znaki');
        }

        if (!this.state.register.password || this.state.register.password.length < 6) {
            errors.push('Hasło musi miec co najmniej 6 znakow');
        }

        if (this.state.register.password != this.state.register.confirmPassword) {
            errors.push('Hasła muszą być identyczne');
        }

        if (errors.length > 0) {
            this.setState({ errors });
            return false;
        }

        return true;
    }

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
                <form onChange={this.handleChange} className="form">
                    <div className="form-group">
                        <label for="name">Nazwa:</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={this.state.register.name} />
                    </div>

                    <div className="form-group">
                        <label for="password">Haslo:</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            value={this.state.register.password} />
                    </div>

                    <div className="form-group">
                        <label for="confirm-password">Potwierdź haslo:</label>
                        <input
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            value={this.state.register.confirmPassword}
                        />
                    </div>

                    <div className="form-buttons">
                        <input type="button" value="Zarejestruj" onClick={this.onSubmit} />
                        <input type="button" value="Zaloguj" onClick={() => this.props.history.push('/login')} />
                        <input type="button" value="Wróć" onClick={() => this.props.history.push('/')} />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterForm);
