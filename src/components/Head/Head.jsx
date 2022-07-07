import './head.scss';
import CardMini from '../Card_mini/Card_Mini';

const Head = ()=>{

    return(
        <section className="head">    
            <CardMini/>
            <div className="head__img">
                <h1 className="head__subtitle">Твои витамины</h1>
            </div>
        </section>
    )
}

export default Head;