import * as React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import AddAuctionForm from './AddAuctionForm';
import AuctionsList from './AuctionsList';
import EditAuctionForm from './EditAuctionForm';
import Home from './Home';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="navigation">
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="active">
                                Strona główna
							</NavLink>
                        </li>
                        <li>
                            <NavLink to="/auctions" activeClassName="active">
                                Przetargi
							</NavLink>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/" component={Home} exact={true} />
                        <Route path="/auctions" component={AuctionsList} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/edit-auction/:id" component={EditAuctionForm} />
                        <Route path="/add-auction" component={AddAuctionForm} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
