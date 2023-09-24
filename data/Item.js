export default class Item {

    Item(data) {
        this.name = data.name
        this.amount = parseFloat(data.amount);
        this.date = Date.parse(data.date);
        this.category = data.category;
        this.subCategory = data.subCategory;
        this.priority = data.priority;
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

}
