import React from 'react';

export const Navbar = () => {
    const links = ['Sök resor', 'Läs om eventet', 'Läs om våra orter', 'Se rekommendationer'];
    return(
        <nav>
            <ul className="nav-list">
                {links.map(link => <li className='nav-item' key={link}>{link}</li>)}
            </ul>
        </nav>
    )
}