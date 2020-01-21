import React from 'react'
import Item from './Item'

const ItemsList = ({ data }) => {

    const renderItem = (item) => {
        if (!item) {
            return null;
        }
        const childrenArr = Object.values(item).find(item => Array.isArray(item));
        const key = `${item.name}_${item.__typename}`;

        return (
            <li key={key}>
                <Item item={item} />
                {childrenArr && childrenArr.length > 0 &&
                    <ul>
                        {childrenArr.map(item => {
                            return renderItem(item)
                            })
                        }
                    </ul>
                }
            </li>
        )
    };

    return (
        <ul>
            {renderItem(data)}
        </ul>
    )
};

export default ItemsList;
