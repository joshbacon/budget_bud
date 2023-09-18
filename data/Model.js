export default class Item {

    Item(data) {
        this.amount = parseFloat(data.amount);
        this.date = Date.parse(data.date);
        this.type = data.type;
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
