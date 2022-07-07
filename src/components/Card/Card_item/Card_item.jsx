import "./card_item.scss";
import CardCounter from "../Card_counter/Card_counter";
import { useDispatch } from "react-redux/es/exports";
import { cardDltItem } from "../../../store/slice/slice";

const CardItem = (prop) => {
    const dispatch = useDispatch();

    const { img, title, price, weight, id, amount, count } = prop;
    
    const itemDelete = ()=>{
        if(window.confirm('Ви насправдi хочете видалити цей товар?')){
            dispatch(cardDltItem(id))
        }
    }

    return (
        <div className="card-block">
            <img src={img} alt="images" />
            <div className="card-block__title">
                <div>{title}</div>
            </div>
            {weight ? (
                <span className="card-block__weight">
                    Вага упаковки : <span>{weight}</span>
                </span>
            ) : (
                <span className="card-block__weight">
                    Кількість в упаковці : <span>{amount}</span>
                </span>
            )}

            <CardCounter count={count} id={id} price={price} />

            <div className="card-block__price">{price}</div>
            <div
                className="card-block__dlt"
                onClick={itemDelete}
            >
                <svg width="35px" height="35px" viewBox="0 0 24 24">
                    <path
                        fillRule="evenodd"
                        d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M7.29325,7.29325 C7.65417308,6.93232692 8.22044527,6.90456361 8.61296051,7.20996006 L8.70725,7.29325 L12.00025,10.58625 L15.29325,7.29325 C15.68425,6.90225 16.31625,6.90225 16.70725,7.29325 C17.0681731,7.65417308 17.0959364,8.22044527 16.7905399,8.61296051 L16.70725,8.70725 L13.41425,12.00025 L16.70725,15.29325 C17.09825,15.68425 17.09825,16.31625 16.70725,16.70725 C16.51225,16.90225 16.25625,17.00025 16.00025,17.00025 C15.7869167,17.00025 15.5735833,16.9321944 15.3955509,16.796662 L15.29325,16.70725 L12.00025,13.41425 L8.70725,16.70725 C8.51225,16.90225 8.25625,17.00025 8.00025,17.00025 C7.74425,17.00025 7.48825,16.90225 7.29325,16.70725 C6.93232692,16.3463269 6.90456361,15.7800547 7.20996006,15.3875395 L7.29325,15.29325 L10.58625,12.00025 L7.29325,8.70725 C6.90225,8.31625 6.90225,7.68425 7.29325,7.29325 Z"
                    />
                </svg>
            </div>
        </div>
    );
};
export default CardItem;
