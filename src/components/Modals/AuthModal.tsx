import { forwardRef } from "react";
import { useSelector } from "react-redux";

//  COMPONENTS
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Otp from "./Otp";

//  TYPES
import { RootState } from "../../types/Slices";

interface AuthModalProps {}

const AuthModal = forwardRef<HTMLDivElement, AuthModalProps>((_, ref) => {
  const signInModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSignInModalVisible
  );
  const signUpModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSignUpModalVisible
  );
  const otpModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isOtpModalVisible
  );

  return (
    <div
      ref={ref}
      className="top-60 absolute m-auto w-[700px] h-fit bg-white z-50 rounded-[20px] flex flex-col items-center px-6 py-6"
    >
      {signInModalState && <SignIn />}
      {signUpModalState && <SignUp />}
      {otpModalState && <Otp />}
    </div>
  );
});

export default AuthModal;
