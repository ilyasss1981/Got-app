import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage'
import {CharacterPage, HousePage, BookPage} from '../pages'


import GotService from '../../services/gotService'

import './app.css'


export default class App extends Component {
    gotService = new GotService()

    state = {
        showRandomChar: true,
        error: false        
    }

    componentDidCatch() {        
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })        
    }
    
    render() {

        const char = this.state.showRandomChar ? <RandomChar/> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }        

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className='toggle-btn'
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>   
                    <HousePage/>
                    <BookPage/>
                </Container>
            </>
        );
    }
    
};
