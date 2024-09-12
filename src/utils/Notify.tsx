import toast from "react-hot-toast";

export const notify = (msg: string, type?: "success" | "error") => {
  if (type == "success") {
    toast.success(msg);
  } else if (type == "error") {
    toast.error(msg);
  } else {
    toast(msg);
  }
};
