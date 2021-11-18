// import Routes instead of switch
import { Route, Routes } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        {/* Switch is replaced with 'Routes' */}
        <Routes>
          {/* The way we define our route has changed */}
          {/* In v6 we provide an element prop with the JSX component element we want that route to render */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          {/* In addition to the above changes, there are internal changes made to React Router version 6, specifically the logic for evaluating paths. */}
          {/* Before in version 5 we needed to use the 'exact' prop, as without it paths would match based on their starting value (i.e. /products). */}
          {/* With version 6, React Router always looks for exact matches. */}

          {/* To perform the same behavior as Router version 5, we can append an asterisk to the end of the route as such: 
          <Route path="/products/*" ... />
          */}
          {/* To note, if you do add the asterisk and go into productDetails, you will still get the productDetails route. Router v6 uses an improved algorithm for picking the most appropriate route. It will identify that if your path is /products/something, the best fit for this path is the route on line 20, because we explicitly declared /products/something means ProductDetail. */}
          {/* Unlike version 5 the order of routes no longer matters */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
