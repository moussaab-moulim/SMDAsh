import constants from '../../constants.js';

export const registerUser = (data, onSuccess, onError) => ({
    type: constants.APIS.API,
    payload: {
        method: "POST",
        url: constants.APIS.registerUser,
        data,
        success: (response) => loginUser(data),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const loginUser = (data, onSuccess, onError) => ({
    type: constants.APIS.API,
    payload: {
        method: "POST",
        url: constants.APIS.loginUser,
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const setUserInfo = (data) => {
    const parsedToken = JSON.parse(atob(data.token.split('.')[1]));
    
    const userInfo = {
        userId: data.id,
        fullName: `${data.firstName} ${data.lastName}`,
        token: data.token,
        isLoggedIn: true,
    };
    localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
    return { type: "SET_USER_INFO", payload: userInfo };
};