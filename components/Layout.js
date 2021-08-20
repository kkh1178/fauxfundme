import React from 'react';
import {Container} from "semantic-ui-react";
import Header from './Header';
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
    return (
        // Putting the header inside of a container to keep the content from taking up the entire width of the page.
        <Container>
            <Header></Header>
            {props.children}
        </Container>
    );
};

export default Layout;