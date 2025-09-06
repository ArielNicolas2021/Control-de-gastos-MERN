import { Button } from "@mui/material"
import { UseFetchItems } from "../../hooks/UseFetchItems"
import { useState } from "react";

export const DeleteItem = ({ currentItem, handleDeleteItem, user, setItems, setActive, setCurrentForm }) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        await UseFetchItems('delete', user, currentItem);
        setItems(prevItems => prevItems.filter(i => i._id !== currentItem._id));
        setActive(false);
        setCurrentForm("");
        setLoading(false);
    }

    return (
        <div className="card">
            <h2 className="card_title">Eliminar registro</h2>
            <p className="card_text">¿Estás seguro de que deseas eliminar este registro? La información no se podrá recuperar.</p>
            <div className="card_buttons">
                <Button
                    variant="text"
                    size="large"
                    style={{ fontWeight: 'bold', height: '48px' }}
                    onClick={handleDeleteItem}
                    fullWidth
                >
                    Cancelar
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    style={{ fontWeight: 'bold', height: '48px' }}
                    onClick={handleDelete}
                    loading={loading}
                    fullWidth
                >
                    Eliminar
                </Button>
            </div>
        </div>
    )
}
