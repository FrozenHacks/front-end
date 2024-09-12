import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//  COMPONENTS
import { TbEdit } from "react-icons/tb";
import { MdOutlinePayments, MdDelete } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
// import { BiSolidCoupon } from "react-icons/bi";
import {
  IoDocumentText,
  IoLogOutOutline,
  IoClose,
} from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

//  SLICES
import {
  toggleDeleteAccountModalState,
  toggleLogoutModalState,
  toggleProfileModalState,
} from "../../slices/AppMechanics";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../types/Slices";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const userDetails = useSelector(
    (state: RootState) => state.UserSlice.value.userDetails
  );

  const fetchBookingHistory = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      navigate('/user/history')
      // const resp = await axios({
      //   url: `${BASEURL}/user_api/ticket_status_wise.php`,
      //   method: "GET",
      //   headers: {},
      //   data: {
      //     uid: "", // * USER ID
      //     status: "Active",
      //   },
      // });

      // if (resp.status === 200) {
      //   //  TBD
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const resp = await axios({
        url: `${BASEURL}/user_api/notification.php`,
        method: "GET",
        headers: {},
        data: {
          uid: "",
        },
      });

      if (resp.status === 200) {
        //  TBD
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateTo = (e: React.MouseEvent, location: string) => {
    try {
      e.preventDefault();
      dispatch(toggleProfileModalState(false));
      navigate(location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 flex flex-col bg-white h-[200vh] lg:w-[35%] xl:w-3/12 z-50 right-0">
      <div className="h-52 relative flex items-center justify-center w-full">
        <img
          src={userDetails?.background_pic || ""}
          alt={userDetails.first_name}
          className="absolute top-0 left-0 object-cover w-full h-full"
        />
        <div className="opacity-40 bg-black/50 absolute inset-0 z-10"></div>
        <div className="z-10 flex flex-col items-center gap-2">
          <div className="relative">
            <img
              src={userDetails?.profile_pic || ""}
              alt={userDetails.first_name}
              className="object-cover w-24 h-24 rounded-full"
            />
            <button className="absolute bottom-2 right-1 hover:bg-website-purple transition-all ease-in-out duration-200 z-20 p-1.5 flex items-center justify-center bg-white rounded-full">
              <TbEdit className="text-website-purple-dark" />
            </button>
          </div>
          <h5 className="text-white bg-white/20 px-1.5 rounded">
            {userDetails.first_name + " " + userDetails.last_name}
          </h5>
        </div>
        <button
          onClick={() => dispatch(toggleProfileModalState(false))}
          className="top-4 right-4 absolute z-20 p-1 bg-white rounded-full"
        >
          <IoClose />
        </button>
      </div>

      <div className="h-fit flex flex-col w-full px-4 mt-5">
        {/* ACCOUNT INFO */}
        {/* <div className="flex flex-col">
          <h5 className="text-website-purple font-medium">Account Info</h5>
          <div className="flex flex-col gap-1 mt-2">
            <button className="relative flex items-center gap-2 py-2 border-b border-gray-300">
              <MdEmail className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Email</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button className="relative flex items-center gap-2 py-2 border-b border-gray-300">
              <MdLocalPhone className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Phone</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button className="relative flex items-center gap-2 py-2 border-b border-gray-300">
              <MdLock className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Reset Password</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
          </div>
        </div> */}

        {/* EVENTS */}
        <div className="flex flex-col mt-5">
          <h5 className="text-website-purple font-medium">Events</h5>
          <div className="flex flex-col gap-1 mt-2">
            <button
              onClick={fetchBookingHistory}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <RiHistoryFill className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">
                Booking History
              </p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button className="relative flex items-center gap-2 py-2 border-b border-gray-300">
              <MdOutlinePayments className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Payments</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button
              onClick={fetchNotifications}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <IoIosNotifications className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Notifications</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            {/* <button
              onClick={fetchFavoriteEvents}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <IoMdHeartEmpty className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Favourites</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button> */}
            {/* <button
              onClick={fetchCoupons}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <BiSolidCoupon className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Coupons</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button> */}
          </div>
        </div>

        {/* GENERAL */}
        <div className="flex flex-col mt-5">
          <h5 className="text-website-purple font-medium">General</h5>
          <div className="flex flex-col gap-1 mt-2">
            {/* <button className="relative flex items-center gap-2 py-2 border-b border-gray-300">
              <IoLanguage className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Language</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button> */}
            <button
              onClick={(e) => navigateTo(e, "/terms-and-conditions")}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <IoDocumentText className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">
                Terms and Conditions
              </p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button
              onClick={(e) => navigateTo(e, "/privacy-policy")}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <HiOutlineClipboardDocumentList className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Privacy Policy</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button
              onClick={() => {
                dispatch(toggleDeleteAccountModalState(true));
                dispatch(toggleProfileModalState(false));
              }}
              className="relative flex items-center gap-2 py-2 border-b border-gray-300"
            >
              <MdDelete className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Delete Account</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
            <button className="relative flex items-center gap-2 py-2 border-b border-gray-300" onClick={() => {
                dispatch(toggleLogoutModalState(true));
              }}>
              <IoLogOutOutline className="text-gray-700" />
              <p className="text-sm font-light text-gray-700">Logout</p>
              <FaChevronRight className="absolute right-0 text-[12px] text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
