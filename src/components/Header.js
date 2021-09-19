import React from 'react';
import { Button } from 'react-bootstrap';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // markOrder: 'asc',
            // modelOrder: 'asc',
            // yearOrder: 'asc',
            order: 'asc',
        };
    }

    sort = (sortByField, order) => {
        this.props.sort(sortByField, order);
        this.state.order === 'asc' ? this.setState({order: 'des'}) : this.setState({order: 'asc'});
    }

    render() {

        return (
            <header className="header">
                <Button onClick = {() => this.sort('mark', this.state.order)} variant="secondary">Mark</Button>
                <Button onClick = {() => this.sort('model', this.state.order)} variant="secondary">Model</Button>
                <Button onClick = {() => this.sort('year', this.state.order)} variant="secondary">Year</Button>
            </header>
        );
    }
}

export default Header;