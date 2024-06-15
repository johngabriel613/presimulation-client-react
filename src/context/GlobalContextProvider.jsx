import { createContext, useState } from "react";

export const GlobalContext = createContext()

const GlobalContextProvider = ({children}) => {
  const [audioFile, setAudioFile] = useState(null)
  const [prediction, setPrediction] = useState({})

  return (
    <GlobalContext.Provider value={{prediction, setPrediction, audioFile, setAudioFile}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider