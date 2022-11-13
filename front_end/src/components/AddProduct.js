import React, {useState} from 'react';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async() => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user)._id;

        let result = await fetch('http://localhost:5000/add-product', {
            method: "POST",
            body: JSON.stringify({ userId, name, price, category, company }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
    }
    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" className='input_box' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className='error'>Enter valid name</span>}
            <input type="text" className='input_box' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className='error'>Enter valid name</span>}
            <input type="text" className='input_box' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className='error'>Enter valid name</span>}
            <input type="text" className='input_box' placeholder='Enter product company' value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span className='error'>Enter valid name</span>}
            <button type="button" className='app_button' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;