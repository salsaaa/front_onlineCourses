import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { FaFlask, FaComments, FaMedapps } from 'react-icons/fa';
import { AiFillPlayCircle } from 'react-icons/ai'
import {Container} from 'react-bootstrap';

const About = () => {
    return (
        <React.Fragment>
            <Container>
            <div className="about">
                <div className="about__section">
                    <h2 className="about__title">Welcome to LevelUp</h2>
                    <h3 className="about__title about__title--white">Here you can get a good experience from courses uploaded by an expert instructors.</h3>
                    <br />
                    <div className="about__text">
                        <div>
                            <div className="about__paragraph">
                                <div><div className="about__feature"><FaFlask className="about__feature-icon" /></div></div>
                                <div>
                                    <h4 className="about__title about__title--secondary">Online Courses</h4>
                                    <p className="about__prg">We have online courses uploaded by instructors in many categories.</p>
                                </div>
                            </div>
                            <div className="about__paragraph">
                                <div><div className="about__feature"><FiUsers className="about__feature-icon" /></div></div>
                                <div><h4 className="about__title about__title--secondary">Expert Instructors</h4>
                                    <p className="about__prg">We have an Expert Instructors from all over the world that can help any user by watching their courses in any category he needs.</p>
                                </div>
                            </div>
                            <div className="about__paragraph">
                                <div><div className="about__feature"><FaComments className="about__feature-icon" /></div></div>
                                <div><h4 className="about__title about__title--secondary">Community</h4>
                                    <p className="about__prg">There is a good community between instructors and users where the user can follow instructor courses and learn from it.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about__img">
                    <img className="about__img-community" src={require("../../images/about.png")} alt="about" />
                </div>
            </div> <br/><br/>

            <div className="InfoSection">
                <div className="InfoSection__header">
                    <h2 className="InfoSection__text">Why Level-Up?</h2>
                    <p className="InfoSection__text InfoSection__text--p">We have unique courses that can help you to levelup your knowledge.</p>

                </div>
                <div className="InfoSection__infoContainer">
                    <div className="col-md-4">
                        <div className="InfoSection__sub">
                        <div><div className="about__feature"><FaFlask className="about__feature-icon" /></div></div>
                            <div className="InfoSection__sub--content">
                                <h4 className="InfoSection__text InfoSection__text--secondary">Online Courses</h4>
                                <p className="InfoSection__text--info">We have online courses uploaded by instructors in many categories.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="InfoSection__sub">
                            <div><div className="about__feature"><FaMedapps className="about__feature-icon"></FaMedapps></div></div>
                            <div className="InfoSection__sub--content">
                                <h4 className="InfoSection__text InfoSection__text--secondary">Expert Instructors</h4>
                                <p className="InfoSection__text--info">We have an Expert Instructors from all over the world that can help any user by watching courses.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="InfoSection__sub">
                        <div><div className="about__feature"><FaComments className="about__feature-icon" /></div></div>

                            <div className="InfoSection__sub--content">
                                <h4 className="InfoSection__text InfoSection__text--secondary">Comunity</h4>
                                <p className="InfoSection__text--info">There is a good community between instructors and users.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="InfoSection__hr"></hr>

                <div className="InfoSection__sub--content">

                    <div className="row InfoSection__infoContainer">
                        <div className="col-md-6">
                            <h3 className="InfoSection__text">Education is a key of successful youth</h3>
                            <p className="InfoSection__text--info" >Our target is to provide user with courses he needs and watch it online by enrolling in it.</p><br/>
                            <p className="InfoSection__text--color">You can contact us if there is a problem in courses or in payment of any course just full the form input with your info and the problem
                            and we will contact you as soon as possible.</p>
                            <span className="FixedSection__btn InfoSection__infoContainer--space">Contact Us</span>
                        </div>
                        <div className="col-md-5 col-md-offset-1 InfoSection__trans">
                            <span className="InfoSection__vedio">
                                <div className="InfoSection__vedio--img" ></div>
                                <AiFillPlayCircle className="InfoSection__vedio--icon" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
 </Container>
        </React.Fragment>
    );
}

export default About;