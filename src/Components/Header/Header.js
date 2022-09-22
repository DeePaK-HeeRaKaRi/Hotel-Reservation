import React, { useContext } from 'react'
import './Header.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBed,faPlane,faCar,faTaxi, faCalendarDays, faPerson} from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range';
import {useState} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/searchContext';
import { AuthContext } from '../../Context/AuthContext';
function Header({type}) {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [destination,setDestination] =useState('')
  const [openDate,setOpenDate] = useState(false)
  const [openOptions,setOpenOptions] = useState(false)
  const [options,setOptions] = useState({
    adult:1,children:0,room:1
  })
  const handleOptions = (name,operation) => {
    setOptions((prev) =>{
      return {
        ...prev,
        [name]:operation === "i" ? options[name] + 1 : 
        options[name] -1
        // options[name] - 1 >=1 ? options[name] -1 : options[name]
      }
    } )
  }
  const navigate = useNavigate()
  const {dispatch} = useContext(SearchContext)
  const {user} = useContext(AuthContext)
  console.log('header user',user)
  const handleSearch = () => {
    dispatch({type:'NEW_SEARCH',payload:{destination,dates,options}})
    navigate('/hotels',{state:{destination,dates,options}})
  }
  return (
    <div className={type === 'list' ? 'header-listModel' : 'header'}>
      <div className={type === 'list' ? "headerContainer-listModel" : "headerContainer" }>
        <div className='headerList'>
          <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Attraction</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        { type !=="list" &&
          <><h1 className='headerTitle'>A lifetime of discounts? It's Genius.</h1>
        <p className='headerDesc'>
          Get Rewarded for your travels - unlock instant saving of 10%
        </p>
        {!user ? <button className='headerBtn'>Sign in / Register</button> : user.username}
        <div className='headerSearch'>
            <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faBed} />
            <input type='text' placeholder='Where are you going ?' 
            className='headerSearchInput' onChange={(e) => setDestination(e.target.value)} value={destination}/>
            </div>
            <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span onClick={() =>setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate,"MM/dd/yyy")} to ${format(dates[0].endDate,"MM/dd/yyy")}`}</span>
            {openDate && <DateRange
                editableDateInputs={true}
                minDate={new Date()}
                onChange={item => setDates([item.selection])}
                // moveRangeOnFirstSelection={false}
                ranges={dates}
                className='date'
              />}
            </div>
            <div className='headerSearchItem'>
            <FontAwesomeIcon icon={faPerson} />
            <span onClick={() => setOpenOptions(!openOptions)}
            className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
           {openOptions &&
            <div className='options'>
              <div className='optionItem'>
                <span className='optionText'>Adult</span>
                <div className='optionCounter'>
                <button className='optionCounterButton'
                disabled={options.adult<=1}
                 onClick={() => handleOptions("adult","d")}>-</button>
                <span className='optionCounterNumber'>
                  {options.adult}
                </span>
                <button className='optionCounterButton' onClick={() => handleOptions("adult","i")}>+</button>
                </div>
              </div>
              <div className='optionItem'>
                <span className='optionText'>Children</span>
                <div className='optionCounter'>
                <button className='optionCounterButton' disabled={options.children<=0} onClick={() => handleOptions("children","d")}>-</button>
                <span className='optionCounterNumber'>{options.children}</span>
                <button className='optionCounterButton' onClick={() => handleOptions("children","i")}>+</button>
                </div>
              </div>
              <div className='optionItem'>
                <span className='optionText'>Room</span>
                <div className='optionCounter'>
                <button className='optionCounterButton' disabled={options.room<=1} onClick={() => handleOptions("room","d")}>-</button>
                <span className='optionCounterNumber'>{options.room}</span>
                <button className='optionCounterButton' onClick={() => handleOptions("room","i")}>+</button>
                </div>
              </div>
            </div>}
            </div>
            <div className='headerSearchItem'>
            <button className='headerBtn' onClick={handleSearch}>Search</button>
            </div>
        </div></>}
        </div>
    </div>
  )
}

export default Header