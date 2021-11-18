import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
// 'pages' folder holds components that are loaded by the router.
// Makes it easier to identify which kind of components these are.

function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          {/* Switch makes sure only one route can be active at the same time. */}
          <Route exact path="/">
            <Redirect to="/welcome" />
            {/* When rendered redirect somewhere else */}
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          {/* The exact prop tells React router that this should only lead to a match if the entire path matches. */}
          <Route exact path="/products">
            <Products />
          </Route>
          {/* Without exact prop, both 'products' & 'productDetails' or the redirect would be rendered because by default with React router, matching just means your path starts with the path defined. */}
          <Route path="/products/:productId">
            {/* /: creates dynamic path segment (parameter) */}
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

// note - We can have multiple dynamic segments
// <Route path="/product-detail/:productId/:anotherId">

export default App;
