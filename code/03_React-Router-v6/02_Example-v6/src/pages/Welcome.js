// Outlet is used to tell react router where our nested content should be inserted
import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      {/* Links 'to' prop is also relative if used within a nested route */}
      {/* No longer need custom path resolving (match.url) */}
      <Link to="new-user">New User</Link>
      {/* Outlet is a placeholder telling React Router where nested route content should be inserted/appear. (<p>Welcome, new user!</p>) */}
      <Outlet />
    </section>
  );
};

/*
  We can keep our nested route inside this component however, with version six we must wrap our Route with Routes as such:

  const Welcome = () => {
  return (
      <section>
        <h1>The Welcome Page</h1>
        <Routes>
          // path must be relative (exclude /welcome/)
          <Route path="/new-user" element={<p>...</p>} />
        </Routes>
      </section>
    );
  };

  With this method, we need to append an asterisk (*) to the welcome path in App.js:
  <Route path="/welcome/*" element={<Welcome />}>
*/

export default Welcome;
