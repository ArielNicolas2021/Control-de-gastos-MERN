import { TextField, Button, Snackbar, Alert } from '@mui/material/';
import { NavLink, useNavigate } from 'react-router-dom';
import { HandleRegister } from '../../hooks/HandleRegister';
import '../../styles/global.css';
import { useState } from 'react';

export const Registro = () => {
    const navigate = useNavigate();
    const [userError, setUserError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [open, setOpen] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.target.usuario.value == "" ? setUserError(true) : setUserError(false);
        event.target.email.value == "" ? setEmailError(true) : setEmailError(false);
        event.target.contraseña.value == "" ? setPasswordError(true) : setPasswordError(false);
        if (event.target.usuario.value == "" || event.target.email.value == "" || event.target.contraseña.value == "") return;
        const data = await HandleRegister(event.target.usuario.value, event.target.email.value, event.target.contraseña.value);
        if (data.status == 200) {
            event.target.usuario.value = "";
            event.target.email.value = "";
            event.target.contraseña.value = "";
            setMessageError(false);
        } else {
            setMessageError(true);
        }
        setMessage(data.message);
        setOpen(true);
    }

    return (
        <main className='main'>
            <div className="card">
                <h1 className='card_title'>Crear cuenta</h1>
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
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="none"
                        id='email'
                        error={emailError}
                        helperText={emailError ? "Ingrese un email." : ""}
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
                        style={{ fontWeight: 'bold', backgroundColor: '#2484D3' }}
                    >
                        Crear cuenta
                    </Button>
                </form>
                <p className='card_text'>¿Ya tienes una cuenta? <NavLink to="/login" className='card_link'>Inicia sesión</NavLink></p>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={messageError ? "error" : "success"}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </main>
    )
}
