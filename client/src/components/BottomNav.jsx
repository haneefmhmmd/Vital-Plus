import React, { useState, useEffect } from 'react';

const BottomNav = () => {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (

        <footer>
            <nav className="navbar nav-bottom">
                <div className="container">
                    <p className="display-6 text-center mx-auto my-0" style={{ fontSize : "20px", fontWeight: "400"}}>
                        Vital+ | Group 8 | Emerging Technologies ({currentYear})
                    </p>
                </div>
            </nav>
        </footer>

    );

};

export default BottomNav;