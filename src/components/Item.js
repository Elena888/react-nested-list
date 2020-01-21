import React from 'react'
import { ContinentsConsumer } from '../context'

const Item = ({ item }) => {
    const name = item.name ? item.name : item.code;

    return (
        <ContinentsConsumer>
            {
                ({ index, action }) => {
                    return (
                        item.show && <button type='button' onClick={action(item, index)}>{name}</button>
                    )
                }
            }
        </ContinentsConsumer>
    )
};

export default Item;
