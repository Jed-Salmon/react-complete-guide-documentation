import "../styles/globals.css";
import Layout from "../components/layout/Layout";
// special file that acts as a route component NextJS renders

// receives props which are passed automatically by NextJS
function MyApp({ Component, pageProps }) {
  // component is a prop that holds the page contents that should be rendered.
  // page props are specific props our pages may get.
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
