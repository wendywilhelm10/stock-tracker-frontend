import { useState } from 'react'
import StockContext from './StockContext'

const StockProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [stocksWatch, setStocksWatch] = useState(null);
    const [stocksOwn, setStocksOwn] = useState([]);
    const [indexesWatch, setIndexesWatch] = useState([]);
    const [indexThree, setIndexThree] = useState([]);
    
    const userLoggedIn = (userName) => {
        setUser(userName);
    }
    const addStockWatch = (stock) => {
        setStocksWatch([...stocksWatch, stock]);
    }
    const initStocksWatch = (arrStocks) => {
        setStocksWatch(arrStocks);
    }
    const deleteStockWatch = (stock) => {
        const newStockArr = stocksWatch.filter(s => s !== stock);
        setStocksWatch(newStockArr);
    }
    const addStockOwn = (stockOwn) => {
        setStocksOwn([...stocksOwn, stockOwn]);
    }
    const initStocksOwn = (arrStocksOwn) => {
        setStocksOwn(arrStocksOwn);
    }
    const deleteStockOwn = (id) => {
        const newStockOwnArr = stocksOwn.filter(s => {
            if (s.id !== id) {
                return;
            }
        })
        setStocksOwn(newStockOwnArr);
    }
    const initIndexesWatch = (arrIndexWatch) => {
        setIndexesWatch(arrIndexWatch);
    }
    const initIndexThree = (arrIndexThree) => {
        setIndexThree(arrIndexThree);
    }
    
    return (
        <StockContext.Provider value={{user, 
            userLoggedIn, 
            stocksWatch, 
            addStockWatch, 
            initStocksWatch,
            deleteStockWatch,
            stocksOwn,
            addStockOwn,
            initStocksOwn,
            deleteStockOwn,
            indexesWatch,
            indexThree,
            initIndexesWatch,
            initIndexThree}}>
            {children}
        </StockContext.Provider>
    )
}

export default StockProvider