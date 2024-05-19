import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({hotel}) => {
  const navigate = useNavigate();

  const hotelHandle = (hotel_id) => {
    navigate('/hotel/' + hotel_id)
  };

  return (
    <div className="searchItem">
      <img
        src={hotel.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance} from center</span>
        <span className="siTaxiOp">Free Parking</span>
        <span className="siSubtitle">
          {hotel.title}
        </span>
        <span className="siFeatures">
          {hotel.type}
        </span>
        {/* If can cancel */}
        {hotel.free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (<div></div>)}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{hotel.rating === 5 && 'Excellent'}</span>
          <span>{(hotel.rating < 5 && hotel.rating >= 4) && 'Good'}</span>
          <span>{(hotel.rating < 4 && hotel.rating >= 3) && 'Normal'}</span>
          <span>{(hotel.rating < 3 && hotel.rating >= 2) && 'Bad'}</span>
          <span>{(hotel.rating < 2 && hotel.rating >= 1) && 'Terrible'}</span>
          <button>{hotel.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => hotelHandle(hotel._id)}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
