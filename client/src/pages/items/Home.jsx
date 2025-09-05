import { useContext, useEffect, useState } from "react"
import { Button } from "@mui/material";
import { UseFetchItems } from "../../hooks/UseFetchItems";
import { AuthContext } from "../../utils/Context";
import { ListBlock } from "./ListBlock";
import { AppDate } from "./AppDate";
import { AddItem } from "./AddItem";
import '../../styles/global.css';
import '../../styles/home.css';
import 'boxicons'
import { EditItem } from "./EditItem";
import { DeleteItem } from "./DeleteItem";

export const Home = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [saldo, setSaldo] = useState(0);
    const [gasto, setGasto] = useState(0);

    const dateNow = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    }
    const [day, setDay] = useState(dateNow.day);
    const [month, setMonth] = useState(dateNow.month);
    const [year, setYear] = useState(dateNow.year);

    const [active, setActive] = useState(false);
    const [currentForm, setCurrentForm] = useState("");
    const handleAddItem = () => {
        active == true ? setActive(false) : setActive(true);
        currentForm == "add" ? setCurrentForm("") : setCurrentForm("add");
    }
    const handleEditItem = () => {
        active == true ? setActive(false) : setActive(true);
        currentForm == "edit" ? setCurrentForm("") : setCurrentForm("edit");
    }
    const handleDeleteItem = () => {
        currentForm == "delete" ? setCurrentForm("edit") : setCurrentForm("delete");
    }

    const [itemID, setItemID] = useState(null);

    useEffect(() => {
        const renderItems = async () => {
            const fetchedItems = await UseFetchItems("get", AuthContext, null);
            setItems(fetchedItems);
        };
        renderItems();
    }, [])
    useEffect(() => {
        let totalSaldo = 0;
        let totalGasto = 0;
        items.forEach(item => {
            if (item.type == "ingreso") {
                totalSaldo += item.amount;
            } else {
                totalSaldo -= item.amount;
                totalGasto += item.amount;
            }
        });
        setSaldo(totalSaldo);
        setGasto(totalGasto);
    }, [items]);

    return (
        <main className="main">
            <div className="app">
                <div className="app_header">
                    <p className="header_title">Saldo</p>
                    <h1 className="header_amount">${saldo.toLocaleString()}</h1>
                </div>
                <div className="app_gastos">
                    <div className="gastos_porcent">
                        <div className="porcent">
                            <svg className="porcent_circle">
                                <circle r="49%" cx="50%" cy="50%" pathLength="100" className="circle"></circle>
                                <circle r="49%" cx="50%" cy="50%" pathLength="100" className="circle_porcent" style={{ strokeDasharray: `${(gasto / (gasto + saldo)) * 100} 100` }}></circle>
                            </svg>
                            <div className="porcent_total">
                                <p className="porcent_title">Gastos</p>
                                <span className="porcent_amount">${gasto.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app_date">
                    <AppDate day={day} month={month} year={year} setDay={setDay} setMonth={setMonth} setYear={setYear} />
                </div>
                <div className="app_items">
                    {items.map((item, index) => {
                        if (item.date == `${day}/${month}/${year}`) {
                            return (
                                <ListBlock
                                    key={index}
                                    id={item._id}
                                    item={item.item}
                                    type={item.type}
                                    amount={item.amount}
                                    active={active}
                                    setActive={setActive}
                                    currentForm={currentForm}
                                    setCurrentForm={setCurrentForm}
                                    setItemID={setItemID}
                                />
                            )
                        }
                    })}
                </div>
                <div className="app_btn">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ fontWeight: 'bold' }}
                        onClick={handleAddItem}
                        fullWidth
                    >
                        Agregar
                    </Button>
                </div>
                <div className={active ? "app_shadow active" : "app_shadow"}>
                    {
                        currentForm == "add" &&
                        <AddItem
                            user={auth}
                            date={`${dateNow.day}/${dateNow.month}/${dateNow.year}`}
                            handleAddItem={handleAddItem}
                            setItems={setItems}
                        />
                    }
                    {
                        currentForm == "edit" &&
                        <EditItem
                            currentItem={items.find(item => item._id === itemID)}
                            handleEditItem={handleEditItem}
                            user={auth}
                            setItems={setItems}
                            handleDeleteItem={handleDeleteItem}
                        />
                    }
                    {
                        currentForm == "delete" &&
                        <DeleteItem
                            currentItem={items.find(item => item._id === itemID)}
                            handleDeleteItem={handleDeleteItem}
                            user={auth}
                            setItems={setItems}
                            setActive={setActive}
                            setCurrentForm={setCurrentForm}
                        />
                    }
                </div>
            </div>
        </main>
    )
}