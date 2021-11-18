import { useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  // Similar to useLocation but has more info about the currently loaded route. Not just with the URL but some internally managed data React Router is aware of.

  // After logging 'match' we receive an object with:
  // The params - {quoteId: "q2"}
  // The path we defined for React Router - "/quotes/:quoteId"
  // The url itself - "/quote/q2"

  // retrieve quote ID from the url parameter
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      {/* show nested route if we can't see comments */}
      <Route exact path={match.path}>
        <div className="centered">
          <Link className="btn" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      {/* We could use a concrete value "/quotes/:quoteId/comments"> */}
      {/* However if we decided to change the path name at a later date, we would need to manually change all instances which is cumbersome. */}
      {/* We can instead add dynamic path value as such: */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
