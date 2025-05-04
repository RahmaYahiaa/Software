import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action/cartCounterAction';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function ProductDetails() {
const {_id} = useParams();
const [product, setProduct] = useState([]);


const dispatch = useDispatch();
const addProduct = (product) => {
    dispatch(addCart(product));
}

useEffect(() => {
    const getProduct = async () => {
        const response = await fetch(`http://localhost:5000/api/products/${_id}`);
        setProduct(await response.json());
    }
    getProduct();
}, [_id]); // Add '_id' to the dependency array



const ShowProduct = () => {
    return(
        <>
            <div className="col-md-6">
                <img src={product.image} alt={product.name} height="400px" w_idth="400px" />
            </div>
            <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">
                    {product.category}
                </h4>
                <h1 className="display-5">{product.name}</h1>
                <p className="lead fw-bolder">
                    Rating {product.rating && product.rating.rate} 
                    <i className="fa fa-star"></i>
                </p>
                <h3 className="display-6 fw-bold my-4">
                    $ {product.price}
                </h3>
                <p className="lead">{product.description}</p>
                <button className="btn btn-outline-dark px-4 py-2"  onClick={()=>addProduct(product)}>
                
                
                    Add to Cart
                </button>
                <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                    Go to Cart
                </NavLink>
            </div>
        </>
    )
}

return (
    <div>
        <div className="container py-5">
            <div className="row py-4">
                {<ShowProduct/>}
            </div>
        </div>
    </div>
);
}
