import * as React from 'react';

import LinkButton from './LinkButton';

class AuctionListItem extends React.Component {
    render() {
        const { auction } = this.props;

        return (
            <tr>
                <td>
                    <LinkButton to={`/edit-auction/${auction._id}`} label="Edytuj" />
                    <input type="button" onClick={() => this.props.onDelete(auction._id)} value="Usuń" />
                </td>

                <td>{auction.desc}</td>
                <td>{auction.category.name}</td>
                <td>{auction.province.name}</td>
            </tr>
        );
    }
}

export default AuctionListItem;
