import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counterValue: 1,
    tabsItems: [],
    cardItems: [],
    cardTotalSum: 0,
    cardTotalItem: 0,
};

const stateSlice = createSlice({
    name: "stateSlice",
    initialState,
    reducers: {
        plusCount(state) {
            if (state.counterValue >= 99) {
                return state;
            }

            state.counterValue = state.counterValue + 1;
        },
        minusCount(state) {
            if (state.counterValue <= 1) {
                return state;
            }
            state.counterValue = state.counterValue - 1;
        },
        setCount(state, action) {
            if (!action.payload || action.payload > 99) {
                return state;
            }
            state.counterValue = action.payload;
        },
        setTabsItems(state, action) {
            state.tabsItems = action.payload;
        },
        addCardItems(state, action) {
            const itemCount = state.cardItems.find(
                (item) => item.id === action.payload.id
            );

            if (itemCount) {
                itemCount.count += state.counterValue;
            } else {
                state.cardItems.push(action.payload);
            }
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
        cardItemPlus(state, action) {
            const item = state.cardItems.find(
                (elem) => elem.id === action.payload
            );
            if (item.count >= 99) {
                return state;
            }
            item.count += 1;
            state.cardTotalSum = state.cardTotalSum + parseInt(item.price);
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
        cardItemMinus(state, action) {
            const item = state.cardItems.find(
                (elem) => elem.id === action.payload
            );

            if (item.count <= 1) {
                return state;
            }
            item.count = item.count - 1;
            state.cardTotalSum = state.cardTotalSum - parseInt(item.price);
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
        setItemNum(state, action) {
            const item = state.cardItems.find(
                (elem) => elem.id === action.payload.id
            );

            if (!action.payload.count || action.payload.count > 99) {
                return state;
            }

            item.count = action.payload.count;
            state.cardTotalSum = state.cardItems.reduce(
                (acum, prev) => acum + parseInt(prev.price) * prev.count,
                0
            );
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
        totalSum(state, action) {
            state.cardTotalSum += action.payload * state.counterValue;
        },
        cardDltAll(state) {
            state.cardItems = [];
            state.cardTotalSum = 0;
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
        cardDltItem(state, action) {
            const item = state.cardItems.find(
                (elem) => action.payload === elem.id
            );

            state.cardTotalSum -= parseInt(item.price) * item.count;
            state.cardItems = state.cardItems.filter(
                (elem) => action.payload !== elem.id
            );
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
        cardItems(state) {
            state.cardTotalItem = state.cardItems.reduce(
                (acum, elem) => acum + elem.count,
                0
            );
        },
    },
});

export const {
    plusCount,
    minusCount,
    setCount,
    setTabsItems,
    getOneItems,
    addCardItems,
    totalSum,
    cardDltAll,
    cardDltItem,
    setItemNum,
    cardItemMinus,
    cardItemPlus,
    cardItems,
} = stateSlice.actions;
export default stateSlice.reducer;
