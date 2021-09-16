import React from 'react';
import { DropdownButton, Dropdown, ListGroup } from 'react-bootstrap';

class Car extends React.Component {

    render() {

        const {mark, model, year, onDelete} = this.props;

        return (
            <article className="car border-bottom border-secondary">
                <h4 className="car__mark">{mark}</h4>
                <span className="car__model">{model}</span>
                <span className="car__year">{year}</span>
                <DropdownButton id="dropdown-item-button" title="Action">
                    <Dropdown.Item onClick as="button">Update</Dropdown.Item>
                    <Dropdown.Item onClick = {onDelete} as="button">Delete</Dropdown.Item>
                </DropdownButton>
            </article>
        );
    }
}

export default Car;