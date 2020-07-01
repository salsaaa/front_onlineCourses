import React from 'react';
import {Button} from 'react-bootstrap';

const BackGround = () => {
    return (  
        <React.Fragment>
            <div className="bg">
                <div className="bg-layer">
                    <div className="col-md-18 bg-text">
                        <h1 className="text-white font-weight-bold">LevelUp Free Online Training Courses</h1>
                        <br />
                        <p className="h4 text-white">Welcome to LevelUp where you can learn and start any course you are interested in</p>
                        <br />
                        <Button className="btn btn--secondary btn--pd">Get Started!</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default BackGround;