import './card.scss';
import CompleteCard from './Complete_card/Complete_card';
import EmptyCard from './Empty_card/Empty-card';
import { useSelector } from 'react-redux/es/exports';

const Card = ()=>{

    const cardItems = useSelector( state=> state.cardItems);

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