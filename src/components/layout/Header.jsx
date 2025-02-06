import React from 'react';

const Header = () => {
    return (
        <section className='header'>
            <h1>Khanamandu</h1>
            <nav>
                <Link to="#Home">Home</Link>
                <Link to="#About us">About us</Link>
                <Link to="#Contact">Contact us</Link>
                <Link to="#Menu">Menu</Link>
                <Link to="#Profile">Profile</Link>
            </nav>
        </section>
    );
};

export default Header;
