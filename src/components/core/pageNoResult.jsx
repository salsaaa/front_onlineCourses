import React from 'react';

const PageNoResult = () => {
    return ( 
        <React.Fragment>
            <div className="follows__notfound">
                <h2 className="follows__notfound-heading">You don't have Courses yet</h2>
                <img className="follows__notfound-img" src={require('../../images/notFound/noResult.png')} alt="not result"/>
            </div>
        </React.Fragment>
    );
}
 
export default PageNoResult;