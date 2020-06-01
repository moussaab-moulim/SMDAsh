import axios from 'axios';

import * as constants from './constants';
import { logoutUser } from './actions/auth/authActionCreators';


export const apiMiddleware = ({ dispatch, getState }) => next => action => {
   
    if (action.type !== constants.API) return next(action); 

    dispatch({ type: constants.TOGGLE_LOADER });
    const BASE_URL = '';
    const AUTH_TOKEN = getState().user.token;
    if (AUTH_TOKEN)
        axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    const { url, method, success, data, postProcessSuccess, postProcessError } = action.payload;
    
    axios({
        method,
        url: BASE_URL + url,
        data: data ? data : null
    }).then((response) => {
        dispatch({ type: constants.TOGGLE_LOADER });
        if (success) dispatch(success(response.data));
        if (postProcessSuccess) postProcessSuccess(response.data);
    }).catch(error  => {
       
       dispatch({ type: constants.TOGGLE_LOADER });
       
        if (!error.response) console.warn(error);
        else {
           
            if (error.response && error.response.status === 403)
                dispatch(logoutUser());
            if (error.response.data.message) {
                if (postProcessError) postProcessError(error.response.data.message);
            }
        }
    })
};
