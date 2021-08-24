import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

const Header = (props) => {
    return(
        // Keeping the menu from sticking to the top
        <Menu style={{marginTop: '10px'}}>
            <Link route="/">
                <a className='item'>
                    FauxFundMe
                </a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className='item'>Fundraisers</a>
                </Link>
                <Link route="/fundraisers/new">
                    <a className='item'>+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;