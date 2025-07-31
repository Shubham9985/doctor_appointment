import { createContext } from "react";


export const AppContext = createContext()


const AppContextProvider = (props) => {

    const currency = '₹';

    const calculateAge = (dob) => {
        if (!dob) return 'N/A'
        const today = new Date()
        const birthDate = new Date(dob)
        if (isNaN(birthDate.getTime())) return 'N/A'
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }


    const value = {
        calculateAge, slotDateFormat, months, currency,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider