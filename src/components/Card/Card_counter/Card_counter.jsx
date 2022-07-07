import "../../Counter/Counter";
import { useDispatch } from "react-redux/es/exports";
import {
    setItemNum,
    cardItemMinus,
    cardItemPlus,
} from "../../../store/slice/slice";

const CardCounter = ({ count, id }) => {
    const dispatch = useDispatch();
    const inc = ()=>{
        dispatch(cardItemPlus(id));
        
    }
    const dec = ()=>{
        dispatch(cardItemMinus(id));
    }
    const set =(e)=>{
        dispatch(setItemNum({
            count: parseInt(e.target.value),
            id,
            
        }));
    }

    return (
        <div className="counter">
            <span onClick={dec}>
                <svg width="11" height="1" viewBox="0 0 11 1">
                    <rect width="11" height="1" rx="0.5" ry="0.5"></rect>
                </svg>
            </span>
            <input
                type="text"
                className="counter__count"
                value={count}
                onChange={e=> set(e)}
            />
            <span onClick={inc}>
                <svg width="11" height="11" viewBox="0 0 11 11">
                    <path
                        d="M1034.5,193H1030v4.5a0.5,0.5,0,0,1-1,0V193h-4.5a0.5,0.5,0,0,1,0-1h4.5v-4.5a0.5,0.5,0,0,1,1,0V192h4.5A0.5,0.5,0,0,1,1034.5,193Z"
                        transform="translate(-1024 -187)"
                    ></path>
                </svg>
            </span>
        </div>
    );
};
export default CardCounter;
