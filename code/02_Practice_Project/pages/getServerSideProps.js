import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345, Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345, Some City",
    description: "This is a second meetup",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// There is an alternative to getStaticProps that can update on every request. The main difference is that this function will now not run during the build process, but instead always on the server after deployment.
export const getServerSideProps = async (context) => {
  // getServerSideProps is a reserved name and must be used as such

  // get access to the incoming request with its headers and request body
  const req = context.req;
  // gives extra data or info that you may need for the code that executes (used with authentication).
  const res = context.res;

  // could fetch data from an API or file system

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // This function runs for every incoming requests, so there is no need to revalidate every x seconds.
  };
};
// getServerSideProps is guaranteed to run for every request. This can be a disadvantage, because it means that you need to wait for your page to be generated on every incoming request.

// How to pick between getServerSideProps and getStaticProps:
// If you don't have data that changes every second and if ou don't need to access a request object, lets say for authentication, then getStaticProps is the better option.
// with getStaticProps is faster than getServerSideProps as it can be cached and reused, instead of regenerated all the time. Only should use getServerSideProps if we need access to that request object, because you don't have access to request and response in getStaticProps.

export default HomePage;
