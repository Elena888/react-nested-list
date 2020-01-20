import React from 'react'

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
        let name = item.name ? item.name : item.code;
        let type = item.__typename;

        return (
            <ul key={name + '-' + type}>
                {
                    <li>
                        {item.show ? <span
                            onClick={() => toggle(item, contientIndex)}>{name}</span> : null}
                        {
                            next && next.length > 0 && next.map(item => {
                                return <ItemsList data={item} contientIndex={contientIndex} toggle={toggle}/>
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