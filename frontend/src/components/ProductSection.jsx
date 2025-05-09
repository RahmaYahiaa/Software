

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((data) => sectProducts(data));
  // }, []);
/*eslint-disable*/
  import React, { useEffect, useState } from "react";
 
  import { NavLink } from "react-router-dom";
  

  
  export default function ProductSection() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
 
    let componentMounted = true;
  
    useEffect(() => {
      const getProducts = async () => {
     
        const response = await fetch("http://localhost:5000/api/products");
        if (componentMounted) {
          setData(await response.clone().json());
          setFilter(await response.json());
          console.log(filter);
        }
  
        return () => {
          componentMounted = false;
        };
      };
  
      getProducts();
    }, []);
  
    
  
    const filterProduct = (cat) => {
        const updatedList = data.filter((x)=>x.category === cat);
        setFilter(updatedList);
    }
  
    const ShowProducts = () => {
      return (
        <>
          <div className="buttons d-flex justify-content-center mb-5 pb-5">
            <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Men's Clothing</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("women's clothing")}>
              Women's Clothing
            </button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("jewelery")}>Jewelery</button>
            <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("electronics")}>Electronic</button>
          </div>
          {filter.map((product) => {
            return (
              <>
                <div className="col-md-3 mb-4">
                  <div className="card h-100 text-center p-4" key={product.id}>
                    <img src={product.image} className="card-img-top" alt={product.name} height="250px" />
                    <div className="card-body">
                      <h5 className="card-name mb-0">{product.name.substring(0,12)}...</h5>
                      <p className="card-text lead fw-bold">
                        ${product.price}
                      </p>
                      <NavLink className="btn btn-outline-dark">
                        Buy Now
                      </NavLink>
                      {/* to={`/products/${product.id}`}  */}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    };
    return (
      <div>
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 fw-bolder text-center">Our Products</h1>
              <hr />
            </div>
          </div>
          <div className="row justify-content-center">
            { <ShowProducts />}
          </div>
        </div>
      </div>
    );
  };
  