import React from 'react';
import { Form, Input, Dropdown, Button } from 'semantic-ui-react'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            categoryId: 0
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
        this.props.handleUserEventSearch(this.state.searchTerm, categoryId)
    }

    // clearSearch = () => {
    //     this.forceUpdate();
    //     this.setState({
    //         searchTerm: "",
    //         categoryId: 0
    //     })
    //     this.props.handleUserEventSearch(this.state.searchTerm, 0)
    // }

    render() {
        return (
            <Form >
                <Form.Field inline>
                <label>Keyword</label>
                <Input placeholder='search' onChange={(e) => this.setState({searchTerm: e.target.value})} value={this.state.searchTerm}/>
                {/* </Form.Field>
                <Form.Field inline> */}
                <label>Category</label>
                <Dropdown placeholder='Select Category' search selection options={this.generateOptionFields()}/>
                
                <Button content='Primary' primary onClick={() => this.handleUserEventSearch(this.state.searchTerm)}>Search</Button>
                </Form.Field>
            </Form>
        )
    }
}

export default Search;