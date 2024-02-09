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

  useEffect(() => {
    const fetchAircraftData = async () => {
      const details = [];

      for (const [owner, registrations] of data) {
        const registrationList = registrations.split(', ');
        for (const registration of registrationList) {
          const aircraftType = await fetchAircraftType(registration.trim());
          details.push({ owner, registration, aircraftType });
        }
      }

      setAircraftDetails(details);
    };

    fetchAircraftData();
  }, [data]);

  async function fetchAircraftType(registration) {
    // Placeholder for fetching logic from ADS-B or similar API
    // Return aircraft type based on registration
    return 'Aircraft Type Placeholder'; // Replace with actual fetch logic
  }

  // Render your page with the data here
  console.log(aircraftDetails); // Now contains owner, registration, and aircraft type
  return (
    <div>
      Update Page
      {/* Render your aircraft details here */}
    </div>
  );
}
