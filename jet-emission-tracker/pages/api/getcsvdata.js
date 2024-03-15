import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export default function handler(req, res) {
  const aircraftFilePath = path.resolve('./data', 'aircraft-data.csv');
  const jetFilePath = path.resolve('./data', 'jet-data.csv');

  const aircraftData = fs.readFileSync(aircraftFilePath, 'utf8');
  const jetData = fs.readFileSync(jetFilePath, 'utf8');

  const parsedAircraftData = Papa.parse(aircraftData, { header: true }).data;
  const parsedJetData = Papa.parse(jetData, { header: true }).data;

  res.status(200).json({ aircraft: parsedAircraftData, jets: parsedJetData });
}