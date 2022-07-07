import './spinner.scss';
import spinner from '../../img/spinner.gif';

const Spinner = ()=>{

    return(
        <div className="spinner">
            <img src={spinner} alt="spinner" />
        </div>
    )
}

export default Spinner;