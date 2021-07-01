import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import Api from './Api'
import StockContext from './StockContext'
import './IndexWatch.css'

function IndexWatch() {
    const history = useHistory();
    const {user, indexesWatch, initIndexesWatch} = useContext(StockContext);
    const [indices, setIndices] = useState([]);
    const [checkedState, setCheckedState] = useState(new Array(6).fill(false));
    const [saveBtn, setSaveBtn] = useState();

    useEffect(() => {
        async function getIndexes() {
            const resp = await Api.getIndexes();
            const checkedIndex = [];
            let j = 0;

            for (let i = 0; i < resp.indices.length; i++) {
                if (j < indexesWatch.length && 
                    indexesWatch[j].id === resp.indices[i].id) {
                        checkedIndex.push(true);
                        j++;
                } else {
                    checkedIndex.push(false);
                }
            }
            
            setIndices(resp.indices);
            setCheckedState(checkedIndex);
        }

        getIndexes();
    }, []);

    function handleOnChange(pos) {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === pos ? !item : item
        )

        setCheckedState(updatedCheckedState);
        setSaveBtn(1);
    }

    async function handleClick(e) {
        e.preventDefault();
        const inxArr = [];
        const indexTickArr = [];
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i]) {
                inxArr.push(indices[i].id);
                indexTickArr.push(indices[i]);
            }
        }

        const resp = await Api.setIndexes(user, inxArr);
        initIndexesWatch(indexTickArr);
        setSaveBtn(2)
    }

    function handleCancel() {
        history.push('/stocks');
    }

    return (
        <div>
            <div className='container-fluid col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                <h3 className='index-watch-header'>Select Indexes to Watch</h3>
                <Card className='card'>
                    <CardBody>
                        <ul className='index-list'>
                            {indices.map(({id, indexname}, idx) => {
                                return (
                                    <li key={id}>
                                        <input
                                            type='checkbox'
                                            id={`checkbox-${id}`}
                                            name={indexname}
                                            value={id}
                                            checked={checkedState[idx]}
                                            onChange={() => handleOnChange(idx)}
                                        />
                                        <label className='index-label' htmlFor={`checkbox-${id}`}>{indexname}</label>
                                    </li>
                                )
                            })}
                        </ul>
                        <button onClick={handleCancel} className='btn btn-primary index-cancel-btn'>Cancel</button>
                        {saveBtn === 1 &&
                            <button onClick={handleClick} className='btn btn-success index-btn'>Save</button>
                        }
                        {saveBtn === 2 &&
                            <span id='save-success'>Save Successful</span>
                        }
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default IndexWatch