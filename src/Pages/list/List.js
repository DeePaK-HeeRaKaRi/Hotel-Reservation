import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import './List.css';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../Components/SearchItem/SearchItem';
import useFetch from '../../Hooks/useFetch';
function List() {
  const location = useLocation();
  // console.log(location);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  /*eslint-disable */
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min,setMin] = useState('');
  const [max,setMax] = useState('');
  const { data,loading,reFetch } = useFetch(`/hotels?city=${destination}&min=${min}&max=${max}`);
  const handleClick = () => {
    reFetch();
  };
  return (
    <div>
      <Navbar></Navbar>
      <Header type="list"></Header>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} onChange={e => setDestination(e.target.value)} value={destination} type="text"></input>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >{`${format(dates[0].startDate, 'MM/dd/yyy')} to
               ${format(dates[0].endDate, 'MM/dd/yyy')}`}</span>

              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  // not able to choose previous date
                  minDate={new Date()}
                  // moveRangeOnFirstSelection={false}
                  ranges={dates}
                  // className="date"
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
                  <input type="number" onChange={e => setMin(e.target.value)} value={min} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMax(e.target.value)} value={max} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {
              loading ? 'Loading' :
                <>
                  {
                    data.map(item => (
                      <SearchItem key={item._id} item={item}/>
                    ))
                  }
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
