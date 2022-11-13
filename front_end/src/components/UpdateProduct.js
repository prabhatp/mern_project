import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async() => {
        let result = await fetch('http://localhost:5000/product/'+params.id, {
            method: "GET"
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async() => {
        let result = await fetch('http://localhost:5000/product/'+params.id, {
            method: "PUT",
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        navigate('/');
    }

    return(
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" className='input_box' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='error'>Enter valid name</span>}
            <input type="text" className='input_box' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='error'>Enter valid name</span>}
            <input type="text" className='input_box' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='error'>Enter valid name</span>}
            <input type="text" className='input_box' placeholder='Enter product company' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='error'>Enter valid name</span>}
            <button type="button" className='app_button' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;