import { Card, CardBody, CardTitle } from 'reactstrap'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons' 
import StockContext from './StockContext'
import CurrencyFormat from 'react-currency-format'
import Api from './Api'
import './StockWatch.css'

function StockWatch({stockData, showDelete}) {
    const {user, deleteStockWatch} = useContext(StockContext);
    const history = useHistory();

    if (!user) {
        history.push('/');
    }

    if (!stockData) {
        return (
            <div></div>
        )
    }

    async function handleDelete(ticker) {
        const el = document.getElementById(ticker);
        const resp = await Api.deleteWatch(user, ticker);
        
        deleteStockWatch(ticker);

        if (resp.result === 'success') {
            el.remove();
        }
    }

    for (let i = 0; i < stockData.length; i++) {
        stockData[i].changePercent = Math.round((stockData[i].changePercent + Number.EPSILON) * 100) / 100;
        stockData[i].price = Math.round((stockData[i].price + Number.EPSILON) * 100) / 100;
    }

    if (showDelete === '1') {
        return (
            <div className='Stock'>
                <Card className='card'>
                    <CardBody className='stockdelete-card'>
                        <div className='container-fluid'>                                   
                            <div className='row watchheaddel-row'>
                                <div className='col-4 watchhead-symbol'>Symbol</div>
                                <div className='col-4 watchhead-right'>Change</div>
                                <div className='col-3 watchhead-right'>Last Price</div>
                            </div>
                            {stockData.map((s, idx) => (
                                    <div key={idx} id={s.ticker}>
                                        <div className='row watch-detail'>
                                            <div className='col-4 stockdelete-symbol' id='stockTicker'>{s.ticker}</div>
                                            {s.changePercent < 0 && 
                                                <div className='col-4 stockdelete-right red-text'>{s.changePercent}%</div>
                                            }
                                            {s.changePercent >= 0 &&
                                                <div className='col-4 stockdelete-right green-text'>{s.changePercent}%</div>
                                            }
                                            <div className='col-3 stockdelete-right'><CurrencyFormat value={s.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                            <div className='col-1'>
                                                <FontAwesomeIcon className='watch-trash' onClick={() => handleDelete(s.ticker)} icon={faTrashAlt} />
                                            </div>
                                            <br></br>
                                            <div className='col-4 stockdelete-name'>{s.name}</div>
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
        <div className='Stock'>
            <Card className='card'>
                <CardBody className='stockwatch-card watchhead'>
                    <div className='container-fluid'>
                        <CardTitle className='watch-title'><h4><i>Watch List</i></h4></CardTitle>
                        <div className='row watchhead-row'>
                            <div className='col-4 watchhead-symbol'>Symbol</div>
                            <div className='col-4 watchhead-right'>Change</div>
                            <div className='col-4 watchhead-right'>Last Price</div>
                        </div>
                        {stockData.map((s, idx) => (
                                <div key={idx}>
                                    <div className='row watch-detail'>
                                        <div className='col-4 stockwatch-symbol'>{s.ticker}</div>
                                        {s.changePercent < 0 && 
                                            <div className='col-4 stockwatch-right red-text'>{s.changePercent}%</div>
                                        }
                                        {s.changePercent >= 0 &&
                                            <div className='col-4 stockwatch-right green-text'>{s.changePercent}%</div>
                                        }
                                        <div className='col-4 stockwatch-right'><CurrencyFormat value={s.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        <br></br>
                                        <div className='col-4 stockwatch-name'>{s.name}</div>
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

export default StockWatch