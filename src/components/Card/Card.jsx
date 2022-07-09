import './card.scss';
import CompleteCard from './Complete_card/Complete_card';
import EmptyCard from './Empty_card/Empty-card';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { setCardThanksBlock, setCardErrorBlock } from '../../store/slice/slice';

const Card = ()=>{

    const cardItems = useSelector( state=> state.cardItems);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCardThanksBlock(false));
        dispatch(setCardErrorBlock(false))
    },[]);
    const render = cardItems.length > 0 
        ? <CompleteCard/>
        :<EmptyCard/> ;

    return(
        <div className="card">
            <div className="container">
               
               {render}

            </div>
        </div>
        
        
    )
}
export default Card;