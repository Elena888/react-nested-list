import React, { useState } from 'react'
import { ContinentsProvider } from '../context'
import ItemsList from "./ItemsList";

const ContinentsList = ({data}) => {

    const [show, setShow] = useState(false);

    const showChildren = () => {
        setShow(!show)
    };

    const array = Object.values(data).find(item => Array.isArray(item));

    return (
        <ContinentsProvider value={{closeNode: showChildren}}>
            <div>
                <h3 onClick={showChildren}>{data.name}</h3>
                {
                    show &&  array && <ItemsList data={array} />
                }
            </div>
        </ContinentsProvider>
    )
};

export default ContinentsList;
