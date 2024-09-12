import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//  COMPONENTS
import { IoClose } from "react-icons/io5";

//  SLICES
import { toggleDeleteAccountModalState } from "../../slices/AppMechanics";
import { RootState } from "../../types/Slices";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const uid = useSelector(
    (state: RootState) => state.UserSlice.value.userDetails._id
  );

  const deleteAcc = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();

      const resp = await axios({
        url: `${BASEURL}/user_api/acc_delete.php`,
        method: "POST",
        data: {
          uid,
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
    <div className="top-60 absolute m-auto w-[350px] h-fit bg-white z-50 rounded-[16px] flex flex-col items-center px-6 py-6">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl">Delete Account</h3>
        <button onClick={() => dispatch(toggleDeleteAccountModalState(false))}>
          <IoClose className="text-lg" />
        </button>
      </div>
      <img
        src="/icons/delete.png"
        alt="Delete"
        className="object-fit w-28 h-28 mt-1"
      />
      <p className="text-sm font-light text-gray-500">
        Are you sure you want to delete the account?
      </p>
      <div className="flex items-center justify-between flex-shrink-0 w-full mt-5">
        <button
          onClick={deleteAcc}
          className="text-website-purple hover:text-white hover:bg-website-purple transition-all ease-in-out duration-200 font-medium border-2 border-website-purple rounded-lg w-[120px] h-[40px] text-center"
        >
          Delete
        </button>
        <button
          onClick={() => dispatch(toggleDeleteAccountModalState(false))}
          className="text-white hover:text-website-purple hover:bg-white hover:border-website-purple transition-all ease-in-out duration-200 bg-website-purple font-medium border-2 border-website-purple rounded-lg w-[120px] h-[40px] text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
