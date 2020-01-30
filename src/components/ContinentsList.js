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
            <li>
                <button onClick={showChildren}>{data.name}</button>
                {
                    show &&  array && <ItemsList data={array} />
                }
            </li>
        </ContinentsProvider>
    )
};

export default ContinentsList;
