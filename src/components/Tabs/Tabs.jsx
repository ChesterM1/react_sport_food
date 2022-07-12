import './tabs.scss';
import TabsItem from '../Tabs_Item/Tabs_Item';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setTabsItems} from '../../store/slice/slice';
import {AnimatePresence} from "framer-motion";


    

   
    const filtersItems = [
        'Добавки з колагеном',
        'Омега-3 і риб’ячий жир',
        'Передтренувальні добавки',
        'Амінокислоти',
        'Вітаміни'

    ]
const Tabs = ()=>{


    const tabsItems = useSelector(state => state.tabsItems);
    const dispatch = useDispatch();
    const [contantLoad, setContatnLoad] = useState(true);
    const [triggerNav, setTriggerNav] = useState(false);
    const [activeNav, setActiveNav] = useState(filtersItems[0]);
    


    const onClickNav = (item, i)=>{
        setActiveNav(item);
        onTriggerNav();
    }

    const onTriggerNav = ()=>{
        setTriggerNav(!triggerNav);
    }

    const fetchItems = ()=>{
        setContatnLoad(true);
        axios.get(`https://62af6c70b0a980a2ef400e96.mockapi.io/items?filter=${activeNav}`)
            .then(res=>{
                dispatch(setTabsItems(res.data));
                setContatnLoad(false);
            });
    }


    
    useEffect(()=>{
        fetchItems();
        
    },[activeNav]);

    const renders = tabsItems.map(item => (<TabsItem value={item} key={item.id}/>));

    return(
        <AnimatePresence initial={false}>

        <section className="tabs">
        <div className="container">
            <div className="tabs-nav">
                <span className="tabs-nav__filter">Категорії :</span>
                <div className='tabs-nav__active'
                    onClick={onTriggerNav}
                >{activeNav}</div>
                 <ul 
                 className={triggerNav ? 'active' : ''}
                    >
                    { filtersItems.map((item, i)=>{
                        return(
                            <li 
                            className={item === activeNav ? 'active ' : ''} 
                             key={i}
                             onClick={()=>onClickNav(item)}>
                                {item}
                               
                             </li>
                        )
                    })}
                    
                </ul>
                
            </div>

            <div className="tabs-wrapper active ">
               
                {contantLoad ? <Spinner/> : renders } 
            </div>
        </div>
    </section>
    </AnimatePresence>
    )
}



export default Tabs;