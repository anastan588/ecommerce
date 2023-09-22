import React from 'react';
import BackGround from '../../images/backgrounds/background3.jpg';

const Page404 = () => {
    return (
        <div>
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />
            <h2
                className="page_title main"
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                404 Page not found
            </h2>
            ;
        </div>
    );
};

export default Page404;
