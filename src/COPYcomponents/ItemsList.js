import React from 'react'
import Item from "./Item"

class ItemsList extends React.Component {
    constructor(props){
        super(props);

        props.data.map(item => {
            item["show"] = true;
        });
          console.log(props.data);
        this.state = { data: props.data };
    }

    equals =  (array1, array2) => {
        // if the other array is a falsy value, return
        if (!array2)
            return false;

        // compare lengths - can save a lot of time
        if (array1.length != array2.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                // recurse into the nested arrays
                if (!array1[i].equals(array2[i]))
                    return false;
            }
            else if (array1[i] != array2[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };


    toggle = array => {
        let data = this.state.data;

        array.map(item => {
            if(!item.show){
                item.show = true;
            }else{
                this.hide(item);
            }
        });

        this.setState({data: data});
    };


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


    onCloseChild = (continent) => {
      //  console.log(item);
        const { data } = this.state;
        let root = data[continent];
        console.log(root);
        if(!root){return}
        let array = Object.values(root).find(item => Array.isArray(item));

        array.map((item)=>{
            this.hide(item);
        });
        this.setState({data: data});
    };

    AddItem = (node, continent) => {
        if (!node) {
            return null;
        }
        let data = [];

        data.push(
            <div key={data.length}>
                <Item item={node} continent={continent} toggle={this.toggle} onCloseChild={this.onCloseChild}/>
            </div>
        );

        let array = Object.values(node).find(item => Array.isArray(item));

        if (array) {
            array.map(item => {
                data.push(
                    <div key={data.length}>
                        <ul>{this.AddItem(item, continent)}</ul>
                    </div>
                );
            })
        }
        return data;
    };

    renderItem(node, continent) {

        let jsx = this.AddItem(node, continent);
        return jsx.map((item, index) => {
            //  console.log(item)
            return (
                <div key={index}>
                    {item}
                </div>)
        })
    }

    render() {
        const {data} = this.state;



        return <div>
            {data.map((node, idx) => {

                return this.renderItem(node, idx)
                })
            }
        </div>
    }
}

export default ItemsList;
