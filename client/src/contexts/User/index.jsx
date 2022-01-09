import React, { useState } from "react"
import { reducer, initialState } from "./reducer"

//https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
//App.js does getUser dispatch, goes HERE (useAsyncReducer, which acts as middleware). This function then waits for reducer.js here (doesn't wait in reducer's reducer.js)
function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState),
        dispatchState = async (action) => setState(await reducer(state, action));
    return [state, dispatchState];
}

export const UserContext = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useAsyncReducer(reducer, initialState)//React.useReducer()

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}

