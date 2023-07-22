import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {entityReducer} from "./entityReducer.js";

const rootReducer = combineReducers({
    entities: entityReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
