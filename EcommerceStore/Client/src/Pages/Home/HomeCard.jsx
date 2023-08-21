import React from "react";
import "./HomeCard.css"
import { Link } from 'react-router-dom';

const HomeCard = ({ image, description, url }) =>{

    return (
        <>
            <div className="card">
                <img src={image} alt="Product" className="card-image" />
                <div className="card-description">{description}</div>
                <Link to={url}>
                    <button className="card-button">Shop Now</button>
                </Link>
            </div>
        </>
    )
}

export default HomeCard