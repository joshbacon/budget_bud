import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Item {

    constructor(data) {
        this.name = data.name
        this.amount = parseFloat(data.amount);
        this.date = new Date(data.date);
        this.category = data.category;
        this.subCategory = data.subCategory;
        this.priority = data.priority;
    }

    data() {
        return {
            name: this.name,
            amount: this.amount,
            date: this.date,
            category: this.category,
            subCategory: this.subCategory,
            priority: this.priority
        }
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            amount: this.amount,
            date: this.date,
            category: this.category,
            subCategory: this.subCategory,
            priority: this.priority,
        });
    }

    getName() {
        return this.name;
    }

    getAmount() {
        return this.amount;
    }

    getDate() {
        return this.date;
    }

    getCategory() {
        return this.category;
    }

    getSubCategory() {
        return this.subCategory;
    }

    getPriority() {
        return this.priority;
    }

    async save() {
        AsyncStorage.getItem('expenses').then(result => {
            if (result === null) {
                AsyncStorage.setItem('expenses', JSON.stringify([this.data()]));
            } else {
                let temp = JSON.parse(result);
                temp.push(this.data());
                AsyncStorage.setItem('expenses', JSON.stringify(temp));
            }
        });
    }

}
