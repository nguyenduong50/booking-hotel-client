import { useEffect, useState } from "react";
import "./featuredProperties.css";
import axios from '../../utils/axios';
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [bestHotels, setBestHotels] = useState([]);

  const hotelHandle = (hotel_id) => {
    navigate('/hotel/' + hotel_id);
  };

  const fetchHotels = async() => {
    try{
      const response = await axios.get('best-hotels');
      setBestHotels(response.data);
    }
    catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <>
      <div className="fp">
        {
          bestHotels.length > 0 &&
          bestHotels.map(hotel => (
            <div className="fpItem" key={hotel._id}>
              <img
                //src={process.env.PUBLIC_URL + '/images/hotel_1.webp'}
                src={hotel.photos[0]}
                alt="hotel"
                className="fpImg"
                onClick={() => hotelHandle(hotel._id)}
              />
              <span className="fpName"><a href={`/hotel/${hotel._id}`} target="_blank">{hotel.name}</a></span>
              <span className="fpCity">{hotel.city}</span>
              <span className="fpPrice">Starting from $120</span>
              <div className="fpRating">
                <button>{hotel.rating}</button>
                <span>Excellent</span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default FeaturedProperties;
