import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//  COMPONENTS
import { IoMdClose } from "react-icons/io";
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { FaCaretDown } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTicket } from "react-icons/io5";

//  SLICES
import {
  toggleModalState,
  toggleSignInModalState,
  toggleSignUpModalState,
} from "../../slices/AppMechanics";

//  TYPES
import { RootState } from "../../types/Slices";

const SignUp = () => {
  const dispatch = useDispatch();

  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;
  
  const signInModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSignInModalVisible
  );
  const signUpModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSignUpModalVisible
  );

  const [userDetails, setUserDetails] = useState({
    phone: "",
    password: "",
    rememberPassword: false,
    fullName: "",
    email: "",
    referalCode: "",
  });
  const [hidden, setHidden] = useState(true);

  const signUpWith = async (e: React.MouseEvent, string?: string) => {
    try {
      e.preventDefault();
      if (string === "Google") {
        //  TODO: USE GOOGLE AUTH
        // AFTER THAN SHAKE HAND WITH BACKEND WITH USER DETAILS
        const resp = await axios({
          url: `${BASEURL}/user_api/u_google_reg.php`,
          method: "POST",
          data: {
            name: "", // GET THAT FROM GOOGLE
            email: "", // GET THAT FROM GOOGLE
          },
        });

        if (resp.status === 200) {
          //  TODO: LOAD THE USER DATA INTO REDUX STATE
          console.log("Signed In with Google:", resp.data);
        }
      } else if (string === "Apple") {
        //  TODO: USE APPLE AUTH
        // AFTER THAN SHAKE HAND WITH BACKEND WITH USER DETAILS
        const resp = await axios({
          url: `${BASEURL}`, // ! MISSING
          method: "POST",
          data: {
            name: "", // GET THAT FROM APPLE
            email: "", // GET THAT FROM APPLE
          },
        });

        if (resp.status === 200) {
          //  TODO: LOAD THE USER DATA INTO REDUX STATE
          console.log("Signed In with Apple:", resp.data);
        }
      } else {
        const resp = await axios({
          url: `${BASEURL}/users/create`,
          method: "POST",
          data: {
            first_name: userDetails.fullName.split(" ")[0],
            last_name: userDetails.fullName.split(" ")[1],
            email: userDetails.email,
            phone: userDetails.phone,
            password: userDetails.password,
          },
        });

        if (resp.status === 200) {
          //  TODO: LOAD THE USER DATA INTO REDUX STATE
          console.log("Signed In with Phone:", resp.data);
          dispatch(toggleSignUpModalState(false));
          dispatch(toggleSignInModalState(true));
        }
      }
      // dispatch(toggleSignInModalState(!signInModalState));
      // dispatch(toggleModalState(!modalState));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="relative flex items-center justify-center w-full">
        <span className="text-3xl font-medium">Signup</span>
        <button
          onClick={() => {
            dispatch(toggleModalState(false));
            dispatch(toggleSignInModalState(false));
            dispatch(toggleSignUpModalState(false));
          }}
          className="absolute right-0"
        >
          <IoMdClose className="text-lg" />
        </button>
      </div>
      <span className="mt-5 text-lg">Create your free account in seconds!</span>

      <div className="flex flex-col items-center gap-5 mt-8">
        <button
          onClick={(e) => signUpWith(e, "Google")}
          className="gap-4 border-[#808080] border-[0.5px] w-[400px] h-[44px] justify-center rounded-md flex items-center"
        >
          <FcGoogle className="text-2xl" />
          <p className="text-lg font-light">Create account using Google</p>
        </button>
        <button
          onClick={(e) => signUpWith(e, "Apple")}
          className="gap-4 border-[#808080] border-[0.5px] w-[400px] h-[44px] justify-center rounded-md flex items-center"
        >
          <GrApple className="text-2xl text-[#A2AAAD]" />
          <p className="text-lg font-light">Create account using Apple</p>
        </button>
      </div>
      <div className="flex items-center w-full gap-8 mt-8">
        <div className="w-full h-[1px] bg-slate-800"></div>
        <p className="">Or</p>
        <div className="w-full h-[1px] bg-slate-800"></div>
      </div>

      <div className="flex flex-col items-start w-full gap-4 mt-4">
        <span>Enter details to Signup</span>

        <form className="flex flex-col w-full gap-4">
          {/* FULL NAME */}
          <div className="flex rounded-md items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
            <div className="shrink-0 relative flex items-center w-full gap-4 px-2">
              <FaUser className="text-lg font-semibold text-[#808080]" />
              <input
                type="text"
                value={userDetails.fullName}
                placeholder="Full Name"
                className="w-full px-2 border-none outline-none"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex rounded-md items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
            <div className="shrink-0 relative flex items-center w-full gap-4 px-2">
              <MdEmail className="text-xl font-semibold text-[#808080]" />
              <input
                type="email"
                value={userDetails.email}
                placeholder="abc@email.com"
                className="w-full px-2 border-none outline-none"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="flex rounded-md items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
            <div className="shrink-0 flex gap-4 px-2">
              <div className="flex border-r-2 pr-2 border-[#808080] gap-2">
                <img
                  src="/icons/india-flag-icon.svg"
                  alt="Flag"
                  className="w-[24px] h-[16px] object-contain"
                />
                <button>
                  <FaCaretDown />
                </button>
              </div>
            </div>
            <span className="w-10">+ 91</span>
            <input
              className="w-full px-2 tracking-wider border-none outline-none"
              value={userDetails.phone}
              type="text"
              placeholder="Enter your Phone Number"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="flex rounded-md items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
            <div className="shrink-0 relative flex items-center w-full gap-4 px-2">
              <CiLock className="text-xl font-semibold text-black" />
              <input
                type={!hidden ? "text" : "password"}
                value={userDetails.password}
                placeholder="Password"
                className="w-full px-2 border-none outline-none"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button onClick={() => setHidden(!hidden)}>
                {hidden ? (
                  <IoEyeOff className="text-[#808080] text-xl" />
                ) : (
                  <IoEyeSharp className="text-[#808080] text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* REFERRAL CODE */}
          <div className="flex rounded-md items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
            <div className="shrink-0 relative flex items-center w-full gap-4 px-2">
              <IoTicket className="text-lg font-semibold text-[#808080]" />
              <input
                type="text"
                value={userDetails.referalCode}
                placeholder="Referral Code (Optional)"
                className="w-full px-2 border-none outline-none"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    referalCode: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="password-cb"
                id="password-cb"
                checked={userDetails.rememberPassword}
                onChange={() =>
                  setUserDetails((prev) => ({
                    ...prev,
                    rememberPassword: !prev.rememberPassword,
                  }))
                }
              />
              <label htmlFor="password-cb">
                By creating an account you agree to our{" "}
                <button className="text-website-purple font-medium">
                  Terms and Conditions
                </button>
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={(e) => signUpWith(e)}
              className="bg-website-purple text-white text-xl flex items-center justify-center w-[120px] h-[40px] rounded-[8px]"
            >
              Signup
            </button>
            <span className="flex items-center gap-1">
              <p>Already have an account?</p>
              <button
                onClick={() => {
                  dispatch(toggleSignInModalState(!signInModalState));
                  dispatch(toggleSignUpModalState(!signUpModalState));
                }}
                className="text-website-purple font-medium"
              >
                Login
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
