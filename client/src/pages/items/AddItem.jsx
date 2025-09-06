import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";
import { UseFetchItems } from "../../hooks/UseFetchItems";

export const AddItem = ({ user, date, handleAddItem, setItems }) => {
    const [type, setType] = useState('');
    const [itemError, setItemError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const [open, setOpen] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        event.target.item.value == "" ? setItemError(true) : setItemError(false);
        event.target.amount.value == "" ? setAmountError(true) : setAmountError(false);
        type == "" ? setTypeError(true) : setTypeError(false);
        if (event.target.item.value == "" || event.target.amount.value == "" || type == "") return;
        const newItem = {
            userID: user.username,
            date: date,
            amount: Number(event.target.amount.value),
            item: event.target.item.value,
            type: type
        };
        setLoading(true);
        await UseFetchItems('post', user, newItem);
        setItems(prevItems => [...prevItems, newItem]);
        setOpen(true);
        setLoading(false);
        handleAddItem();
    }

    return (
        <div className="card">
            <h2 className="card_title">Nuevo registro</h2>
            <form className="card_form" onSubmit={handleSubmit}>
                <TextField
                    label="Registro"
                    variant="outlined"
                    margin="none"
                    id="item"
                    error={itemError}
                    helperText={itemError ? "Ingrese un registro." : ""}
                    fullWidth
                />
                <TextField
                    label="Monto"
                    type="number"
                    variant="outlined"
                    margin="none"
                    id="amount"
                    fullWidth
                    error={amountError}
                    helperText={amountError ? "Ingrese un monto." : ""}
                />
                <FormControl fullWidth error={typeError}>
                    <InputLabel id="typeLabel">Tipo de registro</InputLabel>
                    <Select
                        labelId="typeLabel"
                        id="type"
                        label="Tipo de registro"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="" disabled>Seleccione el tipo de registro</MenuItem>
                        <MenuItem value="ingreso">Ingreso</MenuItem>
                        <MenuItem value="egreso">Egreso</MenuItem>
                    </Select>
                    <FormHelperText>{typeError ? "Seleccione un tipo de registro." : ""}</FormHelperText>
                </FormControl>
                <div className="card_buttons">
                    <Button
                        variant="text"
                        size="large"
                        style={{ fontWeight: 'bold', height: '48px' }}
                        onClick={handleAddItem}
                        fullWidth
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ fontWeight: 'bold', height: '48px' }}
                        fullWidth
                        loading={loading}
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </div>
    )
}
