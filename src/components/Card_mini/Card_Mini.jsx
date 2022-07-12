import {Link} from 'react-router-dom';
import './card_mini.scss';
import cardImg from '../../img/card.png';
import { useSelector } from 'react-redux/es/exports';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';


const CardMini = forwardRef((props, ref)=>{

    const {cardTotalSum, cardTotalItem} = useSelector(state => state)


        return(
            <Link to='/card' >
                    <div className="card-mini" ref={ref}>
                        <div className="card-mini__counter">{cardTotalSum}₴</div>
                        <span>|</span>
                        <div className="card-mini__total">
                            <img src={cardImg} alt="card" />
                            <span>{cardTotalItem}</span>   
                            </div>
                    
                    </div>
            </Link>
       
    )
})

export default CardMini;
export const MCardMini = motion(CardMini);
