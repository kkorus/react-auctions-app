import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { getAuthKey, getUser } from '../services/userService';
import LinkButton from './LinkButton';

class AddAuctionForm extends React.Component {
    constructor(props) {
        super(props);
        if (!getAuthKey()) this.props.history.push('/login');

        this.state = {
            auction: {},
            categories: [],
            provinces: [],
            errors: []
        };
    }

    async componentDidMount() {
        const responseCategories = await axios.get('/api/categories', { headers: { 'x-auth': getAuthKey() } });
        const responseProvinces = await axios.get('/api/provinces', { headers: { 'x-auth': getAuthKey() } });

        const categories = responseCategories.data.categories;
        const provinces = responseProvinces.data.provinces;

        this.setState({
            auction: {
                user: getUser()._id,
                category: categories[0],
                province: provinces[0],
            },
            categories,
            provinces
        });
    }

    handleChange = (e) => {
        this.setState({
            auction: Object.assign(this.state.auction, {
                [e.target.name]: e.target.value
            })
        });
    };

    onSubmit = () => {
        if (!this.isFormValid()) return;

        axios.
            post('/api/auctions',
                this.state.auction, {
                    headers: { 'x-auth': getAuthKey() }
                }).then((response) => {
                    this.props.history.push('/auctions');
                });
    };

    isFormValid = () => {
        const errors = [];
        this.setState({ errors });
        const { desc } = this.state.auction;

        if (!desc || desc.length < 10) {
            errors.push('Opis nie może mieć mniej niż 10 znaków');
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

                <form onChange={this.handleChange} className="form">
                    <div className="form-group">
                        <label for="desc">Opis:</label>
                        <input name="desc" id="desc" type="text" value={this.state.auction.desc} />
                    </div>
                    <div className="form-group">
                        <label for="category">Kategoria:</label>
                        <select name="category" id="category">
                            {this.state.categories.map((c) => {
                                return <option value={c._id}>{c.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="province">Województwo:</label>
                        <select name="province" id="province">
                            {this.state.provinces.map((p) => {
                                return <option value={p._id}>{p.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="form-buttons">
                        <input type="button" value="Utwórz" onClick={this.onSubmit} />
                        <LinkButton to="/auctions" label="Wróć" />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(AddAuctionForm);
