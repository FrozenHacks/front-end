import { createBrowserRouter } from "react-router-dom";

//  COMPONENTS
import App from "../App";

//  PAGES
import Root from "../pages/Root";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import EventBooking from "../pages/EventBooking";
import ProfilePageHistory from "../pages/ProfilePageHistory";
// import ProtectedRoute from "./ProtectedRoute";

const CustomRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/user/history",
        element: <ProfilePageHistory />,
      },
      {
        path: "/event/details",
        element: <EventDetails />,
      },
      {
        path: "/event/booking",
        element: <EventBooking />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },
]);

export default CustomRouter;