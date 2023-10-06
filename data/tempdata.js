import Categories from "./Categories";

export const item1 = {
    name: 'McDonalds',
    amount: 6.98,
    date: 'Sept 3rd, 2023',
    category: Categories.Other.icon,
    subCategory: Categories.Other.subs.FastFood,
    priority: false
};

export const item2 = {
    name: 'Gas',
    amount: 84.82,
    date: 'Sept 10th, 2023',
    category: Categories.Car.icon,
    subCategory: Categories.Car.subs.Gas,
    priority: true
};

export const item3 = {
    name: 'Rent',
    amount: 700,
    date: 'Sept 14th, 2023',
    category: Categories.Rent.icon,
    subCategory: null,
    priority: true
};






const budgetData = {
    'Utilities': {
        'Power': 0,
        'Oil': 0,
        'WiFi': 0
    },
    'Car': {
        'Payment': 0,
        'Insurance': 0,
        'Gas': 0,
        'Maintenance': 0
    },
    'Recurring': 0,
    'Groceries': 0,
    'Rent': 0,
    'Other': {
        'Clothes': 0,
        'Tech': 0,
        'FastFood': 0,
        'Travel': 0,
        'Gifts': 0,
        'Misc': 0
    }
};

const savingsData = [
    {
        name: 'Jamaica',
        amount: 1000,
        goal: 2000
    },
    {
        name: 'Europe',
        amount: 1000,
        goal: 5000
    },
    {
        name: 'Concerts',
        amount: 1000,
        goal: 3500
    },
    {
        name: 'Car',
        amount: 1000,
        goal: 10000
    }
];

const expensesData = [
    item1, item2, item3 // but like the actual object things
];