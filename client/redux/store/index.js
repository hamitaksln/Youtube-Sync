import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "../reducers/RootReducer"

const composedEnhancer = composeWithDevTools(
    // Add whatever middleware you actually want to use here
    applyMiddleware(thunk)
    // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)
export default store
