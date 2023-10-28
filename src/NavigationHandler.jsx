import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchComponent } from "./slices/pageSlice";

function NavigationHandler() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes("/friends") && !currentPath.includes("/profile")) {
      dispatch(switchComponent("friends"));
    } else if (currentPath.includes("/setting")) {
      dispatch(switchComponent("setting"));
    } else if (
      currentPath.includes("/profile") &&
      !currentPath.includes("/friends")
    ) {
      dispatch(switchComponent("profile"));
    } else if (
      currentPath.includes("/profile") &&
      currentPath.includes("/friends")
    ) {
      dispatch(switchComponent("profileFriends"));
    } else {
      dispatch(switchComponent("newsfeed"));
    }
  }, [dispatch, location]);

  return null;
}

export default NavigationHandler;
