import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { isTemplateMiddle } from 'typescript';

import { Avatar, Card, Carousel, Col, Row } from 'antd';
import { apiRoot } from '../login_page/createClient';
import classes from './productPage.module.css';
import ModalWindow from '../modal_window/ModalWindow';

const AboutUsPage = () => {
    return <h2 className="page_title main">About us page</h2>;
};

export default AboutUsPage;

/* const AboutUsPage1 = () => {
    return <h2 className="page_title main">About us page</h2>;
}; */
