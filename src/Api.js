import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001'

class StockTrackerApi {
    static token;

    static setToken(token) {
        this.token = token;
    }

    static async request(endpoint, data={}, method="get") {
        // const url = `${BASE_URL}/${endpoint}`
        console.log('in request function');
        const url = `${BASE_URL}${endpoint}`
        if (typeof this.token === 'undefined') {
            if (localStorage.getItem('stocktracker')) {
                const stocktracker = localStorage.getItem('stocktracker');
                const stockObj = JSON.parse(stocktracker);
                this.token = stockObj.token;
            }
        }
        // const headers = { 'Access-Control-Allow-Credentials': true,
        //                   'Access-Control-Allow-Origin': 'https://stock-tracker-front.herokuapp.com',
        //                   'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
        //                   'Access-Control-Allow-Headers': 'application/json',
        //                   Authorization: `Bearer ${StockTrackerApi.token}`};
        const headers = { Authorization: `Bearer ${StockTrackerApi.token}`};
        const params = {};
        // const mode = 'no-cors';

        try {
            const resp = await axios({ url, method, data, params, headers, crossDomain: true });
            return resp.data
        } catch (e) {
            let message = e.response;
            return (message.data.error);
        }
    }

    static async signup(username, password, firstName, lastName, email) {
        console.log('in signup method from front end');
        const data = {username, password, firstName, lastName, email}
        const method = "post"
        try {
            const resp = await this.request('auth/register', data, method);
            if (resp.token) {
                this.token = resp.token;
                const stocktracker = {'token': this.token, 'username': username};
                localStorage.setItem('stocktracker', JSON.stringify(stocktracker));
                return ('signed up');
            } else {
                return resp;
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async login(username, password) {
        const data = {username, password};
        const method = "post";
        try {
            const resp = await this.request('auth/token', data, method);
            if (resp.token) {
                this.token = resp.token;
                const stocktracker = {'token': this.token, 'username': username};
                localStorage.setItem('stocktracker', JSON.stringify(stocktracker));
                return ('logged in');
            } else {
                return resp;
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async addStock(username, stock) {
        const data = {username, stock}
        const method = 'post';
        try {
            const resp = await this.request('stock/watch', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async getStocksWatch(username) {
        const data = {username}
        const method = 'post';
        try {
            const resp = await this.request('stock/watchAll', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async addStockOwn(username, ticker, date_bought, price, qty) {
        const data = {username, ticker, date_bought, price, qty}
        const method = 'post';
        try {
            const resp = await this.request('stock/own', data, method);
            return(resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async getStocksOwn(username) {
        const data = {username}
        const method = 'post';
        try {
            const resp = await this.request('stock/ownAll', data, method);
            resp.stocksOwn.pricepaid = +resp.stocksOwn.pricepaid;
            return (resp.stocksOwn);
        } catch (e) {
            console.log(e);
        }
    }

    static async getIndexes() {
        try {
            const resp = await this.request('index/watch');
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async setIndexes(user, idxArr) {
        const data = {username: user, indices: idxArr};
        const method = 'post';
        try {
            const resp = await this.request('index/watch', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async getIndexWatch(username) {
        const data = {username};
        const method = 'post';
        try {
            const resp = await this.request('index/userWatch', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async getIndexThree() {
        try {
            const resp = await this.request('index/three');
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async deleteWatch(username, stock) {
        const data = {username, stock};
        const method = 'delete';
        try {
            const resp = await this.request('stock/watch', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async deleteOwn(id) {
        const data = {id};
        const method = 'delete';
        try {
            const resp = await this.request('stock/own', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async getUserInfo(username) {
        const data = {username};
        const method = 'post';
        try {
            const resp = await this.request('users/profile', data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }

    static async updateInfo(id, data) {
        const method = 'patch';
        try {
            const resp = await this.request(`users/${id}`, data, method);
            return (resp);
        } catch (e) {
            console.log(e);
        }
    }
}

export default StockTrackerApi