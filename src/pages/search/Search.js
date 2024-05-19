import "./search.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import httpRequest from '../../utils/axios';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [hotels, setHotels] = useState([]);

  const changeAdultOptionsHandle = (value) => {
    setOptions(prevOptions => {
      return{
        ...prevOptions,
        adult: value
      }
    });
  };

  const changeChildrenOptionsHandle = (value) => {
    setOptions(prevOptions => {
      return{
        ...prevOptions,
        children: value
      }
    });
  };

  const changeRoomOptionsHandle = (value) => {
    setOptions(prevOptions => {
      return{
        ...prevOptions,
        room: value
      }
    });
  };

  const fetchSearch = async(searchInfo) => {
    try{
      const response = await httpRequest.post(
        'search',
        {searchInfo: searchInfo}
      );
      const data = await response.data;
      setHotels(data);
      return response;
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch(location.state);
  }, [location.state]);

  return (
    <>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input value={destination} type="text" onChange={(event) => setDestination(event.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}
                    onChange={(event) => changeAdultOptionsHandle(event.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children}
                    onChange={(event) => changeChildrenOptionsHandle(event.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room}
                    onChange={(event) => changeRoomOptionsHandle(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => fetchSearch({destination, date, options})}>Search</button>
          </div>
          <div className="listResult">
            {
              hotels.length > 0 &&
              hotels.map((hotel, index) => (
                <SearchItem hotel={hotel} key={index} />
              ))
            }           
          </div>
        </div>
      </div>
      <div className='search-page-footer'>
        <Footer/>
      </div>
    </>
  );
};

export default List;
