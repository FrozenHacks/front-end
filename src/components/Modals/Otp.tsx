import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../slices/UserSlice";
import { toggleModalState } from "../../slices/AppMechanics";

const Otp = () => {
  const phone = 9988000099;
  const dispatch = useDispatch();

  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const sendOTP = async (e: React.MouseEvent) => {
    try {
      const phone = window.sessionStorage.getItem("phone");
      const otpString = Object.values(otp).join("");
      e.preventDefault();
      const resp = await axios({
        url: `${BASEURL}/users/verify-otp`,
        method: "POST",
        headers: {},
        data: {
          otp: parseInt(otpString),
          phone,
        },
      });
      if (resp.status === 200) {
        dispatch(setUserDetails(resp.data.userDetails));
        dispatch(toggleModalState(false));
        window.sessionStorage.setItem("token", resp.data.token);
        window.sessionStorage.setItem("userDetails", JSON.stringify(resp.data.userDetails));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  ! THERE IS NO <ENDPOINT></ENDPOINT> FOR THIS IG JUST USE THE SENDOTP
  const resendOtp = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const resp = await axios({
        method: "POST",
        headers: {},
        data: {},
      });
      if (resp.status == 200) {
        //  TBD
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-8 px-2 py-8">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/otp.gif"
          alt="OTP"
          className="w-[120px] h-[120px] rounded-full object-cover"
        />
        <h2 className="text-3xl font-medium">Enter OTP</h2>
        <p className="text-sm">
          Please enter the OTP sent to +91{" "}
          {phone.toString().replace(/^\d{6}/, "******")}
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-5">
          {new Array(6).fill(null).map((_, index) => {
            return (
              <input
                required
                key={index}
                inputMode="numeric"
                maxLength={1}
                type="number"
                className="border-[#808080]/70 text-center rounded-lg w-16 h-16 border-[0.5px] no-spinners"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.slice(0, 1);
                }}
                onChange={(e) => {
                  if (e.target.value.length > 1) return;
                  const numb = parseInt(e.target.value) || 0;
                  setOtp((prev) => ({
                    ...prev,
                    [index]: numb,
                  }));
                }}
              />
            );
          })}
        </div>
        <span className="text-sm">
          Do not press the back or refresh button, if OTP is not received in 60
          seconds, click{" "}
          <button
            onClick={resendOtp}
            className="text-website-purple font-medium"
          >
            Resend OTP
          </button>
        </span>
      </div>
      <button
        onClick={sendOTP}
        className="w-[120px] text-center h-[40px] rounded-lg bg-website-purple text-xl text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default Otp;
