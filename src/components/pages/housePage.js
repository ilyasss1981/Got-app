import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock'

export default class HousePage extends Component {
    gotService = new GotService()

    state = {
        selectedItem: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch() {        
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}/>

        )

        const houseDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getData={this.gotService.getHouse}>
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    <Field field='overlord' label='Overlord'/>
                    <Field field='ancestralWeapons' label='AncestralWeapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}
