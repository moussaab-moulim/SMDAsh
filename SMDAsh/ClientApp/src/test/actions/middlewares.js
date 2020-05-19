import axios from 'axios';

import constants from '../constants.js';

export const apiMiddleware = ({ dispatch, getState }) => next => action => {
    if (action.type !== constants.APIS.API) return next(action);

    const BASE_URL ='';
    const { url, method, success, data, postProcessSuccess, postProccessError } = action.payload;

    axios({
        method,
        url: BASE_URL + url,
        data: data ? data : null
    }).then((response) => {
        if(success) dispatch(success(response.data));
        if(postProcessSuccess) postProcessSuccess(response.data);
    }).catch(err => {
        if (!err.response) console.warn(err);
        else {
            if(err.response.data.error.message){
                if(postProccessError) postProccessError(err.response.data.error.message);
            }
        }
    })
};