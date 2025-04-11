import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action/cartCounterAction';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function ProductDetails() {
const {id} = useParams();
const [product, setProduct] = useState([]);


const dispatch = useDispatch();
const addProduct = (product) => {
    dispatch(addCart(product));
}

useEffect(() => {
    const getProduct = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        setProduct(await response.json());
    }
    getProduct();
}, [id]); // Add 'id' to the dependency array



const ShowProduct = () => {
    return(
        <>
            <div className="col-md-6">
                <img src={product.image} alt={product.title} height="400px" width="400px" />
            </div>
            <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">
                    {product.category}
                </h4>
                <h1 className="display-5">{product.title}</h1>
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


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { getProductById } from "../API/product";


// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const data = await getProductById(id);
//       // console.log(data);
//       setProduct(data);
//     })();
//   }, [id]);

//   if (!product) return <div> Loading ........ </div>;
//   return (
//     <>
//       <div className="container py-5 my-5">
//         <div className="row">
//           <div className="col-md-10 offset-md-1">
//             {id} {product?.id}
//             <div className="card mb-3">
//               <div className="row g-0">
//                 <div className="col-md-4">
//                   <img
//                     src={product?.image}
//                     className="img-fluid rounded-start"
//                     alt="..."
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title">{product?.title}</h5>
//                     <p className="card-text">{product?.description}</p>
//                     <p className="card-text">{product?.price}</p>
//                     <p className="card-text d-flex justify-content-around">
//                       <small className="text-body-secondary">Rating:</small>
//                       <small className="text-body-secondary">
//                         {product?.rating.rate}
//                       </small>
//                       <small className="text-body-secondary">
//                         {product?.rating.count}
//                       </small>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }