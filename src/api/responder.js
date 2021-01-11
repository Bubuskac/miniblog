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

    delete(data) {
        const {token: token, deleteElement: item} = data;
        const user = dataManager.getUser(token);
        let result = { success: true };
        if (user) {
            try {
                dataManager.removeItem(user.userId, item);
            } catch (e) {
                result.success = false;
                result.message = 'Error';
            }
        } else {
            result.success = false;
            result.message = 'Invalid Token';
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