import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarsAPI from '../services/CarsAPI';
import '../App.css';

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        document.title = title;
        const fetchCars = async () => {
            const data = await CarsAPI.getAllCars();
            setCars(data);
        };
        fetchCars();
    }, [title]);

    return (
        <main className="container">
            <h2>Custom Cars</h2>
            <div className="grid">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <article key={car.id} className="car-card">
                            <header style={{ 
                                backgroundColor: car.exterior === 'custom' ? '#ff00ff' : car.exterior,
                                color: 'white',
                                textShadow: '1px 1px 2px black',
                                padding: '1rem',
                                borderRadius: 'var(--border-radius) var(--border-radius) 0 0'
                            }}>
                                <h3>{car.name}</h3>
                            </header>
                            <div className="car-details" style={{ padding: '1rem' }}>
                                <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
                                <p><strong>Convertible:</strong> {car.is_convertible ? 'Yes' : 'No'}</p>
                                <p><strong>Roof:</strong> {car.roof}</p>
                                <p><strong>Wheels:</strong> {car.wheels}</p>
                                <p><strong>Interior:</strong> {car.interior}</p>
                            </div>
                            <footer style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                                <Link to={`/customcars/${car.id}`} role="button" className="outline">Details</Link>
                                <Link to={`/edit/${car.id}`} role="button" className="secondary">Edit</Link>
                            </footer>
                        </article>
                    ))
                ) : (
                    <p>No custom cars created yet.</p>
                )}
            </div>
        </main>
    );
};

export default ViewCars;