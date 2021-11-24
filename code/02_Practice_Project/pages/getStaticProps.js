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

// Before we would have used useEffect to provide our data and set the state.
// useEffect(() => {
//   setLoadedMeetups(DUMMY_MEETUPS);
// }, []);

// useEffect runs on our apps initial load triggering the state update function.
// That produces a second component execution for HomePage as state was changed.
// In this second execution the data is then provided to MeetupList and rendered.
// The problem with this is that NextJS takes the result of the first render cycle (for server-side rendering), which would result in the source code showing an empty unordered list (bad SEO) as the stored state for that first cycle is an empty array.

// NextJS has built in core features that provide a solution to the above problem by allowing developers to configure the page pre-rendering process.
// Two types of page pre-rendering: 'static generation' and server 'side rendering'.
// When using static generation, a page component is pre-rendered when building the NextJS project for production. That means after deployment the pre-rendered page does not change. To update or change any data, you therefor need to start the build process again and redeploy.

// If you need to add data fetching to the page content, you can do so by exporting a special asynchronous function from inside your page component file:
export const getStaticProps = async () => {
  // must be called 'getStaticProps'
  // must be inside page component file (inside pages folder).
  // returns a promise which when resolved (data is loaded) allows us to return the data as props for the component function.

  // Here you could securely connect to a database or access a file system as any code written will never be executed on the client side, simply because this code is executed during the build process.

  // must always return an object with a props property
  return {
    // props obj is automatically received in the page component function
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // unlock a feature called incremental static generation.
    revalidate: 10, // number of secs until page regeneration
    // ensures your rendered data is never older than time specified (depends on required data update frequency).
  };
};
// NextJS automatically executes getStaticProps during the pre-rendering process.
// It will not directly call the component function but instead call getStaticProps first.
// The functions job is to prepare props for this page, whereby these props contain the data the page needs. Its able to load data before the component function is executed so the component can be initially rendered with the required data.

// What if we update our database and consequently our data?
// Without client side data fetching we would have outdated meetups/data as the page is only generated when built.
// The solution is to always rebuild our site and redeploy when our data changes. If it does so frequently, we can add the revalidate property and specify our update frequency.

export default HomePage;
