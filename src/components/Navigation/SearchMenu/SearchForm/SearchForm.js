import React from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const SearchForm = () => {
    return (
        <Form>
            
            <h3>Search</h3>
            <Form.Group controlId="searchFormTitle">
                {/* <Form.Label>Title</Form.Label> */}
                <Form.Control type="text" placeholder="Title" />
            </Form.Group>

            <Form.Group controlId="searchFormPublishDate">
                <Form.Control type="text" onBlur={(e) => {e.currentTarget.type="text"; e.currentTarget.placeholder = "Publish Date"}} onFocus={(e) => e.currentTarget.type = "date"} placeholder="Publish Date" />
            </Form.Group>

            <Form.Group controlId="searchFormReaders">
                <Form.Control type="text" placeholder="Readers" />
            </Form.Group>

            <Form.Group controlId="searchFormKeywords">
                <Form.Control type="text" placeholder="Keywords" />
            </Form.Group>

            <Form.Group controlId="searchFormLibraryName">
                <Form.Control type="text" placeholder="Library Name" />
            </Form.Group>

            <Form.Group controlId="searchFormDataset">
                <Form.Control type="text" placeholder="Dataset" />
            </Form.Group>

           

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default SearchForm
