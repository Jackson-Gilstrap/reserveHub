"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FC } from "react";

const LocationPicker = ({ date }:any) => {
//need to set a loading indicator the request from the backend is taking too long and might over load server
  //sequential sequence user picks the date, then the location, then the appointment.
  //need to implement location days on the db and backend so that when I pull from db i can filter the loctiona array fo those specific appointments.
  const [locations, setLocations] = useState<any>([])
  const get_locations = () => {
     fetch("http://localhost:5000/api/locs-retrival")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request unsuccessful");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.body);
        //create a new location array
        const filteredLocations: Array<any> = []
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const selectedWeekday = daysOfWeek[new Date(date).getDay()]
        console.log("selected weekday array:", selectedWeekday)

        //for each location in data.body we need to loop through destructure the weekday from it 
        data.body.forEach((location:any)=> {
            const {weekdays} = location
            console.log(typeof(weekdays))
            console.log(weekdays)
            let day:string;
            for(day of weekdays) {
                if (day === null) {
                    continue
                } else {
                    
                    if (day == selectedWeekday){
                        //if true append the location object we looped through to the new array
                        filteredLocations.push(location)
                        console.log('filtered locations: ',filteredLocations)
                    }
                }
                
            }
            //then check if the weekday array includes the date
        })
        //finally once the foreach loop is complete set the SetLocations to the new location array created above
        setLocations(filteredLocations)
      }).catch(error=> {
        console.error(error)
      });
  };
 useEffect(()=> {
    get_locations()
 },[date])

  return (
    <>
 {date && (
      <div className="border-2 border-white flex justify-evenly py-2">
        {locations && locations.length > 0 ? (
            locations.map((location:any) => (
                <div className="border-2 border-green-500 px-4 py-4 hover:cursor-pointer hover:border-white hover:bg-green-500 hover:text-black ">
                    {location.location_name}
                </div>
            ))
        ): (
            <div>
                <p>There are no locations with appointments on {date}</p>
            </div>
        )}
      </div>

 )}   
    </>
  );
};

export default LocationPicker;
