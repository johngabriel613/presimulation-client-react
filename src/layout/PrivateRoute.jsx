import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const PrivateRoute = () => {
  const {prediction, audioFile} = useGlobalContext()

  return (
    <>
      {prediction && audioFile ? <Outlet /> : <Navigate to="/"/>}
    </>
  );
}

export default PrivateRoute