import axios from "axios";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

//  TYPES
import { RootState } from "./types/Slices";
import {
  setArtists,
  setCategories,
  setLatestEvents,
  setNearByEvents,
  setThisMonthEvent,
  setUpComingEvent,
} from "./slices/EventSlice";

//  SLICES
import { toggleDataFetchFromBackend } from "./slices/AppMechanics";

const App: FC = () => {
  const dispatch = useDispatch();

  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;
  const isDataFetchedFromBackend = useSelector(
    (state: RootState) => state.AppMechanics.value.isDataFetchedFromBackend
  );

  useEffect(() => {
    if (!isDataFetchedFromBackend && BASEURL) {
      (async () => {
        try {
          const resp = await axios({
            url: `${BASEURL}/home-data`,
            method: "GET",
          });
          if (resp.status === 200) {
            const data = resp.data;
            dispatch(setCategories(data?.eventCategories));
            dispatch(setArtists(data?.artists));
            dispatch(setLatestEvents(data?.last10Events));
            dispatch(setNearByEvents(data?.nearByEvents));
            dispatch(setUpComingEvent(data?.upcomingEvents));
            dispatch(setThisMonthEvent(data?.eventsThisMonth));
            dispatch(toggleDataFetchFromBackend(true));
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [BASEURL, dispatch, isDataFetchedFromBackend]);

  return <Outlet />;
};

export default App;
