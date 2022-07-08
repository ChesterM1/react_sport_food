import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Card from "./components/Card/Card";
import ItemPage from "./components/pages/Item_page";
import OrderForm from "./components/Card/Order_form/Order_form";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStor } from "./store/slice/slice";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const cardItems = useSelector( state => state.cardItems);

    const getStorageCard = () => {
        if (window.localStorage.getItem("cardItem")) {
            const jsonStr = window.localStorage.getItem("cardItem");
            dispatch(getLocalStor(JSON.parse(jsonStr)));
        }
    };

    useEffect(() => {
        getStorageCard();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="card" element={<Card />} />
                    <Route path={"/item/:itemId"} element={<ItemPage />} />
                    <Route path="card/order" element={cardItems.length ? <OrderForm /> : <Card/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
