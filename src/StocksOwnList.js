import { useState, useContext, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import './StocksOwnList.css'
import Api from './Api'
import ApiStock from './ApiStock'
import StockOwn from './StockOwn'
import StockContext from './StockContext'

function StocksOwnList() {
    const {user, stocksOwn, addStockOwn} = useContext(StockContext);
    const [stockOwnData, setStockOwnData] = useState([]);
    const [tickErr, setTickErr] = useState(null);
    const [dateErr, setDateErr] = useState(null);
    const [priceErr, setPriceErr] = useState(null);
    const [qtyErr, setQtyErr] = useState(null);

    useEffect(() => {
        async function getStockOwnData() {
            const stockArr = [];
            for (let i = 0; i < stocksOwn.length; i++) {
                let ownInfo = await ApiStock.getStockOwn(stocksOwn[i].ticker);
                
                let stockObj = stocksOwn[i];
                stockObj.name = ownInfo.name;
                stockObj.price = ownInfo.price;
                stockObj.changePercent = ownInfo.changePercent;
                stockObj.change = ownInfo.change;
                stockArr.push(stockObj);
            }
            setStockOwnData(stockArr);
        }

        getStockOwnData();
    }, [])

    async function handleClick(e) {
        e.preventDefault(e);
        const stock = document.getElementById('stock');
        const date = document.getElementById('date');
        const price = document.getElementById('price');
        const qty = document.getElementById('qty');
        let errText;
        let respStockOwn;

        const pos = price.value.indexOf('.');
        if (price.value.slice(pos+1).length > 2) {
            setPriceErr('only 2 decimals allowed');
            return;
        };

        try {
            respStockOwn = await ApiStock.getSymbol(stock.value);
            if (respStockOwn.length === 0) {
                setTickErr('Invalid ticker symbol');
                return;
            }
            if (tickErr) {
                setTickErr(null);
                return;
            }
        }  catch(e) {
            console.log('error ', e);
        }

        // will check response from adding stock a user owns, if
        // errors, they will be displayed.
        const resp = await Api.addStockOwn(user, stock.value, date.value, price.value, qty.value);
        if (!resp.stockOwn) {
            const tickError = resp.filter(r => r.includes('ticker'));
            if (tickError.length > 0) {
                errText = tickError[0].slice(tickError[0].indexOf('ticker') + 'ticker'.length);
                setTickErr(errText);
            } else if (tickErr) {
                setTickErr(null);
            }
            const dateError = resp.filter(r => r.includes('date_bought'));
            if (dateError.length > 0) {
                errText = dateError[0].slice(dateError[0].indexOf('date_bought') + 'date_bought'.length);
                setDateErr(errText);
            } else if (dateErr) {
                setDateErr(null);
            }
            const priceError = resp.filter(r => r.includes('price'));
            if (priceError.length > 0) {
                errText = priceError[0].slice(priceError[0].indexOf('price') + 'price'.length);
                setPriceErr(errText);
            } else if (priceErr) {
                setPriceErr(null);
            }
            const qtyError = resp.filter(r => r.includes('qty'));
            if (qtyError.length > 0) {
                errText = qtyError[0].slice(qtyError[0].indexOf('qty') + 'qty'.length);
                setQtyErr(errText);
            } else if (qtyErr) {
                setQtyErr(null);
            }
            return;
        }

        setStockOwnData([...stockOwnData, 
                {id: resp.stockOwn.id,
                 ticker: respStockOwn[0].symbol, 
                 name: respStockOwn[0].name,
                 price: respStockOwn[0].price, 
                 changePercent: respStockOwn[0].changesPercentage,
                 change: respStockOwn[0].change,
                 date: date.value,
                 pricepaid: +price.value,
                 qty: +qty.value}]);
        
        addStockOwn({id: resp.stockOwn.id,
                     ticker: stock.value, 
                     date: date.value,
                     pricepaid: price.value,
                     qty: qty.value,
                    });

        stock.value = '';
        date.value = '';
        price.value = '';
        qty.value = '';
    }

    return (
        <div className='StocksOwn'>
            <h3>Enter all data for stocks that you own</h3>
            <div className='container-fluid'>
                <div className='row justify-content-around'>
                    <div className='col-3'>
                        <Card className='card'>
                            <CardBody>
                                <form>
                                    <div className='form-group'>
                                        <label className='StockOwnLabel'>Stock Ticker:</label>
                                        <input className='form-control'
                                            type='text'
                                            id='stock'
                                            required
                                        />
                                        <small className='StockErr'>{tickErr}</small>
                                        {tickErr && <br></br>}
                                        <label className='StockOwnLabel'>Date Bought:</label>
                                        <input className='form-control'
                                            type='date'
                                            id='date'
                                            required
                                        />
                                        <small className='StockErr'>{dateErr}</small>
                                        {dateErr && <br></br>}
                                        <label className='StockOwnLabel'>Price Paid:</label>
                                        <input className='form-control'
                                            type='number'
                                            id='price'
                                            required
                                        />
                                        <small className='StockErr'>{priceErr}</small>
                                        {priceErr && <br></br>}
                                        <label className='StockOwnLabel'>Qty Bought:</label>
                                        <input className='form-control'
                                            type='number'
                                            id='qty'
                                            required
                                        />
                                        <small className='StockErr'>{qtyErr}</small>
                                        {qtyErr && <br></br>}
                                    </div>
                                    <button onClick={handleClick} className='btn btn-primary own-add'>Add</button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-9'>
                        {stockOwnData.length > 0 &&
                            <StockOwn stockOwnData={stockOwnData} showDelete='1'/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StocksOwnList