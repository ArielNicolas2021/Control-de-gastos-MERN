import { UseFetchUsers } from "./UseFetchUsers";

export const HandleLogin = async (username, password) => {
    let user = {
        username: username,
        password: password
    }
    const response = await UseFetchUsers('users/login', user);
    if (response.status == 400) {
        return { status: response.status, message: response.message };
    } else {
        localStorage.setItem('user', JSON.stringify(response));
        return { status: 200, message: "Login successful" };
    }
}
