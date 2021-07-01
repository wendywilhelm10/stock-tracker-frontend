import { Card, CardBody, CardTitle } from 'reactstrap'
import CurrencyFormat from 'react-currency-format'
import './IndexThree.css'

function IndexThree({idxThree}) {

    if (idxThree.length === 0) {
        return (
            <div></div>
        )
    }

    return (
        <div className='index-three'>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-3'>
                        <Card className='card'>
                            <CardBody className='stockowndel-card'>
                                <CardTitle><h4><i>Major Indexes</i></h4></CardTitle>
                                <div className='row'>
                                    {idxThree.map((i, idx) => (
                                        <div className='col-4' key={idx}>
                                            <span className='indexName'>{i.indexname}</span><br></br>
                                            <CurrencyFormat className='idxThreePrice' value={i.price} displayType={'text'} thousandSeparator={true} /><br></br>
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
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>     
        </div>
    )
}

export default IndexThree;