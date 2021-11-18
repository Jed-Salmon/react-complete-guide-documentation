import { Route, Switch, Redirect } from "react-router";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/quotes" />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route exact path="/quotes">
            <AllQuotes />
          </Route>
          {/* regular parameters are mandatory, i.e QuoteDetail is only loaded only if we have quoteId param in URL */}
          {/* Query parameters (see QuoteList.js) are optional */}
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          {/* Asterisk defines a catch all route */}
          {/* Comes last so it does not consume other routes */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
