import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
// useHistory changes the URL and therefor add query parameters.
// useLocation returns an obj with info for current loaded page.
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  // history.location is mutable whereas the location obj is not

  // URLSearchParams is a default constructor function built into the browser.
  const queryParams = new URLSearchParams(location.search);
  // Translates into an object where we can extract our query parameters by key:
  // {sort: asc} - more convenient way of extracting data from the query parameters.
  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // push re-renders the component
    history.push(
      `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    );

    // Alternatively we can pass an object describing the destination a link or programmatic navigation should lead to:
    history.push({
      // first key is the path you want to navigate to:
      pathname: location.pathname,
      // Second search key wants a string where we construct our query parameters:
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    // optional approach but for more complex URL's can be more readable.
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
