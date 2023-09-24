import { Categories } from "./Categories";

export const item1 = {
    name: 'McDonalds',
    amount: 6.98,
    date: 'Sept 3rd',
    category: Categories.Other.icon,
    subCategory: Categories.Other.subs.FastFood,
    priority: false
};

export const item2 = {
    name: 'Gas',
    amount: 84.82,
    date: 'Sept 10th',
    category: Categories.Car.icon,
    subCategory: Categories.Car.subs.Gas,
    priority: true
};

export const item3 = {
    name: 'Rent',
    amount: 700,
    date: 'Sept 14th',
    category: Categories.Rent.icon,
    subCategory: null,
    priority: true
};