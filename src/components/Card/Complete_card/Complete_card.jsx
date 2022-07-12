import {Link} from 'react-router-dom';
import './complete_card.scss';
import cardImg from '../../../img/card.png';
import clean from '../../../img/clean_card.svg';
import {MCardItem} from '../Card_item/Card_item';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { cardDltAll} from '../../../store/slice/slice';
import { AnimatePresence } from "framer-motion";


const CompleteCard = ()=>{

    
    const {cardItems, cardTotalSum, cardTotalItem} = useSelector(state => state);
    const dispatch = useDispatch();
    const deleteAllItem = ()=>{
        if(window.confirm('Ви насправдi хочете видалити всi товари?')){
            dispatch(cardDltAll())
        }
    }

    return(
        <>
                        <div className="card-head">
                    <div className="card-head__title">
                        <img src={cardImg} alt="card" />
                        <span>Корзина</span>
                    </div>
                    <div className="card-head__clean" onClick={deleteAllItem}>
                        <img src={clean} alt="clean" />
                        <span>Видалити все</span>
                    </div>
                </div>

                <AnimatePresence >
                    {cardItems.map(elem => {
                        return <MCardItem {...elem} key={elem.id}
                        exit={{ scale: 0 , opacity: 0, transition:{duration:0.6}}}/>
                    })}
                </AnimatePresence>
                

                <div className="card-total">
                    <div className="card-total__items">Кількість товарів : <span>{cardTotalItem}</span></div>
                    <div className="card-total__price">Сумма : <span> {cardTotalSum} UAH</span></div>
                </div>

                <div className="card-button">
                    <Link to='/'    >
                        <button className="card-button__home">На головну</button>
                    </Link>
                    <Link to='order'>
                        <button className="card-button__next">Оформити замовлення</button>
                    </Link>
                </div>
        </>
    )
}



export default CompleteCard;