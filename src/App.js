
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import  store  from './store/store';
import { Provider } from 'react-redux';
import Home from './components/pages/Home';
import Card from './components/Card/Card';
import ItemPage from './components/pages/Item_page';
import OrderForm from './components/Card/Order_form/Order_form';

function App() {
 
  return(
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="card" element={<Card/>}/>
        <Route path={'/item/:itemId'} element={<ItemPage/>}/>
        <Route path='card/order' element={<OrderForm/>}/>
          
        </Routes>
      </BrowserRouter>
    </Provider>
    
    
    </>
   
  )
}

export default App;
