import axios from 'axios'

// Financial Modeling Prep API to get stock/index information
const BASE_URL = 'https://financialmodelingprep.com/api/v3'
const API_KEY = 'ea6fdddfe27a005ef2b486189ef2f65a'

class StockLookupApi {

    static async getSymbol(symbol) {
        try {
            const resp = await axios(`${BASE_URL}/quote/${symbol}?apikey=${API_KEY}`);
            return (resp.data);
        } catch (e) {
            console.log('error ', e);
        }
    }

    static async getStocks(stockArr) {
        const outArr = []
        
        for (let i = 0; i < stockArr.length; i++) {
            try {
                const resp = await axios(`${BASE_URL}/quote/${stockArr[i]}?apikey=${API_KEY}`);
                let stockObj = {ticker: resp.data[0].symbol, price: resp.data[0].price, changePercent: resp.data[0].changesPercentage, name: resp.data[0].name};
                outArr.push(stockObj) 
            } catch (e) {
                console.log('get stocks from api error', e);
            }
        }
        return (outArr);
    }
    
    static async getStockOwn(stock) {
        let stockObj;
        try {
            const resp = await axios(`${BASE_URL}/quote/${stock}?apikey=${API_KEY}`);
            stockObj = {
                ticker: resp.data[0].symbol, 
                name: resp.data[0].name, 
                price: resp.data[0].price, 
                changePercent: resp.data[0].changesPercentage,
                change: resp.data[0].change
            }
        } catch (e) {
            console.log('error getting stock own ', e);
        }
        return (stockObj);
    }

    static async getIndexWatch(index) {
        let resp;
        try {
            resp = await axios(`${BASE_URL}/quote/%5E${index}?apikey=${API_KEY}`);
        } catch (e) {
            console.log('error getting index ', e);
        }
        return (resp.data);
    }

    static async getMarketStatus() {
        let resp;
        try {
            resp = await axios(`${BASE_URL}/market-hours?apikey=${API_KEY}`);
        } catch (e) {
            console.log('error getting hours ', e);
        }
        console.log('response hours ', resp);
        return (resp);
    }
}

export default StockLookupApi