import React, {useState, useEffect} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types'

function RandomChar({interval}) {

    const gotService = new GotService()
    
    const [char, setChar] = useState({})
    const [loading, setLoaing] = useState(true)
    const [error, setError] = useState(false)    

    useEffect(() => {
        updateChar()
        let timerId = setInterval(() => updateChar, interval)
        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
        setLoaing(false)
    }

    const onError = () => {
        setError(true)
        setLoaing(false)        
    }
    
    const updateChar = () => {        
        const id = Math.floor(Math.random()*140 + 25) //25-140                
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }         

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={char}/> : null
    
    
    return (
        <div className="random-block rounded">  
            {errorMessage}   
            {spinner}           
            {content}
        </div>
    )
    
}

export default RandomChar

RandomChar.defaultProps = {
    interval: 1500
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

//Проверка на правильность типа данных по старому
// RandomChar.propTypes = {
//     interval: (props, propName, componentName) => {
//         const value = props[propName]
//         if (typeof value === 'number' && !isNaN(value)) {
//             return null
//         } else {
//             return new TypeError(`${componentName}: ${propName} must be a number`)
//         }
//     }
// }


const View = ({char}) => {

    const {name, gender, born, died, culture} = char

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
