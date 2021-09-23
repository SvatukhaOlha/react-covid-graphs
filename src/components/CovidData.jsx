import React, {useState, useEffect} from 'react'
import CovidGraph from './CovidGraph';

function CovidData() {

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    const [page, setPage] = useState(1);
    const URL = (`https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?&page=${page}`, requestOptions);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [covidData, setCovidData] = useState([])
    
    
    useEffect(() => {
        setLoading(true);
       fetch(`https://cors-anywhere.herokuapp.com/${URL}`,{headers: {'Access-Control-Allow-Origin': '*'}})
        .then(res => {
            console.log('in res', res)
            console.log(URL)
            return res.json()  
        })
        .then(data => {
            console.log('in data', data)
            setCovidData(data.data.rows)
        })
        .catch(error => {
            console.log('in error', error)
            setError(error)
        })
    },[])

    if (!covidData.length) {
        return <div />
    }

    return (
        <div className='covid-data'>
           <CovidGraph cases={covidData} page={page} setPage={setPage} />
        </div>
    )
}

export default CovidData
