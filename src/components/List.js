import React from 'react';
import Car from './Car';
import Header from './Header';
import { Alert } from 'react-bootstrap';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    onCreate = (car) => {
        console.log('Create element');
    }

    onDelete = (car) => {
        const cars = [...this.state.cars];
        cars.map((element, index) => {
            if(car.id === element.id) {
                cars.splice(index, 1);
            }
        });
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
                            You have to add new elements to Cars list asap!
                        </p>
                    </Alert>
                }
                <button onClick = {this.onCreate} type="button" className="btn btn-primary btn-lg">Add car to list</button>
            </>
        );
    }
}

export default List;
