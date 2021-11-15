import React, { useReducer } from "react";
import { customLog } from "@utils";
const initialState = {
    isLogin: false,
    role: null,
};

const appContext = React.createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => {
        throw new Error("dispatch error");
    },
});

function reducer(state: typeof initialState, action: any) {
    customLog({ state: state, action }, "dispatch before");
    let newState;
    switch (action.type) {
        case "reset":
            newState = initialState;
            break;
        case "login":
            newState = { ...state, isLogin: true, role: action.payload.role };
            break;
        case "logout":
            newState = { ...state, isLogin: false, role: null };
            break;
        default:
            newState = state;
            break;
    }
    customLog({ newState, action }, "dispatch after");
    return newState;
}

const AppContextProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <appContext.Provider value={{ state, dispatch }}>
            {props.children}
        </appContext.Provider>
    );
};

export { appContext, AppContextProvider };
