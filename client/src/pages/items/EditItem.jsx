import { useState } from "react";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { UseFetchItems } from "../../hooks/UseFetchItems";

export const EditItem = ({ currentItem, handleEditItem, user, setItems, handleDeleteItem }) => {
    const [item, setItem] = useState(currentItem.item);
    const [amount, setAmount] = useState(currentItem.amount);
    const [type, setType] = useState(currentItem.type);
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const [itemIDError, setItemIDError] = useState(false);
    const [itemError, setItemError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [typeError, setTypeError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.itemID.value == "" ? setItemIDError(true) : setItemIDError(false);
        event.target.item.value == "" ? setItemError(true) : setItemError(false);
        event.target.amount.value == "" ? setAmountError(true) : setAmountError(false);
        type == "" ? setTypeError(true) : setTypeError(false);
        if (event.target.itemID.value == "" || event.target.item.value == "" || event.target.amount.value == "" || type == "") return;
        let editItem = {
            _id: currentItem._id,
            userID: currentItem.userID,
            date: currentItem.date,
            amount: Number(amount),
            item: item,
            type: type
        }
        UseFetchItems('put', user, editItem);
        setItems(prevItems => prevItems.map(i => i._id === editItem._id ? editItem : i));
        handleEditItem();
    }

    return (
        <div className="card">
            <h2 className="card_title">Editar registro</h2>
            <form className="card_form" onSubmit={handleSubmit}>
                <TextField
                    label="ID del registro"
                    variant="outlined"
                    margin="none"
                    id="itemID"
                    value={currentItem._id}
                    fullWidth
                    disabled
                />
                <TextField
                    label="Registro"
                    variant="outlined"
                    margin="none"
                    id="item"
                    error={itemError}
                    helperText={itemError ? "Ingrese un registro." : ""}
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Monto"
                    type="number"
                    variant="outlined"
                    margin="none"
                    id="amount"
                    error={amountError}
                    helperText={amountError ? "Ingrese un monto." : ""}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
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
                        onClick={handleEditItem}
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
                    >
                        Enviar
                    </Button>
                </div>
                <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    style={{ fontWeight: 'bold', height: '48px' }}
                    fullWidth
                    onClick={handleDeleteItem}
                >
                    Eliminar registro
                </Button>
            </form>
        </div>
    )
}
