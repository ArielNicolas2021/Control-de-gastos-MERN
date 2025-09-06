import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { HandleLogin } from '../../hooks/HandleLogin';
import '../../styles/global.css';

export const Login = () => {
    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.target.usuario.value == "" ? setUserError(true) : setUserError(false);
        event.target.contraseña.value == "" ? setPasswordError(true) : setPasswordError(false);
        if (event.target.usuario.value == "" || event.target.contraseña.value == "") return;
        setLoading(true);
        const data = await HandleLogin(event.target.usuario.value, event.target.contraseña.value);
        if (data.status == 200) {
            event.target.usuario.value = "";
            event.target.contraseña.value = "";
            navigate('/items');
        } else {
            setMessage(data.message);
            setOpen(true);
        }
        setLoading(false);
    }

    return (
        <main className="main">
            <div className="card">
                <h1 className='card_title'>Iniciar sesión</h1>
                <form className='card_form' onSubmit={handleSubmit}>
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        margin="none"
                        id='usuario'
                        error={userError}
                        helperText={userError ? "Ingrese un usuario." : ""}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="none"
                        id='contraseña'
                        error={passwordError}
                        helperText={passwordError ? "Ingrese una contraseña." : ""}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size='large'
                        style={{ fontWeight: 'bold' }}
                        loading={loading}
                    >
                        Iniciar sesión
                    </Button>
                </form>
                <p className='card_text'>¿No tienes una cuenta? <NavLink to="/registro" className='card_link'>Regístrate</NavLink></p>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </main>
    )
}
