import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Card from "./components/Card/Card";
import ItemPage from "./components/pages/Item_page";
import OrderForm from "./components/Card/Order_form/Order_form";
import NotFoundPage from "./components/pages/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStor } from "./store/slice/slice";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const {cardItems, cardThenksBlock} = useSelector( state => state);

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
                    <Route path="card/order" element={cardItems.length || cardThenksBlock? <OrderForm /> : <Card/>} />
                    <Route path={"*"} element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
