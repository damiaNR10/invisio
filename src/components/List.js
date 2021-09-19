import React from 'react';
import CreateModal from './CreateModal';
import Car from './Car';
import Header from './Header';
import { Alert, Form, Button } from 'react-bootstrap';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markError: false,
            modelError: false,
            yearError: false,
            error: false,
            updateError: false,
            modalCreateVisibility: false,
            cars: [
                {
                    id: 1,
                    mark: 'McLaren',
                    model: 'Elva',
                    year: '2021',
                    modalUpdateVisibility: false,
                    visible: true,
                },
                {
                    id: 2,
                    mark: 'Volkswagen',
                    model: 'Golf R',
                    year: '2021',
                    modalUpdateVisibility: false,
                    visible: true,
                },
                {
                    id: 3,
                    mark: 'Alfa Romeo',
                    model: 'Giulia',
                    year: '2019',
                    modalUpdateVisibility: false,
                    visible: true,
                },
                {
                    id: 4,
                    mark: 'Fiat',
                    model: '500',
                    year: '2020',
                    modalUpdateVisibility: false,
                    visible: true,
                },
                {
                    id: 5,
                    mark: 'Ford',
                    model: 'Mustang',
                    year: '1992',
                    modalUpdateVisibility: false,
                    visible: true,
                },
            ],
        };
        this.searchRef = React.createRef();
    }

    hideCreateModal = () => {
        this.setState({
            modalCreateVisibility: false,
        }); 
    }

    showCreateModal = () => {
        this.setState({
            modalCreateVisibility: true,
        });
    }

    hideUpdateModal = () => {
        const cars = this.state.cars;
        cars.map((car, index) => car.modalUpdateVisibility = false);
        this.setState({cars});
    }

    showUpdateModal = (carToUpdate) => {
        const cars = this.state.cars;
        cars.map((car, index) => car.id === carToUpdate.id ? car.modalUpdateVisibility = true : car.modalUpdateVisibility = false);
        this.setState({cars});
    }

    onCreate = (car) => {
        car.model ? this.setState({modelError: false}) : this.setState({modelError: true});
        car.mark ? this.setState({markError: false}) : this.setState({markError: true});
        (car.year && car.year > 1950 && car.year < 2022) ? this.setState({yearError: false}) : this.setState({yearError: true});
        if((!car.model || !car.mark || !car.year) || (car.year < 1950 || car.year > 2021)) {

        }
        else {
            const cars = [...this.state.cars];
            cars.push(car);
            this.setState({cars});
            this.setState({
                error: false,
                modelError: false,
                markError: false,
                yearError: false,
                modalUpdateVisibility: false,
                visible: true,
            });
        }
    }

    onDelete = (car) => {
        const cars = [...this.state.cars];
        cars.map((element, index) => car.id === element.id ? cars.splice(index, 1) : null);
        this.setState({cars});
    }

    onUpdate = (idToUpdate, updatedCar) => {
        console.log(idToUpdate);
        console.log(updatedCar);
        const cars = this.state.cars;
        if((!updatedCar.model || !updatedCar.mark || !updatedCar.year) || (updatedCar.year < 1950 || updatedCar.year > 2021)) {

        }
        cars.map((car, index) => {
            if(car.id === idToUpdate) {
                car.mark = updatedCar.mark;
                car.model = updatedCar.model;
                car.year = updatedCar.year;
            }
        });
        this.setState({cars});
    }

    sort = (sortByField, order) => {
        const cars = [...this.state.cars];
        const temporaryCars = [...this.state.cars];
        let sortJsonArray = require('sort-json-array');
        sortJsonArray(cars, sortByField, order);
        this.setState({cars});
    }

    filter = () => {
        const valueToSearch = this.searchRef.current.value;
        const cars = [...this.state.cars];
        const temporaryCars = [...this.state.cars];
        cars.map((car, index) => car.mark.includes(valueToSearch) ? car.visible = true : car.visible = false);
        this.setState({cars});
    }

    render() {
        return (
            <>
                <Form className="search">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Search by model</Form.Label>
                        <Form.Control ref = {this.searchRef} placeholder="Model" />
                        <Button onClick={this.filter}className="search__btn" variant="primary">Search</Button>
                    </Form.Group>
                </Form>
                <Header sort = {this.sort} />
                {
                    this.state.cars.length > 0 ? 
                    this.state.cars.map((car, index) => { 
                        if(car.visible) {
                            return <Car 
                            id = {car.id}
                            modalUpdateVisibility = {car.modalUpdateVisibility} onModalHide = {() => this.hideUpdateModal(car)} 
                            onShowUpdateModal = {() => {this.showUpdateModal(car)}} onUpdate = {this.onUpdate} onDelete={() => this.onDelete(car)} key = {car.id} mark = {car.mark} model = {car.model} year = {car.year} />
                        } else {
                            return null;
                        }
                    })
                    :
                    <Alert variant="danger">
                        <Alert.Heading>Oh no! Cars list is empty!</Alert.Heading>
                        <p>
                            You have to add new elements to Cars list!
                        </p>
                    </Alert>
                }
                <button onClick = {this.showCreateModal} type="button" className="btn btn-primary btn-lg">Add car to list</button>
                {
                    this.state.modalCreateVisibility ? <CreateModal invalidModel = {this.state.modelError} invalidMark = {this.state.markError} invalidYear = {this.state.yearError} isInvalid = {this.state.error} onCreate = {this.onCreate} hideCreateModal = {this.hideCreateModal} /> : null
                }
            </>
        );
    }
}

export default List;
