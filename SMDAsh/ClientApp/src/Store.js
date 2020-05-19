import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { apiMiddleware } from 'actions/middlewares';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware))
 
)

export default store;