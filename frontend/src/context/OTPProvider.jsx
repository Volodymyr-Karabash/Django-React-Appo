import { createContext, useContext } from "react";
import { generateOTP } from "../utilis/generateOTP";


export const OTPContext = createContext();

export default function OTPProvider({ children }) {
    return (
        <OTPContext.Provider value={generateOTP()}>
            {children}
        </OTPContext.Provider>
    )
}

// custom hook 
export function useOTP() {
    const otp = useContext(OTPContext);
    return otp;
}

