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
            this.setState({
                data: result.data.continents,
            })
        });
    }


    render() {
        const { data } = this.state;

        console.log('data', data);
        return (
            <div className="continents">
                <div className="container">
                    <h1>Continents</h1>
                    {
                      data.length > 0 &&  data.map(item => {
                            let children = Object.values(item).find(item => Array.isArray(item));
                            return(
                                <>
                                    <li>{item.name}</li>
                                    <ItemsList data={children} />
                                </>
                            )
                        })
                    }


                </div>
            </div>
        );
    }
}

export default Continents;
