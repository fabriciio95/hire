import { createContext, useState } from "react"

export const AlertContext = createContext();

export const useAlert = () => {
  
  const [alert, setAlert] = useState("");
  const [showAlertErro, setShowAlertErro] = useState(false);

  const zerarState = () => {
    setAlert("");
    setShowAlertErro(false);
  }


  return { alert, setAlert, showAlertErro, setShowAlertErro, zerarState };
}