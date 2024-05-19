import { useEffect, useState } from "react";
import "./featured.css";
import { HanoiImage, HCMImage, DanangImage } from "../../assets";
import httpRequest from '../../utils/axios';

const Featured = () => {
  const [hotels, setHotels] = useState({});

  const fetchHotel = async() => {
    try{
      const response = await httpRequest.get('hotels-by-city');
      const data = await response.data;
      setHotels(data);
      return response;
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src={HanoiImage}
          alt="City"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{hotels['Ha Noi'] ? hotels['Ha Noi'].length : '0'} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src={HCMImage}
          alt="City"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{hotels['Ho Chi Minh'] ? hotels['Ho Chi Minh'].length : '0'} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src={DanangImage}
          alt="City"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{hotels['Da Nang'] ? hotels['Da Nang'].length : '0'} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
