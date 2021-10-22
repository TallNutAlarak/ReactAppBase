import React, { useReducer } from "react";

const initialState = {
    isLogin: false,
    role: null,
};

const appContext = React.createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => {},
});

function reducer(state: typeof initialState, action: any) {
    console.log("dispatch: ", state, action);
    switch (action.type) {
        case "reset":
            return initialState;
        case "login":
            return { ...state, isLogin: true, role: action.payload.role };
        case "logout":
            return { ...state, isLogin: false, role: null };
        default:
            return state;
    }
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
