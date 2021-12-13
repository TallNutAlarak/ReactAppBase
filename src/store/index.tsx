import React, { useReducer } from "react";
import { customLog } from "@utils";

type ActionType =
    | {
          type: "reset";
      }
    | {
          type: "login";
          payload: {
              role: string;
          };
      }
    | {
          type: "logout";
      };

interface IStoreState {
    isLogin: boolean;
    role: string | null;
}

const initialState: IStoreState = {
    isLogin: false,
    role: null,
};
function reducer(state: typeof initialState, action: ActionType) {
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

const appContext = React.createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => {
        throw new Error("dispatch error");
    },
});

const AppContextProvider:React.FC = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <appContext.Provider value={{ state, dispatch }}>
            {props.children}
        </appContext.Provider>
    );
};

export { appContext, AppContextProvider };
