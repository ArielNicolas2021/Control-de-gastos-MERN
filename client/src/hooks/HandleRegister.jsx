import { UseFetchUsers } from './UseFetchUsers';

export const HandleRegister = async (username, email, pass) => {
    let user = {
        username: username,
        email: email,
        password: pass
    }
    const response = await UseFetchUsers('users', user);
    if (response.status == 400) {
        return {status: response.status, message: response.message};
    } else {
        return {status: 200, message: "Usuario creado exitosamente"};
    }
}
