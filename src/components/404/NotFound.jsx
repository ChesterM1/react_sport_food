import { Link } from 'react-router-dom';
import './notFound.scss';

const NotFound = ()=>{

    return(
        <div className='notFound'>
        <span className='notFound__smile'>😕</span>
        <br />
        <h1 className='notFound__title'>Сторiнка не знайдена</h1>
        <div className='notFound__descr'>нажаль по данному посиланню нiчого не знайдено </div>
        <Link to={'/'}>
        <button className='notFound__btn'>На головну</button>

        </Link>

        </div>
    );
}

export default NotFound;