import React from 'react'
import Item from './Item'

class ItemsList extends React.Component{
    state = {
        showChildren: true,
    };

    handleCloseAll = () => {
        this.setState({
            showChildren: false
        })
    };

    render() {
        const { showChildren } = this.state;
        const { data } = this.props;
        const Li = data.map((item) => {
            return (
                <li key={`${item.name}_${item.code}`}>
                    <Item item={item} showChildren={showChildren} handleCloseAll={this.handleCloseAll} />
                </li>
            )
        });
        return (
            <ul>{Li}</ul>
        )
    }
}

export default ItemsList;
