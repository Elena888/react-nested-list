import React from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import ItemsList from './ItemsList';
import { ContinentsProvider } from '../context'

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
                return item.show = true;
            });

            this.setState({
                data: dataNew,
            })
        });
    }

    hide = item => {
        if(!item){ return }
        item.show = false;

        const array = Object.values(item).find(item => Array.isArray(item));
        if(array){
            array.map(value => {
                return this.hide(value)
            })
        }
    };

    toggle = (item, continentIndex) => () => {
        const array = Object.values(item).find(item => Array.isArray(item));
        if(array && array.length > 0){
            array.map(item => {
                if(item.show){
                    return this.hide(item)
                }else{
                    return item.show = true;
                }
            });
            this.forceUpdate();
        }else{
            this.closeNode(continentIndex)
        }
    };

    closeNode = index => {
        const { data } = this.state;
        const dataNew = [...data];
        const array = Object.values(dataNew[index]).find(item => Array.isArray(item));
        array.map(item => {
             return this.hide(item)
        });

        this.setState({data: dataNew})
    };

    render() {
        const { data } = this.state;

        return (
            <div className="continents">
                <div className="container">
                    {
                        data.length > 0 && data.map((item, index) => {
                            return(
                                <ContinentsProvider key={index} value={
                                        {
                                            index,
                                            action: this.toggle
                                        }
                                    }
                                >
                                    <ItemsList data={item} />
                                </ContinentsProvider>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Continents;
