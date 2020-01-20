import React from 'react'

const Item = (props) => {

    const {item, toggle, continentIndex} = props;
    let name = item.name ? item.name : item.code;

    return (
        <div>
            {item.show ? <span
                onClick={() => toggle(item, continentIndex)}>{name}</span> : null}
        </div>
    )
}

export default Item;
