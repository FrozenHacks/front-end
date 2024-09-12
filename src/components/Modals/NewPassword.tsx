import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//  COMPONENT
import { IoClose, IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

//  SLICES
import { toggleNewPasswordModal } from "../../slices/AppMechanics";

const NewPassword = () => {
  const dispatch = useDispatch();
  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [hidden, setHidden] = useState({
    password: true,
    confirmPassword: true,
  });
  const [password, setPasword] = useState({
    password: "",
    confirmPassword: "",
  });

  const resetPassword = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const resp = await axios({
        url: `${BASEURL}`,
        method: "",
        headers: {},
        data: {},
      });
      if (resp.status === 200) {
        //  TBD
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //! Remove sm:hidden after the close button of model is working
    <div className="top-60 absolute m-auto w-[400px] h-fit bg-white z-50 rounded-[16px] flex flex-col items-center px-6 py-6 max-sm:hidden">
      <div className="top-6 right-6 absolute flex items-center justify-end w-full">
        <button onClick={() => dispatch(toggleNewPasswordModal(false))}>
          <IoClose className="text-lg" />
        </button>
      </div>
      <img
        src="/icons/newPassword.gif"
        alt="New Password"
        className="object-fit w-28 h-28 mt-1"
      />
      <h2 className="text-3xl">Reset Password</h2>
      <p className="mt-2 text-sm font-light text-gray-500">
        Please a new password with min of 8 chars, containing digits and special
        characters
      </p>

      <p className="mt-4 text-[13px] text-start w-full font-light text-gray-500">
        Enter password details
      </p>

      {/* PASSWORD */}
      <div className="flex rounded-md mt-2 items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
        <div className="shrink-0 relative flex items-center w-full gap-4 px-2">
          <CiLock className="text-2xl font-semibold text-black" />
          <input
            type={!hidden.password ? "text" : "password"}
            value={password.password}
            placeholder="Password"
            className="w-full px-2 border-none outline-none"
            onChange={(e) =>
              setPasword((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <button
            onClick={() =>
              setHidden((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
          >
            {hidden.password ? (
              <IoEyeOff className="text-[#808080] text-xl" />
            ) : (
              <IoEyeSharp className="text-[#808080] text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="flex rounded-md mt-4 items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
        <div className="shrink-0 relative flex items-center w-full gap-4 px-2">
          <CiLock className="text-2xl font-semibold text-black" />
          <input
            type={!hidden.confirmPassword ? "text" : "password"}
            value={password.confirmPassword}
            placeholder="Confirm Password"
            className="w-full px-2 border-none outline-none"
            onChange={(e) =>
              setPasword((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <button
            onClick={() =>
              setHidden((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
          >
            {hidden.confirmPassword ? (
              <IoEyeOff className="text-[#808080] text-xl" />
            ) : (
              <IoEyeSharp className="text-[#808080] text-xl" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-shrink-0 w-full mt-5">
        <button
          onClick={resetPassword}
          className="text-white hover:text-website-purple hover:bg-white hover:border-website-purple transition-all ease-in-out duration-200 bg-website-purple font-medium border-2 border-website-purple rounded-lg w-[120px] h-[40px] text-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
