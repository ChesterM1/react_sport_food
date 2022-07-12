import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { debounce } from "debounce";
import "./order_form.scss";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {cardDltAll, setCardThanksBlock, setCardErrorBlock} from '../../../store/slice/slice';
import ThanksBlock from "./ThanksBlock/ThanksBlock";
import NotFound from "../../404/NotFound";

const OrderForm = () => {

    const [cityValue, setSityValue] = useState(null);
    const dispatch = useDispatch();
    const [cityField, setCityField] = useState([]);
    const [warhauseField, setWarhauseField] = useState(null);
    const cityRef = useRef("");
    const {cardItems, cardThanksBlock, cardErrorBlock} = useSelector(state => state);

    const schema = yup.object({
        name: yup
            .string()
            .required("Обовьязково для заповнення")
            .min(3, "Мiнiмум 3 символа")
            .max(20, "Максимум 20 символiв"),
        surName: yup
            .string()
            .required("Обовьязково для заповнення")
            .min(3, "Мiнiмум 3 символа")
            .max(20, "Максимум 20 символiв"),
        phone: yup
            .string()
            .required("Обовьязково для заповнення")
            .min(9, "Мiнiмум 9 цифр")
            .max(16, "Максимум 16 цифр")
            .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9,14}(\s*)?$/, "Тiльки цифри"),
        city: yup.string().required("Обовьязково для заповнення"),
        warehouses: yup.string().required("Обовьязково для заповнення"),
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
         resolver: yupResolver(schema),
         mode: 'onBlur',
         defaultValues: {
            phone : '+380'
         },
         });
         

    const onSubmit = (data) => {
        const TOKEN = '5496292118:AAEOxx-eGOcLsj2xIS49zYLMObxK6N7fZFg'; 
        const CHAT_ID = '-1001737490828';
        const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        const arr = cardItems.map(item=>{
            let string =
           `<b>💊Наименование : \n${item.title}</b>\n`
           +`<b>💊Обьем : \n${item.weight || item.amount}</b>\n`
           +`<b>💊Количество : \n${item.count}</b>\n`
           +`<b>💰Цена : \n${item.price}</b>\n`
           +`___________________________ \n`
           return string
       });

        let message = `<b>Заявка с сайта</b>\n`;
            message += `<b>🧔ФИО : \n${data.surName} ${data.name}</b>\n`;
            message += `<b>☎️Телефон : \n${data.phone}</b>\n`;
            message += `<b>🏬Город : \n${data.city}</b>\n`;
            message += `<b>📦Номер отделения новой почты : \n${data.warehouses}</b>\n`;
            message += arr.join([,]);
            
            axios.post(URL_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message,
            })
            .then(() => {
                console.log('Успех');
                reset();
                dispatch(cardDltAll());
                dispatch(setCardThanksBlock(true));
            })
            .catch(() => {
                dispatch(setCardErrorBlock(true));
                console.log('ошибка');
            })
    };

    const watchInputCity = watch("city");
    const watchInputWarehouses = watch("warehouses");

    const targetCity = (item) => {
        setSityValue(item.Present); 
        setValue("warehouses", '');
        setValue("city", item.Present);
        cityRef.current = item.DeliveryCity;
        setCityField([]);
    };

    const getCity = () => {
        if (cityValue === watchInputCity) {
            return;
        }
        if( watchInputCity === '' ){
            setValue("warehouses", '');
        }

        fetchCity(watchInputCity);
    };

    const getWarehouses = () => {
        if (!watchInputWarehouses) {
            return;
        }
        fetchWarehouses(watchInputWarehouses);
    };

    const targetWarehouses = (string) => {
        setValue("warehouses", string);
        setWarhauseField(null);
    };

    const fetchWarehouses = useCallback(
        debounce((string) => {
            axios
                .post("https://api.novaposhta.ua/v2.0/json/", {
                    apiKey: "1c1a05f2c6193418561c5722a2e6b62c",
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    methodProperties: {
                        Language: "ua",
                        CityRef: `${cityRef.current}`,
                        WarehouseId: `${string}`,
                    },
                })
                .then((res) => {
                    setWarhauseField(res.data.data[0].Description);
                })
                .catch(() => {
                    setWarhauseField(null);
                });
        }, 300),
        []
    );

    const fetchCity = useCallback(
        debounce((string) => {
            axios
                .post("https://api.novaposhta.ua/v2.0/json/ ", {
                    apiKey: "1c1a05f2c6193418561c5722a2e6b62c",
                    modelName: "Address",
                    calledMethod: "searchSettlements",

                    methodProperties: {
                        CityName: `${string}`,
                        Limit: "10",
                        Page: "1",
                    },
                })
                .then((res) => {
                    setCityField(res.data.data[0].Addresses);
                })
                .catch(() => {
                    setCityField([]);
                });
        }, 300) ,
        []
    );

    useEffect(() => {
        getCity();
        getWarehouses();
    }, [watchInputCity, watchInputWarehouses]);

    if(cardThanksBlock){
        return <ThanksBlock/>
    }else if(cardErrorBlock){
        return <NotFound/>
    }

    return (
        <section className="order">
            <div className="container">
                <div className="order__wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-block">
                        <label htmlFor="name">Iм'я</label>
                        <input name="name" {...register("name")}
                         style={!errors.name ? {border: '1px solid rgba(255, 255, 255, 0)'}: {border: '1px solid #ff000096'} }/>
                        {errors?.name && <div className="error">{errors.name.message}</div>}
                    </div>
                    <div className="input-block">
                        <label htmlFor="surName">Прізвище</label>
                        <input name="surName" {...register("surName")} 
                        style={!errors.surName ? {border: '1px solid rgba(255, 255, 255, 0)'}: {border: '1px solid #ff000096'} }/>
                        {errors?.surName && <div className="error">{errors.surName.message}</div>}
                    </div>
                    <div className="input-block">
                        <label htmlFor="phone">Телефон</label>
                        <input name="phone" {...register("phone")} 
                        style={!errors.phone ? {border: '1px solid rgba(255, 255, 255, 0)'}: {border: '1px solid #ff000096'} }/>
                        {errors?.phone && <div className="error">{errors.phone.message}</div>}
                    </div>
                    <div className="input-block">
                        <label htmlFor="city">Населений пункт</label>
                        <input name="city" {...register("city")} 
                        style={!errors.city ? {border: '1px solid rgba(255, 255, 255, 0)'}: {border: '1px solid #ff000096'} }/>
                        {watchInputCity && <svg onClick={()=> setValue("city", '')} width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545524 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545524 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838648 7.36965 0.838648 8.04086 1.25258 8.45479C1.66651 8.86872 2.33771 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z" fill="#D0D0D0"/>
                        </svg>}
                        {cityField && (
                            <div className="drop-down city">
                                <ul>
                                    {cityField.map((item, i) => {
                                        return (
                                            <li
                                                key={i}
                                                onClick={() => targetCity(item)}
                                            >
                                                <span>{item.Present}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                        {errors?.city && <div className="error">{errors.city.message}</div>}
                    </div>
                    <div className="input-block">
                        <label htmlFor="warehouses">
                            Номер вiддiлення, або поштомату нової пошти
                        </label>
                        <input
                            name="warehouses"
                            {...register("warehouses")}
                            disabled={ !watchInputCity && true}
                            style={!errors.warehouses ? {border: '1px solid rgba(255, 255, 255, 0)'}: {border: '1px solid #ff000096'} }/>
                         {watchInputWarehouses && <svg className="warehouses" onClick={()=> setValue("warehouses", '')} width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545524 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545524 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838648 7.36965 0.838648 8.04086 1.25258 8.45479C1.66651 8.86872 2.33771 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z" fill="#D0D0D0"/>
                        </svg>}
                        {warhauseField && (
                            <div className="drop-down warehouses">
                                <ul>
                                    <li
                                        onClick={() =>
                                            targetWarehouses(warhauseField)
                                        }
                                    >
                                        <span>{warhauseField}</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {errors?.warehouses && (
                            <div className="error">{errors.warehouses.message}</div>
                        )}
                    </div>
                    
                    <div className="buttons">
                        <Link to='/card'>
                        <button className="back">Назад</button>
                        </Link>
                        
                        <button className= 'submit' type="submit">Пiдтвердити</button>
                    </div>
                </form>
                </div>
            </div>
        </section>
    );
};

export default OrderForm;



