import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Item {

    constructor(data) {
        this.name = data.name
        this.amount = parseFloat(data.amount);
        this.date = data.date;
        this.category = data.category;
        this.subCategory = data.subCategory;
        this.priority = data.priority;
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

    getAmount() {
        return this.amount;
    }

    getDate() {
        return this.date;
    }

    inRange(startDate, endDate) {
        return this.date >= startDate && this.date <= endDate;
    }

    getType() {
        return this.type;
    }

    getPriority() {
        return this.priority
    }

    async save() {
        // change this to read in an expenses key
        // - need to store budget and savings stuff and it seems weird to have those keys mixed in with a bunch of dates
        AsyncStorage.setItem(this.date.toString(), this.toString());
        // AsyncStorage.getAllKeys().then(result => {
        //     console.log(JSON.parse(result));
        // });
    }

}
