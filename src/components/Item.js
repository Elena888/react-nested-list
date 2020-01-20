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


        const { item, toggle,continentIndex } = this.props;
        let name = item.name ? item.name : item.code;

        return (
            <div>
            {item.show ? <span
                onClick={() => toggle(item, continentIndex)}>{name}</span> : null}
            </div>
    )
    };
}

export default Item;
