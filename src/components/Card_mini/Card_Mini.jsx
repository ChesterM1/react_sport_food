import {Link} from 'react-router-dom';
import './card_mini.scss';
import cardImg from '../../img/card.png';
import { useSelector } from 'react-redux/es/exports';


const CardMini = ()=>{

    const {cardTotalSum, cardTotalItem} = useSelector(state => state)


        return(
            <Link to='/card'>
                    <div className="card-mini">
                        <div className="card-mini__counter">{cardTotalSum}₴</div>
                        <span>|</span>
                        <div className="card-mini__total">
                            <img src={cardImg} alt="card" />
                            <span>{cardTotalItem}</span>   
                            </div>
                    
                    </div>
            </Link>
       
    )
}

export default CardMini;
