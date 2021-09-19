import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

class UpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updatedMark: null,
            updatedModel: null,
            updatedYear: null,
        }
    }

    componentDidMount() {
        this.setState({
            updatedMark: this.props.mark,
            updatedModel: this.props.model,
            updatedYear: this.props.year,
        });
    }

    markHandle = (event) => {
        this.setState({
            updatedMark: event.target.value,
        });
        console.log(this.state);
    }

    modelHandle = (event) => {
        this.setState({
            updatedModel: event.target.value,
        });
        console.log(this.state);
    }

    yearHandle = (event) => {
        this.setState({
            updatedYear: event.target.value,
        });
        console.log(this.state);
    }

    hideUpdateModal = () => {
        this.props.onHideUpdateModal();
    }

    handleSubmit = () => {
        // this.props.onCreate({
        //     id: uuidv4(),
        //     mark: this.state.mark,
        //     model: this.state.model,
        //     year: this.state.year,
        // });
        const updatedCar = {
            mark: this.state.updatedMark,
            model: this.state.updatedModel,
            year: this.state.updatedYear,
        }

        //console.log(this.props.updateId);

        this.props.onUpdate(this.props.updateId, updatedCar);
        this.hideUpdateModal();
    }

    render() {

        const { mark, model, year, invalidModel, invalidMark, invalidYear } = this.props;

        return (
            <Modal size = "lg" fullscreen = "true" show = "true">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit car</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Mark</Form.Label>
                                <Form.Control defaultValue = {mark} onChange = {(event) => this.markHandle(event)} isInvalid = {invalidMark} required type="text" placeholder="Mark" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Model</Form.Label>
                                <Form.Control defaultValue = {model} onChange = {(event) => this.modelHandle(event)} isInvalid = {invalidModel} required type="text" placeholder="Model" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Year</Form.Label>
                                <Form.Control defaultValue = {year} onChange = {(event) => this.yearHandle(event)} isInvalid = {invalidYear} required type="number" min="1950" max="2021" placeholder="----" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.hideUpdateModal} variant="secondary">Close</Button>
                        <Button onClick = {this.handleSubmit} variant="primary">Edit car</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        );
    }
}

  export default UpdateModal;