// Import React and Suspense for code splitting
import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";

// When importing normal components, they are loaded in advance
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// instead we can implement lazy loading
// this only loads the import when its needed/accessed
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
// React.lazy expects a function.
// we call import as a function and pass it the path.

const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <div>
      <Layout>
        {/* It takes time to download resources so React expects a fallback UI content to display whilst it downloads and displays the component we set to lazy load. For this we wrap Suspense around the code we use React.lazy and pass it a fallback JSX element/s. */}
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
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
            <Route path="/quotes/:quoteId">
              <QuoteDetail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

// For deploying the app we used firebase hosting, to recap watch from: 3:38 -
// https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25600992

// FYI - Git Bash & Powershell did not work, whereas Node and CMD did work with the firebase setup.
// To update a deployed site repeat 'npm run build' and then 'firebase deploy' to re-deploy.

// Live URL - https://react-router-course-project.web.app

export default App;
