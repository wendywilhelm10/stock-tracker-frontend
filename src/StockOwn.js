import { useContext } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons' 
import CurrencyFormat from 'react-currency-format'
import StockContext from './StockContext'
import Api from './Api'
import './StockOwn.css'

function StockOwn({stockOwnData, showDelete}) {
    const {deleteStockOwn} = useContext(StockContext);

    let displayDate;

    for (let i = 0; i < stockOwnData.length; i++) {
        const currPrice = Math.round((stockOwnData[i].price + Number.EPSILON) * 100) / 100;
        stockOwnData[i].change = Math.round((stockOwnData[i].change + Number.EPSILON) * 100) / 100;
        stockOwnData[i].currPrice = currPrice;

        let todayGainLoss = stockOwnData[i].qty * stockOwnData[i].change;
        todayGainLoss = Math.round((todayGainLoss + Number.EPSILON) * 100) / 100;
        stockOwnData[i].todayGainLoss = todayGainLoss;

        let currentValue = stockOwnData[i].qty * stockOwnData[i].price;
        currentValue = Math.round((currentValue + Number.EPSILON) * 100) / 100;
        stockOwnData[i].currentValue = currentValue;

        let totalGainLoss = (stockOwnData[i].price - stockOwnData[i].pricepaid) * stockOwnData[i].qty;
        totalGainLoss = Math.round((totalGainLoss + Number.EPSILON) * 100) / 100;
        stockOwnData[i].totalGainLoss = totalGainLoss;

        let paidValue = stockOwnData[i].pricepaid * stockOwnData[i].qty;
        paidValue = Math.round((paidValue + Number.EPSILON) * 100) / 100;
        stockOwnData[i].paidValue = paidValue;

        let totalPercent = ((currentValue - paidValue) / paidValue) * 100;
        totalPercent = Math.round((totalPercent + Number.EPSILON) * 100) / 100;
        stockOwnData[i].totalPercent = totalPercent;

        if (stockOwnData[i].date.length >= 10) {
            displayDate = stockOwnData[i].date.substr(0, 10);
        } else {
            displayDate = stockOwnData[i].date;
        }
        stockOwnData[i].displayDate = displayDate;
    }

    console.log('stock own data after for loop ', stockOwnData);

    async function handleDelete(id) {
        console.log('id to delete ', id);
        const el = document.getElementById(id);
        const resp = await Api.deleteOwn(id);
        
        deleteStockOwn(id);

        if (resp.result === 'success') {
            el.remove();
        }
    }

    if (showDelete === '1') {
        return (
            <div className='StockOwn'>
                <Card className='card'>
                    <CardBody className='stockowndel-card'>
                        <div className='container-fluid'>
                            <div className='row ownheaddel-row'>
                                <div className='col-2 ownhead-symbol'>Symbol</div>
                                <div className='col-1 ownhead-right'>Last Price</div>
                                <div className='col-2 ownhead-right'>Today's Gain/Loss</div>
                                <div className='col-2 ownhead-right'>Total Gain/Loss</div>
                                <div className='col-2 ownhead-right'>Current Value</div>
                                <div className='col-1 ownhead-right'>Quantity</div>
                                <div className='col-1 ownhead-right'>Purchased</div>   
                            </div>
                            {stockOwnData.map((s, idx) => (
                                    <div key={idx} id={s.id}>
                                        <div className='row own-detail'>
                                            <div className='col-2 stockdelete-symbol'>{s.ticker}</div>
                                            <div className='col-1 stockdelete-right'><CurrencyFormat value={s.currPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            {s.todayGainLoss >= 0 &&
                                                <div className='col-2 stockdelete-right green-text'><CurrencyFormat value={s.todayGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            }
                                            {s.todayGainLoss < 0 &&
                                                <div className='col-2 stockdelete-right red-text'><CurrencyFormat value={s.todayGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            }
                                            {s.totalGainLoss >= 0 &&
                                                <div className='col-2 stockdelete-right green-text'><CurrencyFormat value={s.totalGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            }
                                            {s.totalGainLoss < 0 &&
                                                <div className='col-2 stockdelete-right red-text'><CurrencyFormat value={s.totalGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            }
                                            <div className='col-2 stockdelete-right'><CurrencyFormat value={s.currentValue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            <div className='col-1 stockdelete-right'>{s.qty}</div>
                                            <div className='col-1 stockowndel-right'>{s.displayDate}</div>
                                            <div className='col-1'>
                                                <FontAwesomeIcon className='watch-trash' onClick={() => handleDelete(s.id)} icon={faTrashAlt} />
                                            </div>
                                            <br></br>
                                            <div className='col-2 stockdelete-name'>{s.name}</div>
                                            {s.change >= 0 &&
                                                <div className='col-1 stockdelete-right green-text'>{s.change}</div>
                                            }
                                            {s.change < 0 &&
                                                <div className='col-1 stockdelete-right red-text'>{s.change}</div>
                                            }
                                            {s.changePercent >= 0 &&
                                                <div className='col-2 stockdelete-right green-text'>{s.changePercent}%</div>
                                            }
                                            {s.changePercent < 0 &&
                                                <div className='col-2 stockdelete-right red-text'>{s.changePercent}%</div>
                                            }
                                            {s.totalPercent >= 0 &&
                                                <div className='col-2 stockdelete-right green-text'>{s.totalPercent}%</div>
                                            }
                                            {s.totalPercent < 0 &&
                                                <div className='col-2 stockdelete-right red-text'>{s.totalPercent}%</div>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <div className='StockOwn'>
            <Card className='card'>
                <CardBody className='stockown-card ownhead'>
                    <div className='container-fluid'>
                        <CardTitle className='own-title'><h4><i>Own List</i></h4></CardTitle>
                        <div className='row ownhead-row'>
                            <div className='col-2 ownhead-symbol'>Symbol</div>
                            <div className='col-2 ownhead-right'>Last Price</div>
                            <div className='col-2 ownhead-right'>Today's Gain/Loss</div>
                            <div className='col-2 ownhead-right'>Total Gain/Loss</div>
                            <div className='col-2 ownhead-right'>Current Value</div>
                            <div className='col-1 ownhead-right'>Quantity</div>
                            <div className='col-1 ownhead-right'>Purchased</div>   
                        </div>
                        {stockOwnData.map((s, idx) => (
                                <div key={idx}>
                                    <div className='row own-detail'>           
                                        <div className='col-2 stockown-symbol'>{s.ticker}</div>
                                        <div className='col-2 stockown-right'><CurrencyFormat value={s.currPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        {s.todayGainLoss >= 0 &&
                                            <div className='col-2 stockown-right green-text'><CurrencyFormat value={s.todayGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        }
                                        {s.todayGainLoss < 0 &&
                                            <div className='col-2 stockown-right red-text'><CurrencyFormat value={s.todayGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        }
                                        {s.totalGainLoss >= 0 &&
                                            <div className='col-2 stockown-right green-text'><CurrencyFormat value={s.totalGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        }
                                        {s.totalGainLoss < 0 &&
                                            <div className='col-2 stockown-right red-text'><CurrencyFormat value={s.totalGainLoss} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        }
                                        <div className='col-2 stockown-right'><CurrencyFormat value={s.currentValue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        <div className='col-1 stockown-right'>{s.qty}</div>
                                        <div className='col-1 stockown-right'>{s.displayDate}</div>
                                        <br></br>
                                        <div className='col-2 stockown-name'>{s.name}</div>
                                        {s.change >= 0 &&
                                            <div className='col-2 stockown-right green-text'><CurrencyFormat value={s.change} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        }
                                        {s.change < 0 &&
                                            <div className='col-2 stockown-right red-text'><CurrencyFormat value={s.change} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        }
                                        {s.changePercent >= 0 &&
                                            <div className='col-2 stockown-right green-text'>{s.changePercent}%</div>
                                        }
                                        {s.changePercent < 0 &&
                                            <div className='col-2 stockown-right red-text'>{s.changePercent}%</div>
                                        }
                                        {s.totalPercent >= 0 &&
                                            <div className='col-2 stockown-right green-text'>{s.totalPercent}%</div>
                                        }
                                        {s.totalPercent < 0 &&
                                            <div className='col-2 stockown-right red-text'>{s.totalPercent}%</div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default StockOwn