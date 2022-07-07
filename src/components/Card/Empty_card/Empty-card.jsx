import {Link} from 'react-router-dom'
import './empty-card.scss';
import emptyCard from '../../../img/empty_card.png';
import card from '../../../img/card.png';


const EmptyCard = ()=>{

    return(
        <div className='card-empty'>
            <div className="card-empty__head">
                <img src={card} alt="card" />
                <span>Корзина</span>
            </div>
            <h2 className='card-empty__title'>Поки що немае жодного замовлення</h2>
            <p className="card-empty__text">Ви ще нічого не додали до корзини, что б це зробити повернітся на головну сторінку</p>
            <img src={emptyCard} alt="empty card"/>
            <Link to='/'>
                <button className="card-empty__btn">На головну</button>
            </Link>
        </div>
    )
}

export default EmptyCard;