import React from "react";
import Hero from "./Hero";
import HomeCard from "./HomeCard"
import Skis from "../../assets/Skis.png"
import Snowboard from "../../assets/Snowboard.png"
import Jacket from "../../assets/Jacket.png"
import Pant from "../../assets/Pant.png"
import Boot from "../../assets/Boot.png"
import Helmet from "../../assets/Helmet.png"
import Goggle from "../../assets/Goggle.png"
import Glove from "../../assets/Glove.png"



const Home = () =>{

    const cardData = [
        { image: Skis, description: 'Our collection of skis is carefully selected to suit all skill levels and preferences.' },
        { image: Snowboard, description: 'Ride the powder with style and precision using our top-of-the-line snowboards. ' },
        { image: Jacket, description: 'Stay warm and dry on the mountain with our premium ski jackets. ' },
        { image: Pant, description: 'Our ski pants are designed to withstand the harshest weather conditions while also being stylish.' },
        { image: Boot, description: 'Discover the perfect fit and comfort with our range of ski and snowboard boots. ' },
        { image: Helmet, description: 'Safety is our top priority. Protect your head with our top-notch ski helmets. ' },
        { image: Goggle, description: 'Enhance your vision and protect your eyes from the elements with our premium ski goggles. ' },
        { image: Glove, description: 'Keep your hands warm and protected with our high-quality waterproof ski gloves. ' },
      
      ];

    return(
        <>
            <Hero />
            <h1 style={{ textAlign: 'center' }}>Products</h1>

            <div className="grid-container">
                {cardData.map((card, index) => (
                <HomeCard key={index} image={card.image} description={card.description} />
            ))}
            </div>
            
        </>
    )
}

export default Home