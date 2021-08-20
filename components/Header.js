import React from 'react';
import {Menu} from 'semantic-ui-react';
// import {Link} from '../routes';

const Header = (props) => {
    return(
        // Keeping the menu from sticking to the top
        <Menu style={{marginTop: '10px'}}>
            <Menu.Item>
                FauxFundMe
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    Fundraisers
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;