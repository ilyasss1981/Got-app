import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

function ItemDetails({itemId, getData, children}) {

    //const gotService = new GotService()

    const [item, setItem] = useState([])
    const [loading, setLoaing] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        updateItem()
    }, [itemId])
    

    const onItemDetailsLoaded = (item) => {
        setItem(item)
        setLoaing(false)        
    }

    function updateItem() {        

        if (!itemId) {
            return
        }

        setLoaing(true)        

        getData(itemId)
            .then(onItemDetailsLoaded)  
            .catch(() => onError())        
    }

    function onError() {
        setItem([])
        setError(true)        
    }    
        
        if (!itemId) {
            return <span className='select-error'>Please select a character</span>            
        }
        
        const {name} = item

        if (loading) {
            return <Spinner/>
        }
        
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    
}

export default ItemDetails