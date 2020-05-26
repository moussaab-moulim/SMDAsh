import * as constants from './../constants';

export const registerUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/users/register',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const loginUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/users/authenticate',
        data,
        success: (response) => (
            setUserInfo(response)
        ),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const logoutUser = () => {
    localStorage.removeItem('USER_INFO');
    return { type: constants.RESET_USER_INFO };
};

const setUserInfo = (data) => {
    var base64Url = data.token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const parsedToken = JSON.parse(window.atob(base64));
    //const parsedToken = JSON.parse(atob(data.token.split('.')[1]));
    const userInfo = {
        userId: data.id,
        fullName: `${data.firstName} ${data.lastName}`,
        token: data.token,
        isLoggedIn: true
    };
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return { type: constants.SET_USER_INFO, payload: userInfo };
};
