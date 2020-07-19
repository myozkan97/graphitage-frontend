import React, {useEffect} from "react"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useForm } from 'react-hook-form'

import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';

const SearchForm = (props) => {
    const { register, handleSubmit, errors, watch, formState } = useForm({
        mode: "onChange"
      });

    const onSubmit = data => {
        console.log(data);
        props.onSearchAnd(data);
    }
    // console.log(errors);

    // useEffect(() => {
    //     console.log(props.search);
    // }, [props.search]);

    const validate = () => {
        const test1 = watch("Title");
        const test2 = watch("PublishDate");
        const test3 = watch("Readers");
        const test4 = watch("Keywords");
        const test5 = watch("LibraryName");
        const test6 = watch("Dataset");

        let button = document.getElementById('searchButton');
        if (test1 || test2 || test3 || test4 || test5 || test6){
            button.disabled = false;
        }
        else {
            button.disabled = true;
        }
        // return test1 || test2 || test3 || test4 || test5 || test6 ? true : "Please choose an element.";
      };
    
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h3>Search</h3>
            <Form.Group controlId="searchFormTitle">
                {/* <Form.Label>Title</Form.Label> */}
                <Form.Control type="text" placeholder="Title" name="Title" ref={register({ validate })} />
            </Form.Group>

            <Form.Group controlId="searchFormPublishDate">
                <Form.Control type="text" name="PublishDate" onBlur={(e) => {e.currentTarget.type="text"; e.currentTarget.placeholder = "Publish Date"}} onFocus={(e) => e.currentTarget.type = "date"} placeholder="Publish Date" ref={register({ validate })} />
            </Form.Group>

            <Form.Group controlId="searchFormReaders">
                <Form.Control type="text" placeholder="Readers" name="Readers" ref={register({ validate })} />
            </Form.Group>

            <Form.Group controlId="searchFormKeywords">
                <Form.Control type="text" placeholder="Keywords" name="Keywords" ref={register({ validate })} />
            </Form.Group>

            <Form.Group controlId="searchFormLibraryName">
                <Form.Control type="text" placeholder="Library Name" name="LibraryName" ref={register({ validate })} />
            </Form.Group>

            <Form.Group controlId="searchFormDataset">
                <Form.Control type="text" placeholder="Dataset" name="Dataset" ref={register({ validate })} />
            </Form.Group>

            <Button variant="primary" type="submit" id="searchButton" name="Search" disabled="true" disabled={!formState.isValid}>
                Search
            </Button>
        </Form>

    )
}


const mapStateToProps = state => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchAnd: (info) => dispatch(actionCreators.fetchSearchResultsAnd(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm); 
