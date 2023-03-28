import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../images/lucky.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../features/apislice.js';

function Powerball(props) {

    const [responseData, setResponseData] = useState(null);
    const [apiData, setApiData] = useState('')
    const [loading, setLoading] = useState(false);
  
    const dispatch = useDispatch();

    const powerfulData = useSelector((state) => state.user.user);
    const powerfulDataTimeStamp = useSelector((state) => state.user.lastUpdated);

    const navigate = useNavigate();

    function handleButtonClick() {
      navigate(props.select.classCalled === "megaImage" ? "/tellmemoremega" : "/tellmemorepower");
    }
    
    const callApi = {
      callPower: 'https://ca-lottery.p.rapidapi.com/powerball',
      callMega: 'https://ca-lottery.p.rapidapi.com/megamillions'
    };
    
    const url = props.select.classCalled === 'megaImage' ? callApi.callMega : callApi.callPower;

    useEffect(() => {
      setLoading(true);
    
      const currentTime = new Date();
      const lastUpdatedTime = new Date(powerfulDataTimeStamp);
    
      // Only call the API if it has been longer than 1 minute since the state was last updated
      if (currentTime - lastUpdatedTime > 10000 || powerfulData === null) {
        console.log('suppp')
        dispatch(fetchUserById(url))
      } else {
        setLoading(false);
      }
    }, [dispatch, url, powerfulDataTimeStamp]);


    useEffect(() => {
      setResponseData(powerfulData);
    }, [powerfulData]);

    useEffect(() => {
        let lotteryData = []
        if(responseData) {
            let result = "";
            for (let y = 0; y < 6; y++) {
              let result = "";
              for (let i = 0; i < 6; i++) {
                if (i === 5) {
                  result += "<b>" + responseData.PreviousDraws[y].WinningNumbers[i].Number + "</b> ";
                } else {
                  result += responseData.PreviousDraws[y].WinningNumbers[i].Number + ", " ;
                }
              }
            }
            lotteryData.push(result)
            lotteryData.push(responseData.NextDraw.JackpotAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''));
            lotteryData.push(responseData.NextDraw.EstimatedCashValue.toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''));
            lotteryData.push((responseData.NextDraw.EstimatedCashValue * .76).toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''));
            let DrawDate = responseData.NextDraw.DrawDate
            let LastDrawDate = responseData.PreviousDraws[0].DrawDate
            let pushPower = new Date(DrawDate)
            let LastDrawData = new Date(LastDrawDate)
            lotteryData.push(pushPower.toLocaleString('en-US', {month: 'long', day: 'numeric', hour: 'numeric', timeZone: 'Etc/GMT-6'}))
            lotteryData.push(LastDrawData.toLocaleString('en-US', {month: 'long', day: 'numeric'}))
            setApiData(lotteryData)
            setLoading(false)
        }
    }, [responseData]);

      return (
        <div className="wrapper">
          <div className="headerWrapper">
            <a href="/"><img className={props.select.classCalled} src={props.select.image} alt={'main'}/></a>
            <div className="numberClass" dangerouslySetInnerHTML={{__html: apiData[0]}}></div>
            <div className="dateClass">{apiData[5]}</div>
          </div>
          {(() => {
            console.log(loading)
            if (loading) {
              return <div className="loadingContainer"><img src={img1} alt={'loading'} className="luckyNumbers spinAnimation" /></div>
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