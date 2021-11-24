// Summary:
// getStaticPaths is an important function which we need in dynamic pages to tell NextJS for which dynamic parameter values this page should be pre-generated.

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg"
      title="A first meetup"
      address="Some street 5, Some city"
      description="This is a first meetup"
    />
  );
};

// Since this is a dynamic page, NextJS needs to know for which ID values it should pre-generate the page. Remember, the page is not pre-generated when a user visits it with a specific value in the URL, but during the build process (getStaticProps). So we need to pre-generate all the URLs, for all the meetup ID values users might be entering at runtime. And if they enter an ID for which we didn't pre-generate the page, they will see a 404 error.

// For this reason we need to add getStaticPaths which has the job of returning an object where we describe all the dynamic segment values.
export const getStaticPaths = async () => {
  return {
    // must add a fallback key to tell NextJS whether the paths array contains all supported parameter values or just some of them.
    fallback: false, // Tells Next all paths contain all supported meetupId values.
    // When false, if a user enters anything other than what is specified then 404.
    // When true, NextJS tries to generate a page dynamically on the server for the incoming request.
    // Fall back is a nice feature because it allows you to pre-generate some of your pages for specific ID values e.g. pages which are visited most frequently and then pre-generate the missing ones dynamically when requests come in.

    paths: [
      {
        params: {
          meetupId: "m1",
        },
        // {accountId: "a1"},
        // more than one object if we had multiple dynamic segments e.g. [accountId]
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      // In reality, we would not hard-code this, but instead fetch the supported IDs from a database or an API and generate the array dynamically.
    ],
  };
};
// getStaticPaths is a function you need to export in a page component file if its a dynamic page and is using getStaticProps (NOT if using getServerSideProps).

// We need the identifier or ID to determine which meetup to display the details on. Typically we would access this from the url parameter using the useRouter hook, however that hook can only be used in the component function, not in getStaticProps.
// Instead we can use the 'context' parameter to access the params key.
export const getStaticProps = async (context) => {
  // fetch data for single meetup

  const meetupId = context.params.meetupId;
  // obj where our identifiers (meetupId) will be property and the value will the actual values encoded in the URL.
  console.log(meetupId);
  // Only visible in terminal as getStaticProps runs during build time.

  return {
    props: {
      meetupData: {
        id: "m1",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
        title: "A first meetup",
        address: "Some street 5, Some city",
        description: "This is a first meetup",
      },
    },
  };
};

export default MeetupDetails;
