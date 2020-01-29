import React, {useState} from 'react'
import ItemList from './ItemsList'
import { ContinentsConsumer } from '../context'

const Item = ({item}) =>{

    const [show, setShow] = useState(false);

    const showChildren = () => {
        setShow(!show)
    };

    const name = item.name ? item.name : item.code;
    const array = Object.values(item).find(item => Array.isArray(item));

    return (
        <li>
            {array && array.length > 0 ?
                <>
                    <button onClick={showChildren}>{name}</button>
                    {show && <ItemList data={array} />}
                </>
                :
                <ContinentsConsumer>
                    {
                        ({ closeNode }) => {
                            return (
                                <button type='button' onClick={closeNode}>{name}</button>
                            )
                        }
                    }

                </ContinentsConsumer>
            }
        </li>
    )
};

export default Item;
