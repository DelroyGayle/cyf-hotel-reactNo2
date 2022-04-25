import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import DateDiff from "./DateDiff.js";

const SearchResults = (props) => {

  const [rows, setRows] = useState([]);
  const [customerId, setCustomerId] = useState(null);
 
  const headingsKeys = [
    "id",
    "title",
    "firstName",
    "surname",
    "email",
    "roomId",
    "checkInDate",
    "checkOutDate",
    "customerProfile"
  ];

  // selectClass: OFF "row-not-highlighted", ON "row-highlighted"
  const handleHighlightRow = (rowId)=> {
    if (rows.includes(rowId)) {
        setRows(rows.filter(rowsInArray => rowsInArray !== rowId)); // array without RowId
    }
    else{
        setRows([...rows,rowId]); // array with RowId
    }
  };

  function handleProfile(event,clickedId) {
        event.stopPropagation();
        setCustomerId(clickedId);
        //return `Customer ${clickedId} Profile`;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">First Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Room Id</th>
            <th scope="col">Check-In Date</th>
            <th scope="col">Check-Out Date</th>
            <th scope="col">Number of Nights</th>
            <th scope="col">Customer Profile</th>
          </tr>
        </thead>

        <tbody>
           {props.theBookings.map((booking, index, arr) => {
              return (
                    <tr key={booking.id} onClick={() => handleHighlightRow(booking.id)}  
                    // This class determines the highlighting
                        className={rows.includes(booking.id) ? "row-highlighted" : "row-not-highlighted"}
                    >
                        <th scope="col">{booking.id}</th>
                            <td>{booking.title}</td>
                            <td>{booking.firstName}</td>
                            <td>{booking.surname}</td>
                            <td>{booking.email}</td>
                            <td>{booking.roomId}</td>
                            <td className = "nobreak">{booking.checkInDate}</td>
                            <td className = "nobreak">{booking.checkOutDate}</td>
                            <td>
                                <DateDiff
                                    twoDates={{
                                      a: booking.checkInDate,
                                      b: booking.checkOutDate,
                                    }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleProfile(event,booking.id)}>Show Profile</button>
                            </td>
                    </tr>
                      );
            })}
        </tbody>
      </table>
      {/* The Customer Profile should be rendered next to the table */}
       {customerId && <DisplayCustomerProfile theId={customerId}/>}
    </div>
  );
};

function DisplayCustomerProfile(props) {

   const [fetchedData, setFetchedDate] = useState(null);

        useEffect(() => {
                          fetch(`https://cyf-react.glitch.me/customers/${props.theId}`)
        .then((res) => res.json())
        // .then((data) => console.log(data));
        .then((response) => {

                          setFetchedDate(response);
        })
        }, [props.theId]);


        // return `Customer ${props.theId} Profile`;
        // REPLACED WITH:

        if (fetchedData && fetchedData.id === props.theId) {

          return <ul> 
                  <li>{`Customer ID: ${fetchedData.id}`}</li>
                  <li>{`Tel. No.: ${fetchedData.phoneNumber}`}</li>
                  <li>{`Email: ${fetchedData.email}`}</li>
                  {fetchedData.vip && <li><strong>Please note: This customer is a VIP</strong></li>}
                </ul>
        }
}

export default SearchResults;

