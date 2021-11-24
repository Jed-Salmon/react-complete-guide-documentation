// To add metadata, e.g. title and description for SEO, we must add to our pages head
// To add head elements to the html head section we can import 'Head' from NextJS.
import Head from "next/head";
// To use Head we add it to the returned JSX code.

import { MongoClient } from "mongodb";
// when importing a package in a page component file that is only intended to be used in getStaticProps/getServerSideProps, NextJS will detect this and not include it in the client side bundle. This gives an increase in security and decrease in bundle size.

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://jED:nlN6HKPByPPVipKE@cluster0.jljg1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5,
  };
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
