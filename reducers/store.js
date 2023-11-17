import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import expenses from './ExpenseReducer';

const reducers = combineReducers({
    expenses
});

export default store = configureStore({
    reducer: reducers
});