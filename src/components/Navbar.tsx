import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//  COMPONENTS
import { IoSearchSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
// import { FaAngleDown } from "react-icons/fa6";

//  SLICES
import {
  toggleCitiesModalState,
  toggleModalState,
  toggleProfileModalState,
  toggleSearchBarState,
  toggleSignInModalState,
} from "../slices/AppMechanics";

//  TYPES
import { RootState } from "../types/Slices";
import { TNavbar } from "../types/Components";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const Navbar = ({ ModalRef }: TNavbar) => {
  const [isopen, setIsOpen] = useState(false);

  const toggleview = () => {
    setIsOpen((pre) => !pre);
  };
  console.log(isopen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const modalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isModalVisible
  );
  const signInModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSignInModalVisible
  );
  const searchBarState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSearchBarVisible
  );
  // const userDetails = useSelector(
  //   (state: RootState) => state.UserSlice.value.userDetails
  // );

  let userDetails: any = {}
  const user = window.sessionStorage.getItem('userDetails') ?? ''
  if(user){
    userDetails = JSON.parse(user) ?? {}
  }
  
  const signIn = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      dispatch(toggleModalState(!modalState));
      dispatch(toggleSignInModalState(!signInModalState));
      if (ModalRef.current) {
        ModalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const profileSidebar = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      dispatch(toggleProfileModalState(userDetails));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isopen ? (
        <div className="bg-white/30 top-4 backdrop-blur-md fixed z-50 flex items-center justify-between w-full h-16 max-w-screen-lg px-6 py-4 mx-auto rounded-full">
          <div className="sm:gap-12 flex items-center justify-between gap-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <div className="sm:w-10 sm:h-10 w-5 h-5 bg-white rounded-full"></div>
              <p className="text-website-offwhite sm:text-2xl text-base font-normal">
                Bukit
              </p>
            </button>
            <div className="sm:flex hidden gap-6">
              <button
                onClick={() => navigate("/events")}
                className={`${
                  location === "/events"
                    ? "text-website-purple-dark"
                    : "text-white"
                } text-base`}
              >
                Events
              </button>
              <button
                className={`${
                  location === "/contact-us"
                    ? "text-website-purple-dark"
                    : "text-white"
                } text-base`}
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleSearchBarState(!searchBarState))}
              className="sm:flex hidden"
            >
              <IoSearchSharp className="text-xl font-extrabold text-white" />
            </button>
            <button
              // onClick={() => dispatch(toggleCitiesModalState(true))}
              className="hover:bg-white/20 sm:gap-2 flex items-center gap-1 px-2 py-1 transition-all duration-700 ease-in-out rounded-full"
            >
              <MdLocationOn className="text-xl text-white" />
              <p className="sm:block hidden text-base text-white">Singapore</p>
              {/* <FaAngleDown className="text-white" /> */}
            </button>
            {Object.keys(userDetails).length == 0 ? (
              <button
                onClick={signIn}
                className="sm:flex bg-website-purple items-center justify-center hidden px-4 py-2 rounded-md"
              >
                <p className="font-normal text-white">Sign In </p>
              </button>
            ) : (
              <button onClick={profileSidebar}>
                <img
                  src={userDetails?.profile_pic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </button>
            )}

            <div className="sm:hidden" onClick={toggleview}>
              <GiHamburgerMenu color="white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/30 backdrop-blur-md fixed top-0 z-50 flex flex-col w-full h-full">
          <div className="flex items-center justify-between mx-4 mt-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <p className="text-website-offwhite text-xl font-normal tracking-wide">
                Bukit
              </p>
            </button>
            <button onClick={toggleview}>
              <GrClose color="white" />
            </button>
          </div>

          <div className="flex flex-col gap-5 mx-4 mt-10">
            <button
              onClick={() => navigate("/events")}
              className={`${
                location === "/events"
                  ? "text-website-purple-dark"
                  : "text-white"
              } text-base rounded-full hover:bg-white/20`}
            >
              Events
            </button>
            <button
              className={`${
                location === "/contact-us"
                  ? "text-website-purple-dark"
                  : "text-white"
              } text-base rounded-full hover:bg-white/20 `}
            >
              Contact Us
            </button>
            <button
              onClick={() => dispatch(toggleCitiesModalState(true))}
              className="hover:bg-white/20 rounded-full"
            >
              <p className="text-base text-white">Chennai</p>
            </button>
            <button className="hover:bg-white/20 text-white rounded-full">
              Search
            </button>
            {!userDetails ? (
              <button
                onClick={signIn}
                className="hover:bg-white/20 text-white rounded-full"
              >
                Sign In
              </button>
            ) : (
              <button>
                <img
                  src={userDetails.profile_pic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;