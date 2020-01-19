import React from 'react'


const Item = ((props) => {
    const onClickItem = () => {
        let isChildAvailable = Object.values(props.item).find(arr => Array.isArray(arr));

        if(Array.isArray(isChildAvailable)){
            props.toggle(isChildAvailable);
        }else{
            props.onCloseChild(props.continent);
        }
    }


    const {item} = props;

    return (
        <div>
            {item.show ?
                <button type='button' type='button' onClick={onClickItem}>
                    {item.name ? item.name : item.code}
                </button> : null}


        </div>
    )

})

export default Item;
