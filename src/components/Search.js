import React from 'react';
import { Form, Input, Dropdown, Button } from 'semantic-ui-react'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            categoryId: 0,
            radius: 5
        }
    }
    generateOptionFields() {
        return this.props.categories.map(category => {
            return {key: category.id, value: category.id, text: category.name, id: category.id}
        })
    }

    updateCategory = () => {
        this.setState({
            categoryId: document.querySelector(".selected.item").id
        })
    }

    handleUserEventSearch = () => {
        let categoryId = document.querySelector(".selected.item").id
        this.props.handleUserEventSearch(this.state.searchTerm, categoryId, this.state.radius)
    }


    render() {
        return (
            <Form >
                <Form.Field inline>
                    <label>Keyword</label>
                    <Input placeholder='search' onChange={(e) => this.setState({searchTerm: e.target.value})} value={this.state.searchTerm}/>
                    
                    <label>Category</label>
                    <Dropdown placeholder='Select Category' search selection options={this.generateOptionFields()}/>
                </Form.Field>
                <Form.Field inline>
                <label>Searching events within {this.state.radius} miles</label>
                <Input type="range" min="1" max="25" value={this.state.radius} onChange={(e) => this.setState({radius: e.target.value})}/>
                <Button primary onClick={() => this.handleUserEventSearch(this.state.searchTerm)}>Search</Button>
                </Form.Field>
            </Form>
        )
    }
}

export default Search;