const fs = require('fs');

class dataManager {
    db = JSON.parse(fs.readFileSync("database.json", "utf8"));

    addNewItem(item) {
        item.id = this.db.nextId;
        this.db.nextId++;
        this.db.list.push(item);
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }

    updateItem(item) {
        let i = 0;
        while (item.id != this.db.list[i].id) {
            i++;
        }
        this.db.list[i] = item;
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }

    removeItem(id) {
        let i = 0;
        while (i < this.db.list.length) {
            if (this.db.list[i].id == id) {
                this.db.list.splice(i, 1);
                break;
            }
            i++;
        }
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }

    getAll() {
        return this.db.list;
    }
}

module.exports = new dataManager();