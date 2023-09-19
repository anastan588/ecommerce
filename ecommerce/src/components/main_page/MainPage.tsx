import React, { useEffect, useState } from 'react';
import MainPageBackGround from '../../images/backgrounds/mainBackGround2.jpg';
import Rose1 from '../../images/icon/rose1.png';
import Rose2 from '../../images/icon/rose2.png';
import Rose3 from '../../images/icon/rose3.png';
import Rose4 from '../../images/icon/rose4.png';
import Rose5 from '../../images/icon/rose5.png';
import Rose6 from '../../images/icon/rose6.png';
import Rose7 from '../../images/icon/rose7.png';
import Rose8 from '../../images/icon/rose8.png';
import Rose9 from '../../images/icon/rose9.png';
import Rose10 from '../../images/icon/rose10.png';
import { getDiscountCode } from '../catalog_page/requests';

const MainPage = () => {
    const [promoCode, setPromoCode] = useState('');
    useEffect(() => {
        getDiscountCode()
            .then((body) => {
                console.log(body.body.results[0].code);
                const { code } = body.body.results[0];
                const {id} = body.body.results[0];
                setPromoCode(code);
                console.log(code);
                localStorage.setItem('promoCode', id );
            })
            .catch((e) => console.log(e));
    }, []);
    console.log(promoCode);
    return (
        <div>
            <img
                src={MainPageBackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />
            <p
                className="page_title"
                style={{ justifyContent: 'start', alignItems: 'start', fontSize: 32, position: 'relative', zIndex: 3 }}
            >
                Promo Code
            </p>
            <div className="page_title"
                style={{ justifyContent: 'start', alignItems: 'start', fontSize: 32, position: 'relative', zIndex: 3 }}
            >
                {promoCode}
            </div>
            <div className="area">
                <ul className="flowers">
                    <li>
                        <img src={Rose1} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose2} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose3} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose4} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose5} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose6} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose7} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose8} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose9} alt="rose" />
                    </li>
                    <li>
                        <img src={Rose10} alt="rose" />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
