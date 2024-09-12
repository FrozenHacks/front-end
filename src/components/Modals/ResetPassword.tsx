import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//  COMPONENT
import { IoClose } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";

//  SLICES
import { toggleResetPasswordModal } from "../../slices/AppMechanics";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [phone, setPhone] = useState("");

  const getOtp = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const resp = await axios({
        url: `${BASEURL}/SMS/send.php`,
        method: "POST",
        headers: {},
        data: {
          phone_number: phone,
          ccode: "+91",
        },
      });
      if (resp.status === 200) {
        //  TBD
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-60 absolute m-auto w-[400px] h-fit bg-white z-50 rounded-[16px] flex flex-col items-center px-6 py-6">
      <div className="top-6 right-6 absolute flex items-center justify-end w-full">
        <button onClick={() => dispatch(toggleResetPasswordModal(false))}>
          <IoClose className="text-lg" />
        </button>
      </div>
      <img
        src="/icons/resetPassword.gif"
        alt="Delete"
        className="object-fit w-28 h-28 mt-1"
      />
      <h2 className="text-3xl">Reset Password</h2>
      <p className="mt-2 text-sm font-light text-gray-500">
        Please enter the registered mobile number to reset the password
      </p>

      <div className="flex mt-6 rounded-md items-center px-4 h-[44px] border-[#808080] border-[0.5px]">
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
          value={phone}
          type="text"
          maxLength={10}
          placeholder="Enter your Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center flex-shrink-0 w-full mt-5">
        <button
          onClick={getOtp}
          className="text-white hover:text-website-purple hover:bg-white hover:border-website-purple transition-all ease-in-out duration-200 bg-website-purple font-medium border-2 border-website-purple rounded-lg w-[120px] h-[40px] text-center"
        >
          Get OTP
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
