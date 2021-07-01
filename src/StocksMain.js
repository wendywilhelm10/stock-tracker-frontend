import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import StockContext from './StockContext'
import StockWatch from './StockWatch'
import StockOwn from './StockOwn'
import IndexThree from './IndexThree'
import IndexList from './IndexList'
import Api from './Api'
import ApiStock from './ApiStock'
import './StocksMain.css'

/** This is the home page of the app that displays indexes, stocks
 *  watching and stocks you own.  Will be adding top movers and 
 *  losers.
 */
function StocksMain() {
    const history = useHistory();
    const {user, 
           stocksWatch, 
           initStocksWatch, 
           stocksOwn, 
           initStocksOwn,
           indexesWatch,
           indexThree,
           initIndexesWatch,
           initIndexThree
          } = useContext(StockContext);
    const [stockInfo, setStockInfo] = useState([]);
    const [stockOwnInfo, setStockOwnInfo] = useState([]);
    const [indexInfo, setIndexInfo] = useState([]);
    const [indexThreeInfo, setIndexThreeInfo] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(0);
    const [marketOpen, setMarketOpen] = useState(null);
    let count = 0;

    if (!user) {
        history.push('/');
    }

    /** When we first come into the app after logging in or signing
     *  up, will get the indexes, stocks user is watching and stocks
     *  user owns and display data.
     */
    useEffect(() => {
        async function getStocksWatch() {
            let symArr;
            let owns;
            let indexes;
            let indexesThree;

            try {
                let hours = await ApiStock.getMarketStatus();
                let marketOpen = hours.data[0].isTheStockMarketOpen;

                // If first time in here, stocks watching will be
                // empty.  Go get the list of tickers user watches
                if (!stocksWatch) {
                    let symbols = await Api.getStocksWatch(user);
                    symArr = symbols.stocksWatch.split(' ');
                    initStocksWatch(symArr);
                }
                
                // Get the data about the stocks from the API
                let stocks = await ApiStock.getStocks(symArr || stocksWatch);
                
                // If first time in here, stocks own will be
                // empty.  Go get the list of stocks user owns
                if (stocksOwn.length === 0) {
                    owns = await Api.getStocksOwn(user);
                    initStocksOwn(owns);
                } else {
                    owns = stocksOwn;
                }

                // Get the data about the stocks the user owns
                // from the API
                const stockArr = [];
                for (let i = 0; i < owns.length; i++) {
                    let ownInfo = await ApiStock.getStockOwn(owns[i].ticker);
                    let stockObj = owns[i];
                    stockObj.name = ownInfo.name;
                    stockObj.price = ownInfo.price;
                    stockObj.changePercent = ownInfo.changePercent;
                    stockObj.change = ownInfo.change;
                    stockArr.push(stockObj);
                }

                if (indexThree.length === 0) {
                    let idxThree = await Api.getIndexThree();
                    indexesThree = idxThree.result;
                    initIndexThree(indexesThree);
                } else {
                    indexesThree = indexThree;
                }

                const idxThreeArr = [];
                for (let i = 0; i < indexesThree.length; i++) {
                    let idxInfo = await ApiStock.getIndexWatch(indexesThree[i].index_ticker);
                    let idxObj = indexesThree[i];
                    idxObj.price = Math.round((idxInfo[0].price + Number.EPSILON) * 100) / 100;
                    idxObj.change = Math.round((idxInfo[0].change + Number.EPSILON) * 100) / 100;
                    idxObj.changePercent = Math.round((idxInfo[0].changesPercentage + Number.EPSILON) * 100) / 100;
                    idxThreeArr.push(idxObj);
                }
                
                /* get indexes the user is watching */
                if (indexesWatch.length === 0) {
                    let idxWatch = await Api.getIndexWatch(user);
                    indexes = idxWatch.result;
                    initIndexesWatch(indexes);
                } else {
                    indexes = indexesWatch;
                }

                // get the data about the indexes from the API
                const idxArr = [];
                for (let i = 0; i < indexes.length; i++) {
                    let idxInfo = await ApiStock.getIndexWatch(indexes[i].index_ticker);
                    let idxObj = indexes[i];
                    idxObj.price = Math.round((idxInfo[0].price + Number.EPSILON) * 100) / 100;
                    idxObj.change = Math.round((idxInfo[0].change + Number.EPSILON) * 100) / 100;
                    idxObj.changePercent = Math.round((idxInfo[0].changesPercentage + Number.EPSILON) * 100) / 100;
                    idxArr.push(idxObj);
                }

                setStockInfo(stocks);
                setStockOwnInfo(stockArr);
                setIndexInfo(idxArr);
                setIndexThreeInfo(idxThreeArr);
                setMarketOpen(marketOpen);
            } catch (e) {
                console.log('error ', e);
            }
        }

        getStocksWatch();
        
    }, [pageRefresh]);

    async function handleReload(e) {
        e.preventDefault();

        try {
            let hours = await ApiStock.getMarketStatus();
            let marketOpen = hours.data[0].isTheStockMarketOpen;
            if (!marketOpen) {
                setMarketOpen(marketOpen);
                return;
            }
        } catch (e) {
            console.log('error ', e);
        }

        count++;
        setPageRefresh(count);
    }

    function addWatch() {
        history.push('/watch');
    }

    function addOwn() {
        history.push('/own');
    }

    function addIndex() {
        history.push('/index');
    }

    if (indexInfo.length === 0 && stockInfo.length === 0 &&
        stockOwnInfo.length === 0) {
            return (
                <div className='EmptyMain'>
                    <div className='container-fluid'>
                        <IndexThree idxThree={indexThreeInfo} />
                        <div className='row main-three-buttons justify-content-center'>
                            <div className='col-2'>
                                <button onClick={addWatch} className='btn btn-primary'>Add Stocks to Watch</button>
                            </div>
                            <div className='col-2'>
                                <button onClick={addOwn} className='btn btn-primary'>Add Stocks you Own</button>
                            </div>
                            <div className='col-2'>
                                <button onClick={addIndex} className='btn btn-primary'>Add Indexes to Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }

    //  style="background:transparent url('img/stockmarket.jpeg') no-repeat center center /cover">
                
    return (
        <div className='StockMain'>
            <div className='container-fluid'>
                {marketOpen &&
                    <button onClick={handleReload} className='btn btn-primary reload'>Click to Reload!</button>
                }
                {!marketOpen &&
                    <h4><span>Markets Closed</span></h4>
                }
                <IndexThree idxThree={indexThreeInfo} />
                {indexInfo.length > 0 &&
                    <IndexList indexInfo={indexInfo} />
                }
            </div>  

            <div className='container-fluid'>
                <div className='row'>
                    {stockInfo.length > 0 &&
                        <div className='col-3 stockmain-watch'>
                            <StockWatch stockData={stockInfo} showDelete='0' />
                        </div>
                    }
                    {stockInfo.length === 0 &&
                        <div className='col-3 no-stock-watch'>
                            <span><i>No stocks currently watching</i></span>
                        </div>
                    }
                    {stockOwnInfo.length > 0 &&            
                        <div className='col-9 stockmain-own'>
                            <StockOwn stockOwnData={stockOwnInfo} showDelete='0'/>
                        </div>
                    }
                    {stockOwnInfo.length === 0 &&
                        <div className='col-9 no-stock-own'>
                            <span><i>No stocks you currently own</i></span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default StocksMain