import React from 'react';
import { Button } from 'react-bootstrap';

class Header extends React.Component {

    render() {

        return (
            <header className="header">
                <Button variant="secondary">Mark</Button>
                <Button variant="secondary">Model</Button>
                <Button variant="secondary">Year</Button>

            </header>
        );
    }
}

export default Header;