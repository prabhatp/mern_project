import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

const ProductList = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    async function fetchProducts() {
        let result = await fetch('http://localhost:5000/products',{
            method: "GET",
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProduct(result);
    }

    const deleteProduct = async(id) => {
        let result = await fetch('http://localhost:5000/product/' + id, {
            method: 'delete'
        });
        result = await result.json();
        if (result.deletedCount) {
            fetchProducts();
        }
    }
    const searchHandle = async(event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch('http://localhost:5000/search/' + key);
            result = await result.json();
            if (result) {
                setProduct(result);
            }
        } else {
            fetchProducts();
        }
    }

    return (
        <div className='product-list'>
            <h1>ProductList</h1>
            <input type="text" placeholder='Enter key to search' className='search_box' onChange={searchHandle}/>
            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Actions</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => {
                    return <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+ item._id}>Update</Link>
                        </li>
                    </ul>
                }) : <h3>No product found</h3>
            }
        </div>
    )
}

export default ProductList