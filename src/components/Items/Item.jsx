import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./item.scss";
import muscle from "../../img/muscle.png";
import Counter from "../Counter/Counter";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addCardItems, totalSum, setCount } from "../../store/slice/slice";
import NotFound from "../404/NotFound";
import { motion } from "framer-motion";

const Item = () => {
    const [item, setItem] = useState([]);
    const [load, setLoad] = useState(true);
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counterValue);
    const { itemId } = useParams();
    const [errorLoad, setErrorLoad] = useState(false);

    const fetchItem = () => {
        const url = `https://62af6c70b0a980a2ef400e96.mockapi.io/items/${itemId}`;
        axios
            .get(url)
            .then((res) => {
                setItem(res.data);
                setLoad(false);
            })
            .catch(() => {
                setLoad(false);
                setErrorLoad(true);
            });
    };
    useEffect(() => {
        fetchItem();
    }, []);

    if (load) {
        return <Spinner />;
    }

    if (errorLoad) {
        return <NotFound />;
    }

    const { brand, img, porcion, descr, tableValue, title, weight } = item.item;
    const addCard = () => {
        dispatch(
            addCardItems({
                id: item.id,
                img,
                title,
                weight,
                price: item.price,
                count: counter,
            })
        );
        dispatch(totalSum(parseInt(item.price)));
        dispatch(setCount(1));
    };

    // animate__animated animate__fadeInUp
    return (
        <section className="tabs">
            <div className="container">
                <motion.div
                    className="items"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 1,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 1,
                        },
                    }}
                >
                    <div className="items__header">
                        <div className="items__header-img">
                            <img src={img} alt="#" />
                        </div>

                        <h2 className="items__header-title">{title}</h2>

                        <ul className="items__header-list">
                            <li>
                                Бренд : <span>{brand}</span>
                            </li>
                            {weight ? (
                                <li>
                                    Вага упаковки : <span>{weight}</span>
                                </li>
                            ) : (
                                <li>
                                    Кількість в упаковці: <span>{porcion}</span>
                                </li>
                            )}
                        </ul>
                        <div className="items__header-buying">
                            <div className="items__header-buying__price">
                                Ціна : <span>{item.price}</span>
                            </div>

                            <Counter />

                            <button
                                className="items__header-buying__btn"
                                onClick={addCard}
                            >
                                Замовити зараз
                            </button>
                        </div>
                        <Link to="/">
                            <button className="back">Назад</button>
                        </Link>
                    </div>

                    <div className="items__icon">
                        <img src={muscle} alt="muscle" />
                    </div>

                    <div className="items-text">
                        <ul className="items-text__descr">
                            {descr.map((item, i) => {
                                if (i === 0) {
                                    return (
                                        <li
                                            className="items-text__value first"
                                            key={i}
                                        >
                                            Опис : {item}
                                        </li>
                                    );
                                }
                                return (
                                    <li className="items-text__value" key={i}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>

                        <ul className="items-text__compound">
                            {tableValue.key.map((item, i) => {
                                if (i === 0) {
                                    return (
                                        <li
                                            className="items-text__value first"
                                            key={i}
                                        >
                                            {item}
                                        </li>
                                    );
                                }
                                return (
                                    <li className="items-text__value" key={i}>
                                        {item}
                                        <span>{tableValue.value[i]}</span>{" "}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default Item;
