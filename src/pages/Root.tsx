import { useRef } from "react";
import { useSelector } from "react-redux";

//  PAGES
import CarouselPage from "./CarouselPage";
import EventsPage from "./EventsPage";
import GetInTouch from "./GetInTouch";
import QandA from "./QandA";

//  COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";

//  MODALS
import AuthModal from "../components/Modals/AuthModal";
import CitiesModal from "../components/Modals/CitiesModal";
import Profile from "../components/Modals/Profile";
import DeleteAccount from "../components/Modals/DeleteAccount";
import LogoutModal from "../components/Modals/LogoutModal";
import Notifications from "../components/Modals/Notifications";
import ResetPassword from "../components/Modals/ResetPassword";
import NewPassword from "../components/Modals/NewPassword";

//  TYPES
import { RootState } from "../types/Slices";

const Root = () => {
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

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative flex flex-col items-center w-screen h-auto overflow-y-scroll">
      <Navbar ModalRef={ref} />
      {searchBarState && <Searchbar />}
      {profileModalState && <Profile />}
      <CarouselPage />
      <EventsPage />
      <GetInTouch />
      <QandA />
      <Footer />
      {modalState && <AuthModal ref={ref} />}
      {cityModalState && <CitiesModal />}
      {deleteAccountModalState && <DeleteAccount />}
      {logoutModalState && <LogoutModal />}
      {notificationsModalState && <Notifications />}
      {resetPasswordModalState && <ResetPassword />}
      {newPasswordModalState && <NewPassword />}
    </div>
  );
};

export default Root;
