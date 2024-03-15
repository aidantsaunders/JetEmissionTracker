import { google } from 'googleapis';

const getGoogleSheetData = async () => {
  try {
    const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });

    const ranges = ['Aircraft!N4:O43', 'Aircraft!N48:O50'];
    let combinedData = [];

    for (const range of ranges) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1SsdEMEs-ACQem2l1mox-hzlw8-bG1_rEKNYPP3bfpfg',
        range: range,
      });
      combinedData = combinedData.concat(response.data.values);
    }
    
    return combinedData;
  } catch (err) {
    console.error('The API returned an error: ' + err);
    return [];
  }
};

export default getGoogleSheetData;
