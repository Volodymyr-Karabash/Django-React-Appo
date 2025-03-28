import { createContext, useContext, useState } from "react";


export const DataPassContext = createContext();

export default function DataPassProvider({ children}) {
    const [data, setData] = useState([])
  return (
    <DataPassContext.Provider value={{data, setData}}>
      {children}
    </DataPassContext.Provider>
  )
}


// custom hook 
export function useDataPass() {
    const data = useContext(DataPassContext);
    return data;
}