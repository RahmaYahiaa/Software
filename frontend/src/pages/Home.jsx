import React from "react";
import ProductSection from "./../components/ProductSection";


export default function Home() {
  return (
    <>

    <div className="home">
      <div className="card bg-dark text-white border-0">
        <img src="./images/bg.jpg" className="card-img" alt="" height="600px" />
        
      </div>
      <ProductSection />
    </div>

    </>
  );
}