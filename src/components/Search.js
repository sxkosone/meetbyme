import React from 'react';
import { Form, Input, Dropdown, Button } from 'semantic-ui-react'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm: ""
        }
    }
    generateOptionFields() {
        return this.props.categories.map(category => {
            return {key: category.id, value: category.id, text: category.name, id: category.id}
        })
    }

    handleCategorySearch = () => {
        const categoryId = document.querySelector(".selected.item").id
        this.props.searchByCategory(categoryId)
    }
    render() {
        return (
            <Form >
                <Form.Field inline>
                <label>Search events</label>
                <Input placeholder='search' onChange={(e) => this.setState({searchTerm: e.target.value})} value={this.state.searchTerm}/>
                </Form.Field>
                <Form.Field inline>
                <label>Search events by category</label>
                <Dropdown placeholder='Select Country' search selection options={this.generateOptionFields()}/>
                <Button onClick={this.handleCategorySearch}>Search by category</Button>
                </Form.Field>
            </Form>
        )
    }
}

export default Search;