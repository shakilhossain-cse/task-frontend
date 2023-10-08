import { Routes as Router, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import { RoutePaths } from "../enums/routes";
import AuthLayout from "../components/layouts/AuthLayout";
import UserLayout from "../components/layouts/UserLayout";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Home from "../pages/Home";
import CreateFeed from "../pages/CreateFeed";
import PostDetails from "../pages/PostDetails";

function Routes() {
  return (
    <Router>
      <Route path="/" element={<UserLayout />}>
        <Route path={RoutePaths.Home} element={<Home />} />
        <Route path={`${RoutePaths.PostDetails}/:postId`} element={<PostDetails />} />
        <Route path={RoutePaths.CreateFeed} element={<CreateFeed />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path={RoutePaths.Login} element={<Login />} />
        <Route path={RoutePaths.Register} element={<Register />} />
        <Route path={RoutePaths.ForgetPassword} element={<ForgetPassword />} />
      </Route>
    </Router>
  );
}

export default Routes;
