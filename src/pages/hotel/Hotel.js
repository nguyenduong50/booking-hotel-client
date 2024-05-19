import "./hotel.css";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import httpRequest from '../../utils/axios';
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import ErrorModal from '../../components/UI/ErrorModal';
import {tokenLoader} from '../../utils/auth';

const Hotel = () => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false); //open image slider
  const [openBooking, setOpenBooking] = useState(false); //open form booking
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const params = useParams();
  const [error, setError] = useState(null);
  const token = tokenLoader();

  //Input data booking
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [paymentMethod, setPayMentMethod] = useState('');
  const [roomNumbers, setRoomNumbers] = useState([]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  //Set total bill by room-numbers and date
  const checkTotalBill = () => {
    const listRoomChecked = roomNumbers.filter(item => item.isChecked === true);

    const get_day_of_time = (d1, d2) => {
      let ms1 = d1.getTime();
      let ms2 = d2.getTime();
      return (Math.ceil((ms2 - ms1) / (24*60*60*1000))) + 1;
    };
    const timeDays = get_day_of_time(date[0].startDate, date[0].endDate);

    const totalPriceOneDay = listRoomChecked.reduce((total, item) => {
      return total + item.price
    }, 0);

    setTotalPrice(totalPriceOneDay * timeDays);
  };

  //Function process change value input Form booking
  const roomsCheckedHandle = (event, roomNumberInput) => {
    const {checked} = event.target;

    let temRoomNumbers = roomNumbers.map(item => {
      return item.roomNumber === roomNumberInput ? {...item, isChecked: checked} : item;
    }); 

    setRoomNumbers(temRoomNumbers);
  };

  const errorHandler = () => {
		setError(null);
	};

  const fetchBookingHandle = async(event) => {
    event.preventDefault();

    //Fetch booking hotel
    const newTransaction = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      idCardNumber: idCardNumber,
      hotel_id: hotel._id,
      date: date,
      paymentMethod: paymentMethod,
      roomNumbers: roomNumbers
    }

    try{
      await httpRequest.post(`booking?token=${token}`, newTransaction);
      return navigate('/');
    }
    catch(error){
      setError(error.response.data);
    }
  };

  useEffect(() => {
    checkTotalBill();
  }, [roomNumbers, date])

  useEffect(() => {
      const fetchHotel = async() => {
        const hotel_id = params.id;
        try{
          const response = await httpRequest.get('hotel/' + hotel_id);
          const data = await response.data;
          setHotel(data.hotel);
          setRooms(data.rooms);

          let roomNumbersTem = [];
          data.rooms.map(room => {
            room.roomNumbers.map(roomNumber => {
              roomNumbersTem.push({
                roomNumber: roomNumber,
                price: room.price
              });
            });
          });
          setRoomNumbers(roomNumbersTem);
        }
        catch(error){
          console.log(error);
        }
      };

      fetchHotel();
      window.scrollTo(1,1);
  }, [params.id]); 

  return (
    <div>
      {
        error && 
        <ErrorModal 
          title='Error'
          messages={error}
          onConfirm={errorHandler}
        />
      }
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hotel?.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel?.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotel?.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel?.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {hotel?.photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt="hotel"
                  loading="lazy"
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel?.title}</h1>
              <p className="hotelDesc">
                {hotel?.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b>${hotel?.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={() => {setOpenBooking(!openBooking)}}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        {
          openBooking &&
          <form onSubmit={fetchBookingHandle} className="form-booking-hotel">
            <div className="form-booking-hotel-top">
              <div className="date-range">
                <h3>Dates</h3>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  name="dateRange"
                  minDate={new Date()}
                />
              </div>
              <div className="reserve-info">
                <h3>Reserve Info</h3>
                <div>
                  <label>Your Full Name:</label>
                  <input type="text" name="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full Name"/>
                </div>
                <div>
                  <label>Your Email:</label>
                  <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email"/>
                </div>
                <div>
                  <label>Your Phone Number:</label>
                  <input type="text" name="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="Phone Number"/>
                </div>
                <div>
                  <label>Your identity Card Number:</label>
                  <input type="text" name="cardNumber" value={idCardNumber} onChange={(event) => setIdCardNumber(event.target.value)} placeholder="Card Number"/>
                </div>
              </div>                        
            </div>
            <div className="form-booking-hotel-bottom">
              <div className="select-room">
                <h3>Select Rooms</h3>
                <div className="room-list">
                  {
                    rooms.map((room) => (
                      <div className="room-details" key={room._id}>
                        <div>
                          <h4>{room.title}</h4>
                          <p>Max People: {room.maxPeople}</p>
                          <p style={{fontWeight: 'bold'}}>${room.price}</p>
                        </div>
                        <div className="room-number">
                          {
                            room.roomNumbers.map((roomNumber, index) => (
                              <div key={index} >
                                <label>{roomNumber}</label>
                                <input type="checkbox" onChange={(event) => roomsCheckedHandle(event, roomNumber)} />
                              </div>
                            ))
                          }
                          <input type="hidden" name="roomNumbers[]" value={roomNumbers} />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="bill-payment">
                <h3>Total Bill: ${totalPrice}</h3>
                <div className="payment">
                  <select name="payment-method" 
                    value={paymentMethod} 
                    onChange={(event) => setPayMentMethod(event.target.value)} 
                    className="payment-method"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Internet Banking">Internet Banking</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                  <button type="submit">Reserve Now</button>
                </div>
              </div>
            </div>
          </form>
        }
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

// export const action = async({request}) => {
//   const data = await request.formData();

//   const newTransaction = {
//     fullName: data.get('fullName'),
//     email: data.get('email'),
//     phoneNumber: data.get('phoneNumber'),
//     cardNumber: data.get('cardNumber'),
//     roomNumbers: data.getAll("roomNumbers[]")
//   }
//   console.log(newTransaction);
//   try{
//     const response = await httpRequest.post('booking', newTransaction);
//     return response;
//   }
//   catch(error){
//     console.log(error);
//   }

//   return redirect('/');
// };
