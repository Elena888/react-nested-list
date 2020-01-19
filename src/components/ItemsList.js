import React from 'react'

class ItemsList extends React.Component{
    state = {
        visible: false,
    };

    toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    render() {
        const {data} = this.props;

        let childNodes = null;

        if (data.length > 0) {
            data.map((item) => {
                let next = Object.values(item).find(item => Array.isArray(item));
                if (next != null) {
                    childNodes = next.map(function (node, index) {
                        return (
                            <li key={index}>
                                <button>{node.name}</button>
                                <ItemsList data={node}/>
                            </li>
                        )
                    });

                }
            })
        }


        let style;
        if (!this.state.visible) {
            style = {display: "none"};
        }
console.log('-', data)

        return(
            <div>
                <h5 onClick={this.toggle} >
                    {data.name}
                </h5>
                <ul style={style}>
                    {childNodes}
                </ul>
            </div>


        )
    }
}

export default ItemsList;
