import './head.scss';
import CardMini from '../Card_mini/Card_Mini';
import { MCardMini } from '../Card_mini/Card_Mini';
import {motion , useAnimationControls} from 'framer-motion';
import  {useEffect, useState} from 'react';
import { useSelector } from 'react-redux/es/exports';


const Head =  ()=>{
    
    const totalSum = useSelector(state => state.cardTotalSum)
     const anim = useAnimationControls()
    const [firstRender, setFirstRender] = useState(false);
     const fn = async ()=>{
        await anim.start({
            scale: 1.2,
            transition: {
                duration: 0.5,
                type: 'spring',
                // stiffness: 1000,
            }
        });
        await anim.start({
            scale:1,
            transition: {
                duration: 0.5,
                type: 'spring',
                stiffness: 1000,
            }
         });
    }
    

    useEffect(()=>{
        if(firstRender){
            fn();
        }
        setFirstRender(true)

    },[totalSum])

    return(
        <section className="head" >   
            <MCardMini   
            animate={anim}
            />
            <div className="head__img">
                <h1 className="head__subtitle">Твои витамины</h1>
            </div>
        </section>
    )
}


export default Head;