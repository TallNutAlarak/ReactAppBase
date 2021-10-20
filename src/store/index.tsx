import React, { useReducer } from "react";

const initialState = {
    isLogin: false,
};
const myContext = React.createContext<{
    state?: typeof initialState;
    dispatch?: React.Dispatch<any>;
}>({});

function reducer(state: any, action: any) {
    console.log("reducer", state, action);

    switch (action.type) {
        case "reset":
            return initialState;
        case "login":
            return { ...state, isLogin: true };
        case "logout":
            return { ...state, isLogin: false };
        default:
            return state;
    }
}

const ContextProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <myContext.Provider value={{ state, dispatch }}>
            {props.children}
        </myContext.Provider>
    );
};

export { myContext, ContextProvider };
