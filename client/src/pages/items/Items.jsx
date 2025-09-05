import { useContext } from "react";
import { AuthContext } from "../../utils/Context.jsx";
import { Home } from "./Home.jsx";

export const Items = () => {
    const [userAuth, setUserAuth] = useContext(AuthContext);

    return (
        <>{userAuth == null ? <h2>No estás autenticado</h2> : <Home />}</>
    )
}
