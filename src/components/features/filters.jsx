import React, { useState, useEffect } from 'react';
import { FormCheck } from 'react-bootstrap';

import * as featureService from '../../services/categoryService';

const Filters = (props) => {

    const [categories, setCategories] = useState([])
    let [filtredCats, setFiltredCategories] = useState([])


    useEffect(() => {
        featureService.getAllCategories().then(({ data }) => {
            setCategories(data)
        })

    }, [])

    const handleCheck = (id, e) => {
        if (e.target.checked === true) {
           
                filtredCats.push(id)
                props.onFilter(filtredCats)
            
        }
        else if (e.target.checked === false) {
            const categoryIndex = filtredCats.findIndex(i => i === id)
            if (categoryIndex != -1) {
                filtredCats.splice(categoryIndex, 1)
                props.onFilter(filtredCats)
            }
        }

    }

    return (
        <React.Fragment>

            <div className="filter">
                <div className="filter__container">
                    <p className="filter__text" >Filter By : </p>

                    <div className="filter__items-container">
                   
                        <p className="filter__pg">All Categories</p>
                        {categories.map((category, i) => (
                            <div onClick={(event) => handleCheck(category._id, event)} className="filter__checkbox-container" key={i}>

                                <FormCheck type="checkbox" />
                                <span >{category.title}</span>
                            </div>
                        ))}


                    </div>

                </div>
            </div>

        </React.Fragment>
    );
}

export default Filters;