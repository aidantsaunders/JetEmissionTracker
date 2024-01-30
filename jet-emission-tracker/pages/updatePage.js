import getGoogleSheetData from '../services/updateDatabase'; // Adjust the path as needed

export async function getServerSideProps(context) {
  const data = await getGoogleSheetData();
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default function UpdatePage({ data }) {
  // Render your page with the data here
  console.log(data)
  return (
    <div>
      Update Page
    </div>
  );
}
