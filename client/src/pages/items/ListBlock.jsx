export const ListBlock = ({id, item, amount, type, active, setActive, currentForm, setCurrentForm, setItemID }) => {
    const handleEditItem = () => {
        active == true ? setActive(false) : setActive(true);
        currentForm == "edit" ? setCurrentForm("") : setCurrentForm("edit");
        setItemID(id);
    }

    return (
        <div className="items_block" id={id} onClick={handleEditItem}>
            <p className="items_title">{item}</p>
            <p className="items_amount">
                <span className="items_type">{type == "ingreso" ? "+" : "-"}</span>
                ${amount.toLocaleString()}
            </p>
        </div>
    )
}
