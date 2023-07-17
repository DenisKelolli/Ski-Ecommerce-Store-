import React from "react";
import "./HomeCard.css"

const HomeCard = ({ image, description }) =>{

    return (
        <>
            <div className="card">
                <img src={image} alt="Product" className="card-image" />
                <div className="card-description">{description}</div>
                <button className="card-button">Shop Now</button>
            </div>
        </>
    )
}

export default HomeCard