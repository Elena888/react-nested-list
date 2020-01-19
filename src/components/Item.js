import React from 'react'
import ItemsList from './ItemsList'

class Item extends React.Component {

    constructor (props){
        super(props);
        this.state = { showChild: false };
    }

    handleCollapse = () => {
        this.setState({ showChild: !this.state.showChild});
    };

    handleCloseAll = () => {
        console.log('click1')
    };

    render(){

        const { showChild } = this.state;
        const { item } = this.props;
        let childrenArr = Object.values(item).find(arr => Array.isArray(arr));

        return (
            <>
                { childrenArr && childrenArr.length > 0
                    ?
                    <>
                        <button type='button' onClick={this.handleCollapse}>
                            {item.name ? item.name : item.code}
                        </button>
                        { showChild && <ItemsList data={childrenArr} /> }
                    </>
                    :
                    <button type='button' onClick={this.handleCloseAll}>
                        {item.name ? item.name : item.code}
                    </button>
                }
            </>
        )
    };
}

export default Item;
