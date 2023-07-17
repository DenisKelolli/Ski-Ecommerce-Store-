import React from "react";
import Carousel from "./Carousel";
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
        { image: Skis, description: 'Our collection of skis is carefully selected to suit all skill levels and preferences. From carving skis for precise turns to freestyle skis for jumps and tricks, we have the perfect pair for every adventure on the mountain.' },
        { image: Snowboard, description: 'Ride the powder with style and precision using our top-of-the-line snowboards. Designed for optimal performance, our snowboards offer excellent control and responsiveness, allowing you to conquer the slopes with confidence.' },
        { image: Jacket, description: 'Stay warm and dry on the mountain with our premium ski jackets. Crafted with the latest insulation and waterproof technologies, our jackets provide exceptional protection against cold, wind, and snow. Choose from a variety of stylish designs to suit your taste.' },
        { image: Pant, description: 'Our ski pants combine functionality and style. Designed to withstand the harshest weather conditions, they offer excellent insulation, breathability, and waterproofing. Whether you prefer a relaxed fit or a more streamlined look, we have the perfect pair for you.' },
        { image: Boot, description: 'Discover the perfect fit and comfort with our range of ski boots. Our selection includes boots for various skill levels and skiing styles. Equipped with advanced features, such as adjustable buckles and heat-moldable liners, our boots ensure maximum performance and comfort on the slopes.' },
        { image: Helmet, description: 'Safety is our top priority. Protect your head with our top-notch ski helmets. Lightweight, durable, and equipped with advanced impact-absorbing technology, our helmets provide the necessary protection while maintaining comfort and ventilation.' },
        { image: Goggle, description: 'Enhance your vision and protect your eyes from the elements with our premium ski goggles. Our goggles feature anti-fog and anti-scratch lenses, ensuring clear visibility in all weather conditions. Choose from a wide range of lens tints and frame styles to suit your preferences.' },
        { image: Glove, description: 'Keep your hands warm and protected with our high-quality ski gloves. Designed with waterproof and breathable materials, our gloves provide excellent dexterity and insulation. Choose from a variety of styles, including touchscreen-compatible gloves for convenience on the slopes.' },
      
      ];

    return(
        <>
            <Carousel />
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