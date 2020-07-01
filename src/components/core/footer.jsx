import React from 'react';
import { FaFacebook } from 'react-icons/fa'
import { GrTwitter } from 'react-icons/gr';
import { FiInstagram } from 'react-icons/fi';
import {AiOutlineCopyrightCircle} from 'react-icons/ai';
const Footer = props => {
    return (
        <React.Fragment>
            <div className="footerContainer">
            <div className="footer">
                <div className="sections">
                    <div>
                        <h2 className="sections__head" >About</h2>
                    </div>
                    <br/>
                    <div className="sections__paragraph">
                        <p className="about__prg"><span className="sections__highlight"> Masterstudy</span> is Educational WordPress theme featured by Learning
                         Management System (LMS) for online education.</p>
                        <p className="about__prg">Developed by <span className="sections__highlight">StylemixThemes.</span></p>
                    </div>

                    <FaFacebook className="icons" />
                    <GrTwitter className="icons" />
                    <FiInstagram className="icons" />
                </div>
                <div className="sections">
                    <div>
                        <h2 className="sections__head">Contact</h2>
                    </div>
                    <br/>
                    <div className="sections__paragraph">
                        <p className="about__prg">USA, Callifornia 20. First Avenue,<br /> Callifornia</p>
                        <p className="about__prg">Tel.: +1 212 458 300 32 <br />Fax: +1 212 375 24 14</p>
                        <p className="about__prg">info@Masterstudy.com</p>
                    </div>
                </div>
                <div className="sections">
                    <div>
                        <h2 className="sections__head">Pages</h2>
                    </div>
                    <br/>
                    <div className="sections__paragraph-lists">
                            <ul className="list">
                                <li className="list-pages">Blog</li>
                                <li className="list-pages">Home</li>
                                <li className="list-pages">Shortcodes</li>
                            </ul>
                        
                        <div>
                            <ul className="list">
                                <li className="list-pages">Courses</li>
                                <li className="list-pages">Membership </li>
                                <li className="list-pages">Typography</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="sections">
                    <div>
                        <h2 className="sections__head">Blog</h2>
                    </div>
                    <br/>
                    <div className="sections__paragraph-imgs">
                    <div><img  src={require("../../images/footer/photo-1517520287167-4bbf64a00d66-75x75.jpeg")} alt="pic"/></div>
                    <div className="sections__paragraph-target"><p className="about__prg">Our main target is to "Developing Yourself as a leader"
                    </p></div>
                    </div>
                    <div className="sections__paragraph-imgs">
                    <div><img  src={require("../../images/footer/photo-1490376840453-5f616fbebe5b-75x75.jpeg")} alt="pic"/></div>
                    <div className="sections__paragraph-target"><p className="about__prg">Those Other College Expenses You Aren't Thinking About
                    </p></div>
                    </div>
                    </div>
                    </div>
                    <br/><br/>
                 <p className="about__prg">Copyright <AiOutlineCopyrightCircle/> 2020 MasterStudy Theme by Stylemix Themes</p>
                    </div>
            
        </React.Fragment>
    );
}

export default Footer;