const fs = require('fs');

class dataManager {
    db = JSON.parse(fs.readFileSync("database.json", "utf8"));

    addNewItem(item) {
        item.id = this.db.length;
        this.db.push(item);
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }

    emptyList(userId) {
        this.db.lists[userId] = [];
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }

    removeItem(userId, item) {
        this.db.lists[userId] = this.db.lists[userId].filter((element) => element !== item);
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }

    getAll() {
        return this.db;
    }
}

module.exports = new dataManager();