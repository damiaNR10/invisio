import React from 'react';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import Car from './Car';
import Header from './Header';
import { Alert, Form } from 'react-bootstrap';

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
                },
                {
                    id: 2,
                    mark: 'Volkswagen',
                    model: 'Golf R',
                    year: '2021',
                    modalUpdateVisibility: false,
                },
                {
                    id: 3,
                    mark: 'Alfa Romeo',
                    model: 'Giulia',
                    year: '2019',
                    modalUpdateVisibility: false,
                },
                {
                    id: 4,
                    mark: 'Fiat',
                    model: '500',
                    year: '2020',
                    modalUpdateVisibility: false,
                },
                {
                    id: 5,
                    mark: 'Ford',
                    model: 'Mustang',
                    year: '1992',
                    modalUpdateVisibility: false,
                },
            ],
        };
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
        // this.setState({
        //     modalUpdateVisibility: false,
        // }); 
    }

    showUpdateModal = (carToUpdate) => {
        const cars = this.state.cars;
        cars.map((car, index) => car.id === carToUpdate.id ? car.modalUpdateVisibility = true : car.modalUpdateVisibility = false);
        this.setState({cars});
        // this.setState({
        //     modalUpdateVisibility: true,
        // });
    }

    onCreate = (car) => {
        car.model ? this.setState({modelError: false}) : this.setState({modelError: true});
        car.mark ? this.setState({markError: false}) : this.setState({markError: true});
        (car.year && car.year > 1950 && car.year < 2022) ? this.setState({yearError: false}) : this.setState({yearError: true});
        if((!car.model || !car.mark || !car.year) || (car.year < 1950 || car.year > 2021)) {
            this.setState({
                updateError: true,
            });
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
            this.setState({
                updateError: true,
            });
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

    render() {
        return (
            <>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Search by model</Form.Label>
                        <Form.Control placeholder="Model" />
                    </Form.Group>
                </Form>
                <Header sort = {this.sort} />
                {
                    this.state.cars.length > 0 ? 
                    this.state.cars.map((car, index) => {
                        return <Car 
                        id = {car.id}
                        modalUpdateVisibility = {car.modalUpdateVisibility} onModalHide = {() => this.hideUpdateModal(car)} 
                        onShowUpdateModal = {() => {this.showUpdateModal(car)}} onUpdate = {this.onUpdate} onDelete={() => this.onDelete(car)} key = {car.id} mark = {car.mark} model = {car.model} year = {car.year} />
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
                    this.state.modalCreateVisibility ? <CreateModal invalidMark = {this.state.markError} invalidYear = {this.state.yearError} isInvalid = {this.state.error} onCreate = {this.onCreate} hideCreateModal = {this.hideCreateModal} /> : null
                }
                {/* {
                    this.state.modalUpdateVisibility ? <UpdateModal invalidMark = {this.state.markError} invalidYear = {this.state.yearError} isInvalid = {this.state.error} onUpdate = {this.onUpdate} hideUpdateModal = {this.hideUpdateModal} /> : null
                } */}
            </>
        );
    }
}

export default List;
