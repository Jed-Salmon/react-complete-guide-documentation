// our-domain/news
// the file name will be used as a path name

// import Link component from next/link
import Link from "next/link";
// Like with Link from React Router, it allows us to navigate through our app without causing a webpage reload. We stay in a SPA instead of fetching a new HTML page from the server.
// It will load the to be loaded component for you and change the URL so that it looks like you changed the page whilst in reality, you stay in that single page application.

const NewsPage = () => {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        <Link href="/news/nextjs-is-awesome">
          <li>NextJS Is Awesome</li>
        </Link>
        <li>Fullstack here we come</li>
      </ul>
    </>
  );
};

export default NewsPage;
