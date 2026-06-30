import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CarsAPI from '../services/CarsAPI';
import '../App.css';

const CarDetails = ({ title }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        document.title = title;
        const fetchCar = async () => {
            const data = await CarsAPI.getCarById(id);
            setCar(data);
        };
        fetchCar();
    }, [title, id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await CarsAPI.deleteCar(id);
                navigate('/customcars');
            } catch (err) {
                console.error("Failed to delete car", err);
            }
        }
    };

    if (!car) return <div className="container"><p>Loading...</p></div>;

    return (
        <main className="container">
            <article>
                <header style={{ 
                    backgroundColor: car.exterior === 'custom' ? '#ff00ff' : car.exterior,
                    color: 'white',
                    textShadow: '1px 1px 2px black',
                    padding: '2rem',
                    borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
                    textAlign: 'center'
                }}>
                    <h2>{car.name}</h2>
                </header>
                
                <div style={{ padding: '2rem' }}>
                    <div className="grid">
                        <div>
                            <h3>Features</h3>
                            <ul>
                                <li><strong>Convertible:</strong> {car.is_convertible ? 'Yes' : 'No'}</li>
                                <li><strong>Exterior:</strong> {car.exterior}</li>
                                <li><strong>Roof:</strong> {car.roof}</li>
                                <li><strong>Wheels:</strong> {car.wheels}</li>
                                <li><strong>Interior:</strong> {car.interior}</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Pricing</h3>
                            <h2 style={{ color: 'var(--primary)' }}>${car.price.toLocaleString()}</h2>
                        </div>
                    </div>
                </div>

                <footer style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                    <Link to={`/edit/${car.id}`} role="button" className="secondary">Edit Car</Link>
                    <button onClick={handleDelete} className="contrast" style={{ backgroundColor: 'red', border: 'none' }}>Delete Car</button>
                </footer>
            </article>
        </main>
    );
};

export default CarDetails;