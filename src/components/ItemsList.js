import React from 'react'
import Item from './Item'

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
    }


    renderItem = (item) => {
        if (!item) {
            return null;
        }

        const {toggle, contientIndex} = this.props;
        let next = Object.values(item).find(item => Array.isArray(item));

        let type = item.__typename;

        return (
            <ul key={item.name + '-' + type}>
                {
                    <li>
                        <Item item={item} toggle={toggle} continentIndex={contientIndex} />
                        {
                            next && next.length > 0 && next.map(item => {
                                return this.renderItem(item)
                            })
                        }
                    </li>
                }
            </ul>
        )

    };

    render() {
        const {data} = this.props;
        //  console.log('contientIndex', this.props.data)
        return (
            this.renderItem(data)

        )
    }
}

export default ItemsList;