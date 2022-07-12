import {Link} from 'react-router-dom';
import './thanksBlock.scss';

const ThanksBlock = ()=>{


    return(

                <div className="thenks">
                    <h2>🙂</h2>
                    <h3>Ваше замовлення прийнято в обробку</h3>
                    <p>Менеджер з Вами звяжиться найближчiм часом </p>
                
                    <Link to='/'>
                        <button>На головну</button>
                    </Link>
                </div>

    )
}

export default ThanksBlock;