import Link from 'next/link';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
    // Use an absolute URL for server-side fetching
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
  
    const url = `${protocol}://${host}/api/getcsvdata`;
  
    const res = await fetch(url);
    const {aircraft, jets} = await res.json();
  
    // Now you can pass this data as props to your page component
    return {
      props: {
        aircraft,
        jets
      },
    };
  }

export default function tracker({aircraft, jets}) {
    const [jetData, setJetData] = useState([])
    const [aircraftData, setAircraftData] = useState([])
    console.log("aircrafts:", aircraft)
    console.log("jets", jets)
    return(
        <main>
            <div>
                Yeah I be trackin
            </div>
        </main>
    )
}