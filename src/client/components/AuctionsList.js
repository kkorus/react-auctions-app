import * as axios from 'axios';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { getAuthKey } from '../services/userService';
import AuctionListItem from './AuctionListItem';
import LinkButton from './LinkButton';

class AuctionsList extends React.Component {
    constructor(props) {
        super(props);
        if (!getAuthKey()) this.props.history.push('/login');

        this.state = {
            auctions: [],
            search: {
                desc: '',
                category: '',
                province: ''
            },
            categories: [{ _id: null, name: 'Wszystkie kategorie' }],
            provinces: [{ _id: null, name: 'Cala Polska' }]
        };
    }

    async componentDidMount() {
        const response = await axios.get('/api/auctions', { headers: { 'x-auth': getAuthKey() } });
        const responseCategories = await axios.get('/api/categories', { headers: { 'x-auth': getAuthKey() } });
        const responseProvinces = await axios.get('/api/provinces', { headers: { 'x-auth': getAuthKey() } });

        this.setState(prevState => {
            return {
                auctions: response.data.auctions,
                categories: prevState.categories.concat(responseCategories.data.categories),
                provinces: prevState.provinces.concat(responseProvinces.data.provinces)
            }
        });
    }

    onDelete = (id) => {
        axios.delete(`/api/auctions/${id}`, { headers: { 'x-auth': getAuthKey() } }).then((response) => {
            this.setState((prevState) => ({
                auctions: prevState.auctions.filter((auction) => auction._id != id)
            }));
        });
    };

    onSearch = () => {
        const searchQuery = `/api/auctions?desc=${this.state.search.desc}&category=${this.state.search.category}&province=${this.state.search.province}`;
        axios
            .get(searchQuery, { headers: { 'x-auth': getAuthKey() } })
            .then(response => {
                this.setState({
                    auctions: response.data.auctions
                });
            });
    }

    onFormChange = (e) => {
        this.setState({
            search: Object.assign(this.state.search, {
                [e.target.name]: e.target.value
            })
        });
    };

    render() {
        return (
            <div>
                <form onChange={this.onFormChange}>
                    <table className="auction-table">
                        <thead>
                            <tr>
                                <th>Opis</th>
                                <th>Kategoria</th>
                                <th>Województwo</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="desc" /></td>
                                <td>
                                    <select name="category" id="category">
                                        {this.state.categories.map((c) => {
                                            return <option value={c._id}>{c.name}</option>;
                                        })}
                                    </select></td>
                                <td>
                                    <select name="province" id="category">
                                        {this.state.provinces.map((p) => {
                                            return <option value={p._id}>{p.name}</option>;
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <input type="button" onClick={this.onSearch} value="Szukaj" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <table className="auction-table">
                    <thead>
                        <tr>
                            <th />
                            <th>Opis</th>
                            <th>Kategoria</th>
                            <th>Województwo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.auctions.map((a) => {
                            return <AuctionListItem auction={a} key={a._id} onDelete={this.onDelete} />;
                        })}
                    </tbody>
                </table>
                <LinkButton to="/add-auction" label="Dodaj przetarg" />

            </div>
        );
    }
}

export default withRouter(AuctionsList);
