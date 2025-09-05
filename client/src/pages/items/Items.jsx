import { useContext } from "react";
import { AuthContext } from "../../utils/Context.jsx";
import { Home } from "./Home.jsx";
import { Login } from "../auth/Login.jsx";

export const Items = () => {
    const [userAuth, setUserAuth] = useContext(AuthContext);

    return (
        <>{userAuth == null ? <Login /> : <Home />}</>
    )
}
