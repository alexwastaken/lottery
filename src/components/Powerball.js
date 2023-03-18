import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import img1 from '../images/lucky.png'


function Powerball(props) {

    const navigate = useNavigate();

    function handleButtonClick() {
      navigate(props.select.classCalled === "megaImage" ? "/tellmemoremega" : "/tellmemorepower");
    }
    
    const callApi = {
        callPower: 'https://ca-lottery.p.rapidapi.com/recent/powerball',
        callMega: 'https://ca-lottery.p.rapidapi.com/recent/megamillions'
    }
    
    const [responseData, setResponseData] = useState(null);
    const [apiData, setApiData] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let lotteryData = []
        if(responseData) {
            let result = "";
            for (let i = 0; i < 6; i++) {
                if (i === 5) {
                  result += "<b>" + responseData.MostRecentDraw.WinningNumbers[i].Number + "</b> ";
                } else {
                  result += responseData.MostRecentDraw.WinningNumbers[i].Number + '&nbsp&nbsp&nbsp';
                }
            }
            lotteryData.push(result)
            lotteryData.push(responseData.NextDraw.JackpotAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''));
            lotteryData.push(responseData.NextDraw.EstimatedCashValue.toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''));
            lotteryData.push((responseData.NextDraw.EstimatedCashValue * .76).toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''));
            let DrawDate = responseData.NextDraw.DrawDate
            let LastDrawDate = responseData.MostRecentDraw.DrawDate
            let pushPower = new Date(DrawDate)
            let LastDrawData = new Date(LastDrawDate)
            lotteryData.push(pushPower.toLocaleString('en-US', {month: 'long', day: 'numeric', hour: 'numeric', timeZone: 'Etc/GMT-6'}))
            lotteryData.push(LastDrawData.toLocaleString('en-US', {month: 'long', day: 'numeric'}))
            setApiData(lotteryData)
        }
    }, [responseData]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: props.select.classCalled === 'powerballImage' ? callApi.callPower : callApi.callMega,
            headers: {
                'X-RapidAPI-Key': '00a6c0d680msh26b3c30101217b0p1fc2bdjsncf44f42ab8d3',
                'X-RapidAPI-Host': 'ca-lottery.p.rapidapi.com'
            }
        };

        setLoading(true);
    
        axios.request(options)
        .then((response) => {
            setResponseData(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
        
      }, [props.select.classCalled]);

      return (
        <div className="wrapper">
          <div className="headerWrapper">
            <a href="/"><img className={props.select.classCalled} src={props.select.image} /></a>
            <div className="numberClass" dangerouslySetInnerHTML={{__html: apiData[0]}}></div>
            <div className="dateClass">{apiData[5]}</div>
          </div>
          {(() => {
            if (loading) {
              return <div className="loadingContainer"><img src={img1} className="luckyNumbers spinAnimation" /></div>
            } else {
              return (
                <div className="container">
                    <div>
                    <p className="tableTextStyle">Jackpot: <span style={{ color: 'green' }}><b>{apiData[1]}</b></span></p>
                    <p className="tableTextStyle">Cash Value: {apiData[2]}</p>
                    <p className="tableTextStyle">Take Home California: {apiData[3]}</p>
                    </div>
                    <div>
                    <p className="tableTextStyle">Next Drawing: {apiData[4]}</p>
                    <button className="tableTextStyle" onClick={handleButtonClick}>Tell Me More</button>
                    </div>
                </div>
              );
            }
          })()}
        </div>
      );
}

export default Powerball