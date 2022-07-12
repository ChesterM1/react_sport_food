import './card.scss';
import CompleteCard from './Complete_card/Complete_card';
import EmptyCard from './Empty_card/Empty-card';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { setCardThanksBlock, setCardErrorBlock } from '../../store/slice/slice';
import { motion} from "framer-motion";
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
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1,
                transition:{
                    duration: 0.4
                }
            }}
         className="card">
            <div className="container">
               
               {render}
               
                

            </div>
        </motion.div>
        
        
    )
}
export default Card;