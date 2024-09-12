/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

//  TYPES
import { TCategory, TEvent, TUser } from "../types/Slices";

export const EventSlice = createSlice({
  name: "EventSlice",
  initialState: {
    value: {
      trendingEvents: [] as Array<TEvent>,
      latestEvents: [] as Array<TEvent>,
      nearByEvents: [] as Array<TEvent>,
      upComingEvents: [] as Array<TEvent>,
      thisMonthEvents: [] as Array<TEvent>,
      categories: [] as Array<TCategory>,
      artists: [] as Array<TUser>,
      selectedEvent: {} as TEvent,
      searchedEvents: [] as Array<TEvent>,
    },
  },
  reducers: {
    setSearchedEvents: (state, action) => {
      state.value.searchedEvents = [...action.payload];
    },
    setNearByEvents: (state, action) => {
      state.value.nearByEvents = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.value.selectedEvent = structuredClone(action.payload);
    },    
    setUpComingEvent: (state, action) => {
      state.value.upComingEvents = action.payload;
    },
    setThisMonthEvent: (state, action) => {
      state.value.thisMonthEvents = action.payload;
    },
    setTrendingEvents: (state, action) => {
      state.value.trendingEvents = action.payload;
    },
    setLatestEvents: (state, action) => {
      state.value.latestEvents = action.payload;
    },
    setCategories: (state, action) => {
      state.value.categories = action.payload;
    },
    setArtists: (state, action) => {
      state.value.artists = action.payload;
    },
  },
});

export const {
  setSearchedEvents,
  setThisMonthEvent,
  setUpComingEvent,
  setSelectedEvent,
  setNearByEvents,
  setTrendingEvents,
  setLatestEvents,
  setCategories,
  setArtists,
} = EventSlice.actions;
