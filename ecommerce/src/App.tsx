import React from 'react';
import { Col, Row, Button } from 'antd';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  
  
} from 'react-router-dom';
import AboutUsPage from './components/about_us_page/AboutUsPage';
import MainPage from './components/main_page/MainPage';
import CatalogPage from './components/catalog_page/CatalogPage';
import BasketPage from './components/basket_page/BasketPage';
import Page404 from './components/page_404/Page404';
import RegistrationPage from './components/registration_page/RegistrationPage';
import LogInPage from './components/login_page/login_page';
import MyProfilePage from './components/my_profile_page/MyProfilePage';


const App: React.FC = () => (
  <div>
    <BrowserRouter>
    <Row className='header__container' justify="space-evenly" wrap={false}>
      <Col onClick={()=> console.log('main page')}>
      <Link to="/" className="header__item" >Main page</Link>
      </Col>


      <Col >
      <Link className="header__item"  to="/catalog">Catalog page</Link>

      </Col>
      <Col onClick={()=> console.log('about us page')}>
        <Link className="header__item"  to="/about">About Us</Link>
      </Col>


      <Col  onClick={()=> console.log('basket page')}>
        <Link className="header__item" to="/basket">Basket page</Link>
      </Col>






      <Col className="header__buttons-block">
        <Button type="primary">
        <Link to="/login">Log In</Link>
          </Button>
        <Button>
        <Link to="/registration">Registration</Link>

        </Button>
        <Button type="dashed">
        <Link to="/my-profile">My profile</Link>
        </Button>
      </Col>
    </Row>


    <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage  />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LogInPage  />} />
          <Route path="/my-profile" element={<MyProfilePage  />} />
          <Route path="*" element= {<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>



      

  </div>
);

export default App;
