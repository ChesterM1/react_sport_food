import { configureStore } from '@reduxjs/toolkit'
import stateSlice from './slice/slice';

const store = configureStore({
  reducer: stateSlice,
  
   
  
})

export default store;