import getGoogleSheetData from '../services/updateDatabase'; // Adjust the path as needed

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
  // Render your page with the data here
  console.log(data)
  console.log("yo")
  return (
    <div>
      Update Page
    </div>
  );
}
