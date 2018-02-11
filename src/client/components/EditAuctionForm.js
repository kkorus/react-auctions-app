import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { getAuthKey } from '../services/userService';
import LinkButton from './LinkButton';

class EditAuctionForm extends React.Component {
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
        const responseAuction = await axios.get(`/api/auctions/${this.props.match.params.id}`, {
            headers: { 'x-auth': getAuthKey() }
        });

        const responseCategories = await axios.get('/api/categories', { headers: { 'x-auth': getAuthKey() } });
        const responseProvinces = await axios.get('/api/provinces', { headers: { 'x-auth': getAuthKey() } })

        this.setState({
            auction: {
                desc: responseAuction.data.auction.desc,
                category: responseAuction.data.auction.category._id,
                province: responseAuction.data.auction.province._id,
            },
            categories: responseCategories.data.categories,
            provinces: responseProvinces.data.provinces
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

        axios
            .patch(`/api/auctions/${this.props.match.params.id}`, this.state.auction, {
                headers: { 'x-auth': getAuthKey() }
            })
            .then((response) => {
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
                                return (
                                    <option value={c._id} selected={c._id == this.state.auction.category._id}>
                                        {c.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="province">Województwo:</label>
                        <select name="province" id="province">
                            {this.state.provinces.map((p) => {
                                return (
                                    <option value={p._id} selected={p._id == this.state.auction.province._id}>
                                        {p.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-buttons">
                        <input type="button" value="Zapisz" onClick={this.onSubmit} />
                        <LinkButton to="/auctions" label="Wróć" />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditAuctionForm);
