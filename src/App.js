import Header from './Header'; // Import the Header component
import React, { useState, useEffect } from 'react'; // Import React hooks for state and lifecycle management
import Row from './Row'; // Import the Row component
import AddUtil from './AddUtil'; // Import the AddUtil component
import HideUtil from './HideUtil'; // Import the HideUtil component
import './App.css'; // Import CSS for styling

function App() {
  // Remove existing data in localStorage for "reservations" (Reset data)
  //uncomment line bellow when all reservations are made to reset the local storage

  //localStorage.removeItem("reservations"); 
  // Initialize the `locations` state with default data or data from localStorage
  const [locations, setLocations] = useState(() => {
    try {
      const savedLocations = localStorage.getItem("reservations"); // Get data from localStorage
      const parsedData = savedLocations ? JSON.parse(savedLocations) : null; // Parse the data if it exists
      if (Array.isArray(parsedData)) {
        return parsedData; // Return parsed data if it's a valid array
      }
    } catch (error) {
      console.error("Error parsing localStorage data", error); // Log errors during parsing
    }
    // Hard data if localStorage is empty or invalid
    return [
      {
        locationName: "Grand Canyon",
        timeSlots: [
          { time: "9am-12pm", booked: false },
          { time: "12pm-3pm", booked: false },
          { time: "3pm-6pm", booked: false },
        ],
      },
      {
        locationName: "CN Tower",
        timeSlots: [
          { time: "9am-12pm", booked: false },
          { time: "12pm-3pm", booked: false },
          { time: "3pm-6pm", booked: false },
        ],
      },
    ];
  });

  // State to control the visibility of booked destinations
  const [showBooked, setShowBooked] = useState(true);

  // useEffect to load data from localStorage when the component mounts
  useEffect(() => {
    try {
      const data = localStorage.getItem("reservations"); // Get "reservations" data from localStorage
      if (data) {
        const parseData = JSON.parse(data); // Parse the data
        if (Array.isArray(parseData)) {
          setLocations(parseData); // Set locations state with parsed data if valid
        }
      }
    } catch (error) {
      console.error("Failed to load data", error); // Log errors during loading
    }
  }, []); // Empty dependency array ensures this runs only on mount

  // useEffect to save `locations` to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(locations)); // Save locations to localStorage
  }, [locations]); // Dependency array ensures this runs whenever `locations` changes

  // Function to create a new location and add it to the list
  const createLocation = (location) => {
    if (!locations.find((item) => item.locationName === location)) {
      // Check if the location already exists
      const updatedLocations = [
        ...locations,
        {
          locationName: location,
          timeSlots: [
            { time: "9am-12pm", booked: false },
            { time: "12pm-3pm", booked: false },
            { time: "3pm-6pm", booked: false },
          ],
        },
      ];
      setLocations(updatedLocations); // Update the state
      localStorage.setItem("reservations", JSON.stringify(updatedLocations)); // Save the updated data to localStorage
    }
  };

  console.log("Locations:", locations); // Log locations to debug or track state changes

  // Function to toggle the booked status of a specific time slot for a location
  const toggleReservation = (reservation, timeSlot) => {
    const updatedLocations = locations.map((item) =>
      item.locationName === reservation.locationName
        ? {
            ...item,
            timeSlots: item.timeSlots.map((slot) =>
              slot.time === timeSlot
                ? { ...slot, booked: !slot.booked }
                : slot
            ),
          }
        : item
    );
    setLocations(updatedLocations); // Update the state
    localStorage.setItem("reservations", JSON.stringify(updatedLocations)); // Save the updated data to localStorage
  };

  // Function to generate rows of reservations based on booking status
  const reservationRow = (bookedValue) =>
    locations.flatMap((item) =>
      item.timeSlots
        .filter((slot) => slot.booked === bookedValue) // Filter slots based on booking status
        .map((slot) => (
          <tr key={`${item.locationName}-${slot.time}`}>
            <td>{item.locationName}</td>
            <td>{slot.time}</td>
          </tr>
        ))
    );

  // Render the component
  return (
    <div>
      <Header locations={locations} /> {/* Header component */}
      <div className="m-3">
        <AddUtil call={createLocation} /> {/* AddUtil component for adding locations */}
      </div>
      <div className="container-fluid">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Destinations</th>
              <th>Time Slots</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((item) => (
              <Row
                key={item.locationName}
                item={item}
                toggle={toggleReservation} // Pass toggle function to Row
              />
            ))}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <HideUtil
            description="Booked Destinations"
            isBooked={showBooked}
            call={(checked) => setShowBooked(checked)} // Update showBooked state
          />
        </div>
        {showBooked && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Destinations</th>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>{reservationRow(true)}</tbody>  {/* Render booked reservations */}
          </table>
        )}
      </div>
    </div>
  );
}

export default App; // Export the App component
