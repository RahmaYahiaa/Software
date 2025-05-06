// import React from "react";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

// const MyNav = () => {
//     const cartItems = useSelector((state) => state.handleCart);

//     const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
//             <div className="container">
//                 <NavLink className="navbar-brand fw-bold fs-4" to="/">
//                     FAVSHOPING
//                 </NavLink>
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <NavLink className="nav-link active" aria-current="page" to="/">
//                                 Home
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/products">
//                                 Store
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/about">
//                                 About
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/contact">
//                                 Contact
//                             </NavLink>
//                         </li>
//                     </ul>
//                     <NavLink to="/login" className="btn btn-outline-dark">
//                         <i className="fa fa-sign-in me-1"></i> Login
//                     </NavLink>
//                     <NavLink to="/register" className="btn btn-outline-dark ms-2">
//                         <i className="fa fa-user-plus me-1"></i> Register
//                     </NavLink>
//                     <NavLink to="/cart" className="btn btn-outline-dark ms-2">
//                         <i className="fa fa-shopping-cart me-1"></i> Cart ({totalItems})
//                     </NavLink>
//                 </div>
//             </div>
//         </nav>
//     );
// };


// export default MyNav;


import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const MyNav = () => {
    const cartItems = useSelector((state) => state.handleCart);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 shadow-sm sticky-top">
            <div className="container-fluid px-4">
                <NavLink className="navbar-brand fw-bold fs-4 text-gradient" to="/">
                    <span className="text-primary">FAV</span>
                    <span className="text-danger">SHOP</span>
                </NavLink>
                
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <NavLink 
                                className="nav-link position-relative" 
                                to="/"
                                activeclassname="active"
                            >
                                Home
                                <span className="nav-underline"></span>
                            </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink 
                                className="nav-link position-relative" 
                                to="/products"
                                activeclassname="active"
                            >
                                Products
                                <span className="nav-underline"></span>
                            </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink 
                                className="nav-link position-relative" 
                                to="/about"
                                activeclassname="active"
                            >
                                About
                                <span className="nav-underline"></span>
                            </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink 
                                className="nav-link position-relative" 
                                to="/contact"
                                activeclassname="active"
                            >
                                Contact
                                <span className="nav-underline"></span>
                            </NavLink>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center">
                        <NavLink to="/login" className="btn btn-outline-primary btn-sm mx-2">
                            <i className="fa fa-sign-in-alt me-1"></i> Login
                        </NavLink>
                        <NavLink to="/register" className="btn btn-primary btn-sm mx-2">
                            <i className="fa fa-user-plus me-1"></i> Register
                        </NavLink>
                        <NavLink to="/cart" className="btn btn-link position-relative mx-2">
                            <i className="fa fa-shopping-cart fs-5"></i>
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                    <span className="visually-hidden">items in cart</span>
                                </span>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNav;