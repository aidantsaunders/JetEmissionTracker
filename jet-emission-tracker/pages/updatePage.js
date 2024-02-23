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
  // Example of fetching from within a React component
  useEffect(() => {
    const fetchAircraftData = async () => {
      try {
        const res = await fetch(`/api/aircraft?registration=N8737L`);
        const data = await res.json();
        console.log(data);
        // Handle the response data
      } catch (error) {
        console.error('Failed to fetch aircraft data:', error);
      }
    };

    fetchAircraftData();
  }, []);
  
  return (
    <div>
      Update Page
      {/* Render your aircraft details here */}
    </div>
  );
}
