// We can create dynamic paths which always load the same page component that outputs different content, each with their own route identifier.
// For this we change the file name using a special syntax which is understood by Next.js. By adding square brackets [] to the file name, it tells Next.js that this will be a dynamic page. We can add an identifier between the square brackets, where the name is up to us.

// special custom hook provided by NextJS
import { useRouter } from "next/router";

const DetailPage = () => {
  // router obj provides us with data and methods we can call
  // E.g. programmatic navigation or values encoded in the URL
  const router = useRouter();
  // extract the entered path value in our dynamic route.
  const newsId = router.query.newsId;
  console.log(newsId);

  // we could...
  // send a request to the backend API
  // to fetch the news item with newsId
  // (this is covered in later sections)

  return <h1>The Detail Page</h1>;
};

export default DetailPage;
