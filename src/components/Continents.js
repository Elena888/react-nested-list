import React from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import ItemsList from './ItemsList'
import { ThemeContext, showChildren } from '../theme-context';

class Continents extends React.Component {
    state = {
        data: [],
    };

    componentDidMount(){

        new ApolloClient({
            uri: 'https://countries.trevorblades.com'
        }).query({
            query: gql`
                {
                    continents {
                        name
                        code
                        countries {
                            name
                            code
                            languages {
                                code
                                name
                            }
                        }
                    }
                }
            `
        }).then(result => {
            const {continents} = result.data;
            const dataNew = [...continents];
            dataNew.map((item) => {
                item["show"] = true;
            });

            this.setState({
                data: dataNew,
            })
        });
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

    toggle = (item, continentIndex) => {

        const { data } = this.state;
        const dataNew = [...data];

        console.log("toggle",item);
        console.log("toggle",dataNew);


        let next = Object.values(item).find(item => Array.isArray(item));
        if(next){
            next.map(item => {
                if(item['show']){
                    this.hide(item)

                }else{
                    item["show"] = true;

                }
            });
        }else{
            this.closeNode(continentIndex)
        }
        console.log('dataNew[contientIndex]', dataNew[continentIndex]);

        // Object.assign(dataNew[contientIndex], next)
        //
        // this.setState({data: dataNew})
        this.forceUpdate();
    };


    closeNode = id => {
        console.log("closeNode", id)
        const { data } = this.state;
        const dataNew = [...data];
        let next = Object.values(dataNew[id]).find(item => Array.isArray(item));
        next.map(item => {
             this.hide(item)
        });


       // this.setState(this.state)
    };

    render() {
        const { data } = this.state;
        console.log("render",data);
        if(data.length === 0){return null;}

        return (
            <div className="continents">
                <div className="container">
                    {
                        data.map((item, index) => {
                            console.log("render", index);
                            return <ItemsList data={item} continentIndex={index} toggle={this.toggle}/>
                        })
                    }

                </div>
            </div>
        );
    }
}

export default Continents;
