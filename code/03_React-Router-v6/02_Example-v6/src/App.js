// Notes from previous App.js have been cleared.
// To read visit - 01_example-v6 ~ App.js

// Navigate has replaced the Redirect and useHistory
import { Route, Routes, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          {/* Navigate component is used in the element prop */}
          <Route path="/" element={<Navigate replace to="/welcome" />} />
          {/* by default (without 'replace') Navigate pushes onto the stack. A true redirect requires the 'replace' prop. */}

          <Route path="/welcome" element={<Welcome />}>
            {/* nested route (new-user) is relative to parents path (/welcome) */}
            {/* This keeps our nested route paths shorter and we don't need to repeat the entire full path each time. Allows us to focus on the path elements that differ and are relevant for identifying the route. */}
            <Route path="new-user" element={<p>Welcome, new user!</p>}></Route>
            {/* rather than creating nested routes inside components (Welcome.js), we can instead define our nested child route within the parent Route. */}
          </Route>

          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
