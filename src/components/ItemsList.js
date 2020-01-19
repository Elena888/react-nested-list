import React from 'react'

class ItemsList extends React.Component{
    constructor(props){
        super(props);
        this.state = { data: props.data };
    }

    hide = item => {
        if(!item){ return }
        item.show = false;
        let array = Object.values(item).find(item => Array.isArray(item));

        if(array){
            array.map(value => {
                this.hide(value)
            })
        }
    };

    handleClick = (e, item) => {
        //console.log(item);

        const dataNew = {...item};

        let next = Object.values(dataNew).find(item => Array.isArray(item));
        if(next){
            next.map(item => {
                if(item['show']){
                    item["show"] = false;

                }else{
                    item["show"] = true;

                }
            });
        }
        console.log('dataNew', dataNew);
        this.setState(this.state)
    };

    handleClickLastLeaf =(e, id) => {
        this.props.handleClickLastLeaf(id)
    };

    renderItem = (item, continentIndex) => {

        const {handleClickLastLeaf} = this.props;
        let next = Object.values(item).find(item => Array.isArray(item));
        let name = item.name ? item.name : item.code;
        let type = item.__typename;

        return(
            <ul key={name + '-' + type}>
                {item.show &&
                <li>
                    {next ?
                        <React.Fragment>
                            <span onClick={(e) => this.handleClick(e, item)}>{name}</span>

                            <ItemsList data={next} handleClickLastLeaf={handleClickLastLeaf}/>
                        </React.Fragment>
                        :

                        <span onClick={(e) => this.handleClickLastLeaf(e, continentIndex)}>{name}</span>

                    }
                </li>
                }
            </ul>
        )

    };

    render() {
        const {data} = this.state;

        return(
            data.map((item, index) => {
                console.log("render",index)
                return this.renderItem(item, index)
            })
        )
    }
}

export default ItemsList;