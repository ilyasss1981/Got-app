import React, {useEffect, useState} from 'react';
import Spinner from '../spinner';
import PropTypes from 'prop-types'
import './itemList.css';


function ItemList({getData, renderItem, onItemSelected}) {  

    const [itemList, setItemList] = useState([])    

    useEffect(() => {
        getData()
            .then( (itemList) => {
                setItemList(itemList)
                })           
    }, [])        

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item 
            const label = renderItem(item)                  
            return (
                <li
                    key={id} 
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }   

    if (!itemList) {
        return <Spinner/>
    }      

    const items = renderItems(itemList)

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
    
}

//установка по умолчанию и проверка значений
ItemList.defaultProps = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

export default ItemList