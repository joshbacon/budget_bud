const initState = {
    dateRange: 'week',
    currExpenses: [],
    prevExpenses: []
}

export default function expenses(state = initState, action) {
    switch (action.type) {
        case 'SET_RANGE':
            return {
                ...state,
                dateRange: action.payload
            };
        case 'SET_CURR_EXPENSES':
            return {
                ...state,
                currExpenses: action.payload
            };
        case 'SET_PREV_EXPENSES':
            return {
                ...state,
                prevExpenses: action.payload
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                currExpenses: [
                    ...state.currExpenses,
                    action.payload
                ]
            };
        default:
            return state;
    }
}


// what data do we need??

/*

dateRange

expenses


*/