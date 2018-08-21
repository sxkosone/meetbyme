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
            <Form>
                <Form.Group className="search-form">
                <Form.Field inline >
                <label>Events within {this.state.radius} miles</label>
                <Input type="range" min="1" max="25" value={this.state.radius} onChange={(e) => this.setState({radius: e.target.value})}/>
                
                </Form.Field>
                <Form.Field inline className="search-inputs">
                    <Input placeholder='Search by keywords' onChange={(e) => this.setState({searchTerm: e.target.value})} value={this.state.searchTerm}/>
                    <Dropdown placeholder='Select Category' search selection options={this.generateOptionFields()}/>
                </Form.Field>
                
                <Button primary onClick={() => this.handleUserEventSearch(this.state.searchTerm)}>Search</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default Search;