// pages/api/aircraft.js
import axios from 'axios';

export default async function handler(req, res) {
  const { registration } = req.query;

  if (!registration) {
    return res.status(400).json({ error: 'Registration number is required' });
  }

  const options = {
    method: 'GET',
    url: `https://adsbexchange-com1.p.rapidapi.com/v2/registration/${registration}/`,
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Store your API key in an environment variable
      'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching aircraft data', error: error.message });
  }
}
