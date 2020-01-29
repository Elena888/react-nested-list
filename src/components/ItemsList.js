import React from 'react'
import Item from './Item'

const ItemsList = ({ data }) => {

    return (
        <ul>
            {
                data.map(item => {
                    return <Item key={item.name} item={item}/>
                })
            }
        </ul>
    )
};

export default ItemsList;
