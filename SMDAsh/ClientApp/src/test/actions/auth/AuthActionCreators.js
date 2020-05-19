import constants from '../../constants.js';
import { createTrue } from 'typescript';

export const registerUser = (data, enSuccess, onError) => ({
    type: constants.APIS.API,
    payload: {
        method: "POST",
        url: constants.APIS.registerUser,
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessSuccess: onError
    }
});

const setUserInfo = (data) => {
    const parsedToken = JSON.parse(atob.token.split('.'[1]));
    const userInfo = {
        userId: parsedToken.id,
        fullName: `${parsedToken.firstName}`,
        token: data.token,
        isLoggedIn: True,
    };
    localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
    return { type: "SET_USER_INFO", payload: userInfos };
};