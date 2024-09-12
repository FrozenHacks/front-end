import { ReactNode } from "react";
import { Navigate, RoutesProps } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

type TProtectedRoute = RoutesProps & {
  children: ReactNode;
  authentication: boolean;
};

const ProtectedRoute = ({
  children,
  authentication = true,
}: TProtectedRoute) => {
  const { getItem } = useLocalStorage();

  const authStatus = getItem("authStatus") === "true" ? true : false;

  return authStatus && authentication ? (
    <>{children}</>
  ) : (
    <Navigate to={"/sign-in"} replace />
  );
};

export default ProtectedRoute;
