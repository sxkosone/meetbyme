import React from 'react';
import { Form, Input } from 'semantic-ui-react'

class Search extends React.Component {
    render() {
        return (
            <Form>
                <Form.Field inline>
                <label>Search events</label>
                <Input placeholder='search' />
                </Form.Field>
            </Form>
        )
    }
}

export default Search;