import React from 'react';
import ItemsList from './ItemsList'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

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
        console.log('data', data)
        return (
            <div className="continents">
                <div className="container">
                    <h1>Continents</h1>
                    <ItemsList data={data} />
                </div>
            </div>
        );
    }
}

export default Continents;
