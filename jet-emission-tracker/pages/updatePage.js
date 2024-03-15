import getGoogleSheetData from '../services/updateDatabase'; // Adjust the path as needed
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
  try {
    const data = await getGoogleSheetData();
    return { props: { data } };
  } catch (error) {
    console.error(error);
    // Return error page or message
    return { props: { data: [], error: "Failed to fetch data" } };
  }
}


export default function UpdatePage({ data }) {
  const [aircraftDetails, setAircraftDetails] = useState([]);
  // Fetch aircraft data
  useEffect(() => {
    const fetchAircraftData = async () => {
      const details = [];

      for (const [owner, registrations] of data) {
        const registrationList = registrations.split(', ');
        for (const registration of registrationList) {
          const res = await fetch(`/api/aircraft?registration=${registration.trim()}`);
          const aData = await res.json();
          if(aData.ac.length != 0) {
            const aircraftType = aData.ac[0].t
            details.push({ owner, registration, aircraftType })
          }
          else {
            const aircraftType = "NADA"
            details.push({ owner, registration, aircraftType })
          }
        }
      }
      setAircraftDetails(details)
    };

    fetchAircraftData();
  }, []);
  console.log(aircraftDetails)
  return (
    <div>
      Update Page
      {/* Render your aircraft details here */}
    </div>
  );
}
