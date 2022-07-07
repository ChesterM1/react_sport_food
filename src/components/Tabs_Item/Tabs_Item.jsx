import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import "./tabs_item.scss";
import { addCardItems, totalSum } from "../../store/slice/slice";

const TabsItem = ({ value }) => {
    const { title, weight, img, amount } = value.item;
    const { id, price } = value;
    const dispatch = useDispatch();

    const cardItem = {
        title,
        weight,
        img,
        amount,
        id,
        price,
        count: 1,
    };

    const addCard = (e) => {
        e.preventDefault();
        dispatch(addCardItems(cardItem));
        dispatch(totalSum(parseInt(price)));
    };
    return (
        <Link
            to={`/item/${id}`}
            className="tabs-wrapper__link animate__animated animate__fadeInUp"
        >
            <div className="tabs-wrapper__item">
                <img
                    src={img}
                    alt="vitamin icon"
                    className="tabs-wrapper__img"
                />
                <h2 className="tabs-wrapper__title">{title}</h2>
                {weight ? (
                    <div className="tabs-wrapper__weigth">
                        Вага упаковки : <span>{weight}</span>
                    </div>
                ) : (
                    <div className="tabs-wrapper__weigth">
                        Кількість в упаковці : <span>{amount}</span>
                    </div>
                )}

                <div className="tabs-wrapper__order">
                    <button
                        className="tabs-wrapper__btn"
                        onClick={(e) => addCard(e)}
                    >
                        Додати до корзини
                    </button>
                    <div className="tabs-wrapper__price">{price}</div>
                </div>
            </div>
        </Link>
    );
};

export default TabsItem;
