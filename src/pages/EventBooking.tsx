import { useRef } from "react";
import EventbookCard from "../components/EventDetails/EventBookCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { RootState } from "../types/Slices";
import { useSelector } from "react-redux";
import AuthModal from "../components/Modals/AuthModal";
import CitiesModal from "../components/Modals/CitiesModal";
import DeleteAccount from "../components/Modals/DeleteAccount";
import LogoutModal from "../components/Modals/LogoutModal";
import Notifications from "../components/Modals/Notifications";
import ResetPassword from "../components/Modals/ResetPassword";
import NewPassword from "../components/Modals/NewPassword";
import Searchbar from "../components/Searchbar";
import Profile from "../components/Modals/Profile";

const EventBooking = () => {
    const ref = useRef<HTMLDivElement | null>(null);

  

  const modalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isModalVisible
  );
  const cityModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isCitiesModalVisible
  );
  const searchBarState = useSelector(
    (state: RootState) => state.AppMechanics.value.isSearchBarVisible
  );
  const profileModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isProfileModalVisible
  );
  const deleteAccountModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isDeleteAccountModalVisible
  );
  const logoutModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isLogoutModalVisible
  );
  const notificationsModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isNotificationsModalVisible
  );
  const resetPasswordModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isResetPasswordModalVisible
  );
  const newPasswordModalState = useSelector(
    (state: RootState) => state.AppMechanics.value.isNewPasswordModalVisible
  );


  return (
<div className="h-fit relative flex flex-col items-center w-screen overflow-y-auto">
        <Navbar ModalRef={ref} />
        <div className="py-10 bg-website-purple bg-gradient-three-colors-vertical h-fit flex flex-col items-start w-full gap-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
        <div className="opacity-40 absolute inset-0 z-10 bg-black"></div>

        {modalState && <AuthModal ref={ref} />}
        {cityModalState && <CitiesModal />}
        {deleteAccountModalState && <DeleteAccount />}
        {logoutModalState && <LogoutModal />}
        {notificationsModalState && <Notifications />}
        {resetPasswordModalState && <ResetPassword />}
        {newPasswordModalState && <NewPassword />}
        {searchBarState && <Searchbar />}
        {profileModalState && <Profile />}
<EventbookCard />

      
              </div>

     <Footer />
    </div>
  );
};

export default EventBooking;