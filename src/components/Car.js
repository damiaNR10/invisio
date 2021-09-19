import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import UpdateModal from './UpdateModal';

class Car extends React.Component {

    render() {

        const {mark, model, year, onDelete, onUpdate, onModalHide, modalUpdateVisibility, onShowUpdateModal, id} = this.props;

        return (
            <article className="car border-bottom border-secondary">
                <h4 className="car__mark">{mark}</h4>
                <span className="car__model">{model}</span>
                <span className="car__year">{year}</span>
                <DropdownButton id="dropdown-item-button" title="Action">
                    <Dropdown.Item onClick = {onShowUpdateModal} as="button">Update</Dropdown.Item>
                    <Dropdown.Item onClick = {onDelete} as="button">Delete</Dropdown.Item>
                </DropdownButton>
                {modalUpdateVisibility ? <UpdateModal updateId = {id} onUpdate = {onUpdate} onShowUpdateModal = {onShowUpdateModal} onHideUpdateModal = {onModalHide} mark = {mark} model = {model} year = {year} /> : null}
            </article>
        );
    }
}

export default Car;