import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export const useGlobalContext = () => useContext(GlobalContext);