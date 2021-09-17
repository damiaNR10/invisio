import React from 'react';
import CreateModal from './CreateModal';
import Car from './Car';
import Header from './Header';
import { Alert } from 'react-bootstrap';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markError: false,
            modelError: false,
            yearError: false,
            error: false,
            modalCreateVisibility: false,
            cars: [
                {
                    id: 1,
                    mark: 'McLaren',
                    model: 'Elva',
                    year: '2021'
                },
                {
                    id: 2,
                    mark: 'Volkswagen',
                    model: 'Golf R',
                    year: '2021'
                },
                {
                    id: 3,
                    mark: 'Alfa Romeo',
                    model: 'Giulia',
                    year: '2019'
                },
                {
                    id: 4,
                    mark: 'Fiat',
                    model: '500',
                    year: '2020'
                },
            ],
        };
    }

    // handleClose = () => setShow(false);
    // handleShow = () => setShow(true);

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

    onCreate = (car) => {
        car.model ? this.setState({modelError: false}) : this.setState({modelError: true});
        car.mark ? this.setState({markError: false}) : this.setState({markError: true});
        (car.year && car.year > 1950 && car.year < 2022) ? this.setState({yearError: false}) : this.setState({yearError: true});
        if((!car.model || !car.mark || !car.year) || (car.year < 1950 || car.year > 2021)) {
            this.setState({
                error: true,
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
            });
        }
    }

    onDelete = (car) => {
        const cars = [...this.state.cars];
        cars.map((element, index) => car.id === element.id ? cars.splice(index, 1) : null
            // if(car.id === element.id) {
            //     cars.splice(index, 1);
            // }
        );
        this.setState({cars});
    }

    render() {
        return (
            <>
                <Header />
                {
                    this.state.cars.length > 0 ? 
                    this.state.cars.map((car, index) => {
                        return <Car onDelete={() => this.onDelete(car)} key = {car.id} mark = {car.mark} model = {car.model} year = {car.year} />
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
