import React, { useState, useEffect } from "react";

import Search from "./Search.js";
import SearchResults from "./SearchResults.js";
//import FakeBookings from "./data/fakeBookings.json";
// Note: FakeBookings is a 'const' variable containing the relevant hotel data

const LOADING = "loading";
const SUCCESS = "success";
const FAILURE = "failure";

let wholeData;
let firstLoad = true;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isBookingsLoaded, setIsBookingsLoaded] = useState(LOADING);

  useEffect(() => {

  /* Tested using
  
  1) fetch(`https://cyf-react.glitch.me/delayed`)
  which has a 5 second delay before returning the data.

  App successfully showed the loading message

  2) fetch(`https://cyf-react.glitch.me/error`)
  which will return a 500 HTTP error.

  App successfully showed the error message
  */


    fetch(`https://cyf-react.glitch.me/`)
      .then((response) => {
                          let status = response.status;

                          if (status === 200) // successful FETCH
                          {
                                return response.json(); // CHAIN THE JSON DATA
                          }

                          else
                          {
                                throw true;     // generates an exception with the value true
                          }
      })
      .then((data) => {
        // console.log(data);

        if (firstLoad) {
            wholeData = [...data];
            firstLoad = false;
        }

        setIsBookingsLoaded(SUCCESS);
        setBookings(data);
      })

      .catch(() => {
        setIsBookingsLoaded(FAILURE);
      });
  }, []);

  const search = (searchVal) => {

       let tempBookings = [...wholeData]
        // console.info("TO DO!", searchVal,bookings);

        const filteredBookings = tempBookings.filter((element) =>
              element.firstName.toLowerCase().includes(searchVal.toLowerCase()) ||
              element.surname.toLowerCase().includes(searchVal.toLowerCase()));

        if (filteredBookings.length === 0 && searchVal.length)
              alert(`No Search Results for '${searchVal}'`);

        if (searchVal.length === 0 || filteredBookings.length === 0) { // No results - show everything
               setBookings(wholeData);
        }    
        
        else {
               setBookings(filteredBookings); 
        }
  };

  return (
    <div className="App-content">
      {isBookingsLoaded === LOADING &&
      <p><strong>Loading ... Please wait</strong></p>}

      {isBookingsLoaded === FAILURE &&
      <p><strong>Error in Loading Bookings: Bookings Could Not Be Displayed</strong></p>}

      {isBookingsLoaded === SUCCESS &&
      <div className="container">
        <Search search={search} />
        <SearchResults theBookings={bookings} />
      </div>}
    </div>
  );
};

export default Bookings;
