import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Item {

    constructor(data) {
        this.name = data.name
        this.amount = parseFloat(data.amount);
        this.date = Date.parse(data.date);
        this.category = data.category;
        this.subCategory = data.subCategory;
        this.priority = data.priority;
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            amount: this.amount,
            date: this.date.toString(),
            category: this.category,
            subCategory: this.subCategory,
            priority: this.priority,
        });
    }

    getAmount() {
        return this.amount;
    }

    getDate() {
        return this.date;
    }

    getType() {
        return this.type;
    }

    getPriority() {
        return this.priority
    }

    async save() {
        AsyncStorage.getItem('expenses').then(result => {
            JSON.parse(result).push(this.toString());
            AsyncStorage.setItem('expenses', JSON.stringify(result));
        });
    }

}
