import { useState, useEffect } from 'react';
import React from 'react';
import { Button, Container } from 'react-bootstrap'
import SearchedCard from '../cards/searched-card'
import { searchByCourses } from '../../services/featuresService'
const Search = (props) => {

    const [state, setState] = useState({
        courses: [],
        searchedData: [],
        activeData: [],

    })
    useEffect(() => {
        props.onSpinner(true)
        searchByCourses().then(({ data }) => {
            console.log("search", data)

            setState({ ...state, courses: data })
            props.onSpinner(false)

        })
            .catch((err) => console.log(err))

    }, [])


    const preventProp = (e) => {
        e.stopPropagation();
    }

    state.activeData = [...state.courses]
    state.searchedData = state.activeData.filter(i => (i['title'].toLowerCase().includes(props.searchWord.toLowerCase())))




    return (
        <React.Fragment>

            <div className="search" onClick={props.onClosingSearch}>
                <div className="search-panel" onClick={preventProp}>
                    <Container className="searchContainer">
                        <div className="search-list">
                            {(!props.spinner)&&state.searchedData.map(data => (
                                <SearchedCard
                                    key={data.id}
                                    data={data}
                                    searchBy={'title'}
                                />
                            ))}

                        </div>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;