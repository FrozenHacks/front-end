
import { useDispatch } from "react-redux";

//  COMPONENTS
import { IoClose } from "react-icons/io5";

//  SLICES
import { toggleLogoutModalState, toggleProfileModalState } from "../../slices/AppMechanics";

const LogoutModal = () => {
  const dispatch = useDispatch();

  const logoutAcc = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      window.sessionStorage.clear()
      // const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

      // const resp = await axios({
      //   url: `${BASEURL}/`, // ! DIDNT PROVIDE
      //   method: "POST",
      //   headers: {},
      //   data: {},
      // });
      // if (resp.status === 200) {
      //   //  TBD
      // }
      dispatch(toggleLogoutModalState(false))
      dispatch(toggleProfileModalState(false))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-60 absolute m-auto w-[350px] h-fit bg-white z-50 rounded-[16px] flex flex-col items-center px-6 py-6">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl">Logout</h3>
        <button onClick={() => dispatch(toggleLogoutModalState(false))}>
          <IoClose className="text-lg" />
        </button>
      </div>
      <img
        src="/icons/logout.gif"
        alt="Logout"
        className="object-fit w-28 h-28 mt-1"
      />
      <p className="text-sm font-light text-gray-500">
        Are you sure you want to logout of the site?
      </p>
      <div className="flex items-center justify-between flex-shrink-0 w-full mt-5">
        <button
          onClick={logoutAcc}
          className="text-website-purple hover:text-white hover:bg-website-purple transition-all ease-in-out duration-200 font-medium border-2 border-website-purple rounded-lg w-[120px] h-[40px] text-center"
        >
          Logout
        </button>
        <button
          onClick={() => dispatch(toggleLogoutModalState(false))}
          className="text-white hover:text-website-purple hover:bg-white hover:border-website-purple transition-all ease-in-out duration-200 bg-website-purple font-medium border-2 border-website-purple rounded-lg w-[120px] h-[40px] text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
