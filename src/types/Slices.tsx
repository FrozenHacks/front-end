export type RootState = {
  AppMechanics: AppMechanics;
  EventSlice: EventSlice;
  UserSlice: UserSlice;
};

export type AppMechanics = {
  value: {
    isSignInModalVisible: boolean;
    isSignUpModalVisible: boolean;
    isModalVisible: boolean;
    isCitiesModalVisible: boolean;
    isSearchBarVisible: boolean;
    isProfileModalVisible: boolean;
    isDeleteAccountModalVisible: boolean;
    isLogoutModalVisible: boolean;
    isNotificationsModalVisible: boolean;
    isDataFetchedFromBackend: boolean;
    isResetPasswordModalVisible: boolean;
    isNewPasswordModalVisible: boolean;
    isOtpModalVisible: boolean;
  };
};

export type EventSlice = {
  value: {
    trendingEvents: Array<TEvent>;
    latestEvents: Array<TEvent>;
    selectedEvent: TEvent;
    nearByEvents: Array<TEvent>;
    upComingEvents: Array<TEvent>;
    thisMonthEvents: Array<TEvent>;
    categories: Array<TCategory>;
    artists: Array<TUser>;
    searchedEvents: Array<TEvent>;
  };
};

export type UserSlice = {
  value: {
    userDetails: TUser;
  };
};

export type TPricing = {
  _id: string;
  title: string;
  desc: string;
  amount: number;
  status: string;
  available_tickets: number;
  tickets_sold: number;
  created_at: string;
};

export type TEvent = {
  _id: string;
  title: string;
  desc: string;
  rating: { $numberDecimal: string };
  status: string;
  start_date: string;
  end_date: string;
  start_time: string;
  pricing: TPricing[];
  end_time: string;
  city: string;
  address: string;
  organizer: TUser;
  notes: string;
  approved: boolean;
  payout_status: string;
  images: {
    _id: string;
    img: string;
    event: string;
    created_at: string;
    __v: string;
  }[];
  commission: number
  tax: number
};

export type TFAQ = {
  id: number;
  store_id: number;
  question: string;
  answer: string;
  status: number;
};

export type TTicket = {
  id: number;
  uid: number;
  eid: number;
  sponsore_id: number;
  typeid: number;
  type: string;
  price: number;
  subtotal: number;
  cou_amt: number;
  total_ticket: number;
  tax: number;
  wall_amt: number;
  p_method_id: number;
  transaction_id: string;
  ticket_type: "Booked" | "Cancelled" | "Completed";
  cancle_comment: string;
  total_start: number;
  review_comment: string;
  is_review: number;
  commission: number;
  book_time: string;
  is_verify: number;
};

export type TUser = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  profile_pic: string;
  background_pic: string;
  category: string;
  verified: boolean;
  status: string;
  otp: string | null;
  created_at: string;
  __v: number;
};

export type TCategory = {
  id: number;
  name: string;
  event: string[];
  img: string;
  decommissioned: boolean;
  created_at: string;
  __v: number;
};

export type TCover = {
  id: number;
  eid: number;
  sponsore_id: number;
  img: string;
  status: number;
};
