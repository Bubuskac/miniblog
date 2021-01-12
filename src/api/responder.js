const dataManager = require('./dataManager.js');

class responder {
    
    add(data) {
        let result = { success: true };
        try {
            dataManager.addNewItem(data);
        } catch (e) {
            result.success = false;
            result.message = 'Error';
        }
        return result;
    }

    update(data) {
        let result = { success: true };
        try {
            dataManager.updateItem(data);
        } catch (e) {
            result.success = false;
            result.message = 'Error';
        }
        return result;
    }

    delete(data) {
        let result = { success: true };
        try {
            dataManager.removeItem(data.id);
        } catch (e) {
            result.success = false;
            result.message = 'Error';
        }
        return result;
    }

    list() {
        let result = { success: true };
        result.list = dataManager.getAll();
        return result;
    }
}

module.exports = new responder();