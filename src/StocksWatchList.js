import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import './StocksWatchList.css'
import ApiStock from './ApiStock'
import Api from './Api'
import StockWatch from './StockWatch'
import StockContext from './StockContext'

function StocksWatchList() {
    const history = useHistory();
    const [stockErr, setStockErr] = useState(null);
    const [stockData, setStockData] = useState([]);
    const {user, stocksWatch, addStockWatch} = useContext(StockContext);

    if (!user) {
        history.push('/')
    }

    // get data about stocks the user is currently watching
    useEffect(() => {
        async function getStockData() {
            let resp = await ApiStock.getStocks(stocksWatch);
            setStockData(resp);
        }

        getStockData();
    }, [])

    async function handleClick(e) {
        e.preventDefault();
        const symbol = document.getElementById('stock');
        
        if (!symbol.value) {
            setStockErr('Please enter a ticker symbol');
            return;
        }
        
        // get data from API about stock user wants to watch.
        // if error, display error message
        try {
            const resp = await ApiStock.getSymbol(symbol.value);
            if (resp.length === 0) {
                setStockErr('Invalid ticker symbol');
                return;
            }
            if (stockErr) {
                setStockErr(null);
                return;
            }

            setStockData([...stockData, {ticker: resp[0].symbol, price: resp[0].price, changePercent: resp[0].changesPercentage, name: resp[0].name}]);
        } catch(e) {
            console.log('error ', e);
        }
        
        const addResp = await Api.addStock(user, symbol.value);
        addStockWatch(symbol.value);
        symbol.value = '';
    }

    return (
        <div className='StocksWatch'>
            <h3>Enter ticker symbol of stock you want to watch</h3>
            <div className='container-fluid'>
                <div className='row justify-content-around'>
                    <div className='col-2'>
                        <Card className='card'>
                            <CardBody>
                                <form>
                                    <div className='form-group'>
                                        <label className='StockWatchLabel'>Stock Ticker:</label>
                                        <input className='form-control'
                                            type='text'
                                            id='stock'
                                            required
                                        />
                                        <small className='StockErr'>{stockErr}</small>
                                    </div>
                                    <button onClick={handleClick} className='addStock-btn btn btn-primary'>Add</button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-5'>
                        {stockData.length > 0 &&
                            <StockWatch stockData={stockData} showDelete='1' />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StocksWatchList