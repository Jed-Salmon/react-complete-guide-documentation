// still can use NavLink in v6 but the way we use it has changed
import { NavLink } from "react-router-dom";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* In v6 the activeClassName prop was removed */}
            {/* Instead we must manually find out if the link is active or not. */}
            {/* We can use the 'className' or 'style' prop, which work in a special way when applied to NavLink */}
            {/* It takes a function which will provide us with some information about the link and current state of navigation. */}
            {/* The argument (navData) is provided by React Router to this function when it is executed. And this function will be executed by React Router when it evaluates NavLink and whenever your navigation changes. */}
            {/* Inside this navData object, you can find an isActive property which will be true if this link is active for the currently chosen path. Using this boolean value, we can conditionally return a class dynamically. */}
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/welcome"
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
