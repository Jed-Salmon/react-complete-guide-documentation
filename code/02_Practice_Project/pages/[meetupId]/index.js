import Head from "next/head";

// _id is an object in mongodb so to ensure we correctly look for an ID we must covert it from string to an object. For this we import and use 'ObjectId'.
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  // connect to mongodb database
  const client = await MongoClient.connect(
    "mongodb+srv://jED:nlN6HKPByPPVipKE@cluster0.jljg1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  // access the collection
  const meetupsCollection = db.collection("meetups");

  // get all meetup data
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // find() gives access to all meetups in the collection.
  // The first argument defines our filter criteria where we could filter for certain field values. We use an empty object to find all documents (meetups).
  // The second argument defines which fields should be extracted for all documents. We specified the inclusion (1 or true) for the ID field, so documents with this field must be included. If we set it to zero or false then it would exclude the ID field.

  console.log(meetups);
  client.close();

  // specify which meetup pages should be pre-generated
  return {
    fallback: "blocking",
    // When we set fallback to true or to blocking, we tell NextJS that the list of paths which we specify here, might not be exhaustive, there might be more valid pages.
    // Therefore, when fallback is set to true or blocking, NextJS will not respond with a 404 page if it can't find the page immediately. Instead it will generate that page on demand, and thereafter cache it, so it will pre-generate it when needed.
    // The difference between true and blocking is that with true, it would immediately return an empty page, and then pull down the dynamically generated content once that's done. So you need to handle that case that the page does not have the data yet.
    // With blocking, the user will not see anything until the page was pre-generated, and the finished page will be served.

    // dynamically generate our array of paths
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  // fetch data for single meetup

  // get meetup document id form URL params (string)
  const meetupId = context.params.meetupId;

  // connect to mongodb database
  const client = await MongoClient.connect(
    "mongodb+srv://jED:nlN6HKPByPPVipKE@cluster0.jljg1.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  // access the collection
  const meetupsCollection = db.collection("meetups");

  // get an individual meetup
  const selectedMeetup = await meetupsCollection.findOne({
    // findOne finds one single document where we pass an object to define how to filter for said document.
    // On this object you can pass the field names as a key and the values you want to search as the value.
    _id: ObjectId(meetupId),
    // convert id from string to an objectId object
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }, // convert from objectId back to a string
      // without doing so we get an error serializing meetupData.id
    },
  };
};

export default MeetupDetails;
