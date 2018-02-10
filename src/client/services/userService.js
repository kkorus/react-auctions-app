function getAuthKey() {
    return localStorage.getItem('x-auth');
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function login(res) {
    localStorage.setItem('user', JSON.stringify(res.data));
    localStorage.setItem('x-auth', res.headers['x-auth']);
}

export { getAuthKey, login, getUser }
