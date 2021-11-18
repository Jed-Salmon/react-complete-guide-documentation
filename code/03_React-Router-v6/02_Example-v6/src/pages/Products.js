// Link remains the same in version 6
import { Link, useNavigate } from "react-router-dom";
// useNavigate replaces useHistory
const Products = () => {
  // navigate programmatically
  // (usually in useEffect or when an http request has finished)
  const navigate = useNavigate();
  navigate("/welcome", { replace: true });
  // replace redirects instead of pushing the new route

  // Instead of passing a path we can also navigate like this:
  navigate(-1); // go back to the previous page
  navigate(1); // go forward to the next page
  navigate(-2); // go back two previous pages

  return (
    <section>
      <h1>The Products Page</h1>
      <ul>
        <li>
          <Link to="/products/p1">A Book</Link>
        </li>
        <li>
          <Link to="/products/p2">A Carpet</Link>
        </li>
        <li>
          <Link to="/products/p3">An Online Course</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
