import React from 'react'
import ItemsList from './ItemsList'

class Item extends React.Component {

    constructor (props){
        super(props);
        this.state = { showChild: props.showChildren };
    }

    handleCollapse = () => {
        this.setState({ showChild: !this.state.showChild});
    };

    render(){

        const { showChild } = this.state;
        const { item, depth } = this.props;
        let childrenArr = Object.values(item).find(arr => Array.isArray(arr));

        return (
            <>
                { childrenArr && childrenArr.length > 0
                    ?
                    <>
                        <button type='button' onClick={this.handleCollapse}>
                            {item.name ? item.name : item.code}
                        </button>
                        <ItemsList data={childrenArr} depth={depth} />
                    </>
                    :
                    <button type='button' onClick={this.props.handleCloseAll}>
                        {item.name ? item.name : item.code}
                    </button>
                }
            </>
        )
    };
}

export default Item;
