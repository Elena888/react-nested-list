import React, {useState, useEffect} from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import ContinentsList from './ContinentsList';

const Continents = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
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
           setData( result.data.continents )
       });
   }, []);

    return (
        <div className="continents">
            <div className="container">
                <ul>
                {
                    data.length > 0 && data.map((item) => {
                        return <ContinentsList key={item.name} data={item} />
                    })
                }
                </ul>
            </div>
        </div>
    );
};

export default Continents;
