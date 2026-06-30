import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarsAPI from '../services/CarsAPI';
import { calculateTotalPrice, validateFeatures } from '../utilities/calcPrice';
import '../App.css';

const EditCar = ({ title }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState({
        name: '',
        is_convertible: false,
        exterior: 'red',
        roof: 'solid',
        wheels: 'standard',
        interior: 'fabric'
    });

    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = title;
        const fetchCar = async () => {
            const data = await CarsAPI.getCarById(id);
            if (data) {
                setCar(data);
                setPrice(data.price);
            }
            setLoading(false);
        };
        fetchCar();
    }, [title, id]);

    useEffect(() => {
        if (!loading) {
            setPrice(calculateTotalPrice(car));
            const validation = validateFeatures(car);
            if (!validation.isValid) {
                setError(validation.message);
            } else {
                setError('');
            }
        }
    }, [car, loading]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCar(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateFeatures(car);
        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        try {
            await CarsAPI.updateCar(id, { ...car, price });
            navigate(`/customcars/${id}`);
        } catch (err) {
            setError('Failed to update car. Please try again.');
        }
    };

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

    if (loading) return <div className="container"><p>Loading...</p></div>;

    return (
        <main className="container">
            <h2>Edit Custom Car</h2>
            
            <div className="grid">
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            Car Name
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={car.name || ''} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>

                        <label htmlFor="is_convertible">
                            <input 
                                type="checkbox" 
                                id="is_convertible" 
                                name="is_convertible" 
                                checked={car.is_convertible || false} 
                                onChange={handleChange} 
                            />
                            Convertible (+$5,000)
                        </label>

                        <label htmlFor="exterior">
                            Exterior Color
                            <select id="exterior" name="exterior" value={car.exterior || 'red'} onChange={handleChange} required>
                                <option value="red">Red (+$500)</option>
                                <option value="blue">Blue (+$500)</option>
                                <option value="black">Black (Included)</option>
                                <option value="silver">Silver (Included)</option>
                                <option value="custom">Custom Color (+$1,500)</option>
                            </select>
                        </label>

                        <label htmlFor="roof">
                            Roof Type
                            <select id="roof" name="roof" value={car.roof || 'solid'} onChange={handleChange} required>
                                <option value="solid">Solid Roof (Included)</option>
                                <option value="sunroof">Sunroof (+$1,200)</option>
                                <option value="panoramic">Panoramic Glass (+$2,500)</option>
                            </select>
                        </label>

                        <label htmlFor="wheels">
                            Wheels
                            <select id="wheels" name="wheels" value={car.wheels || 'standard'} onChange={handleChange} required>
                                <option value="standard">Standard 18" (Included)</option>
                                <option value="sport">Sport 20" (+$1,000)</option>
                                <option value="offroad">Off-road 22" (+$1,500)</option>
                            </select>
                        </label>

                        <label htmlFor="interior">
                            Interior Material
                            <select id="interior" name="interior" value={car.interior || 'fabric'} onChange={handleChange} required>
                                <option value="fabric">Fabric (Included)</option>
                                <option value="leather">Leather (+$2,000)</option>
                                <option value="premium">Premium Alcantara (+$3,500)</option>
                            </select>
                        </label>

                        {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}

                        <div style={{ marginTop: '20px' }}>
                            <h3>Total Price: ${price.toLocaleString()}</h3>
                            <button type="submit" disabled={!!error}>Update Car</button>
                            <button type="button" onClick={handleDelete} className="secondary" style={{ backgroundColor: 'red', border: 'none', marginLeft: '10px' }}>Delete Car</button>
                        </div>
                    </form>
                </div>

                <div className="preview-panel">
                    <h3>Visual Preview</h3>
                    <div className="car-preview" style={{
                        width: '100%',
                        height: '250px',
                        backgroundColor: car.exterior === 'custom' ? '#ff00ff' : car.exterior,
                        borderRadius: car.is_convertible ? '10px 10px 50px 50px' : '50px',
                        borderTop: car.roof === 'panoramic' ? '15px solid #87CEEB' : '15px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textShadow: '1px 1px 2px black',
                        fontSize: '24px',
                        transition: 'all 0.3s ease'
                    }}>
                        {car.name || "Your Custom Car"}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '-30px' }}>
                        <div className="wheel" style={{ 
                            width: car.wheels === 'offroad' ? '80px' : car.wheels === 'sport' ? '70px' : '60px',
                            height: car.wheels === 'offroad' ? '80px' : car.wheels === 'sport' ? '70px' : '60px',
                            backgroundColor: '#333',
                            borderRadius: '50%',
                            border: '5px solid #ccc'
                        }}></div>
                        <div className="wheel" style={{ 
                            width: car.wheels === 'offroad' ? '80px' : car.wheels === 'sport' ? '70px' : '60px',
                            height: car.wheels === 'offroad' ? '80px' : car.wheels === 'sport' ? '70px' : '60px',
                            backgroundColor: '#333',
                            borderRadius: '50%',
                            border: '5px solid #ccc'
                        }}></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditCar;