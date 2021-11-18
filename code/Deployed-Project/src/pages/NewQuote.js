import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// allows us to change the browser history (pages we visited)
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  // navigate away once the request is completed
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
    // With history.push we add a new page to the stack.
    // Push allows us to go back to the page we were coming from.
    // With .replace, we redirect without the ability to go back.
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
