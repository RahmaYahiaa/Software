import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container mt-5">
      {/* Company Introduction Section */}
      <section className="text-center mb-5">
        <h2 className="mb-4">About Us</h2>
        <p className="lead">
          Welcome to <strong>Our E-commerce Store</strong>, where we provide high-quality products with a focus on customer satisfaction and innovation.
        </p>
        <p>
          Since our inception, we have been committed to offering a seamless online shopping experience and outstanding customer service. Whether you're looking for the latest fashion, electronics, or home essentials, we've got you covered.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="text-center mb-5">
        <h3 className="mb-4">Our Values</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Customer First</h5>
                <p className="card-text">We prioritize our customers in every decision we make and ensure their satisfaction.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Innovation</h5>
                <p className="card-text">We continuously improve our platform to stay ahead in the market and deliver cutting-edge experiences.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Quality Products</h5>
                <p className="card-text">We offer a wide range of high-quality products to meet the needs of our diverse clientele.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;
