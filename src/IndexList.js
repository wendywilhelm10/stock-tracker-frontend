import CurrencyFormat from 'react-currency-format'
import './IndexList.css'

function IndexList({indexInfo}) {

    return (
        <div className='indexList'>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                {indexInfo.map((i, idx) => {
                    return <div key={idx} className='col-2 stockmain-index'>
                        <span className='indexName'>{i.indexname}</span><br></br>
                        <CurrencyFormat value={i.price} displayType={'text'} thousandSeparator={true} /><br></br>
                        {i.change >= 0 &&
                            <span className='green-text'>{i.change}</span>
                        }
                        {i.change < 0 &&
                            <span className='red-text'>{i.change}</span>
                        }
                        <br></br>
                        {i.changePercent >= 0 &&
                            <span className='green-text'>{i.changePercent}%</span>
                        }
                        {i.changePercent < 0 &&
                            <span className='red-text'>{i.changePercent}%</span>
                        }
                    </div>
                })}
                </div>
            </div>
        </div>
    )
}

export default IndexList