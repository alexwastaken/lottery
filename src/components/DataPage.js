import React, { useState, useEffect } from 'react';
import img1 from '../images/lucky.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../features/apislice.js';


function Powerball(props) {


    const dispatch = useDispatch();

    const powerfulData = useSelector((state) => state.user.user);
    const powerfulDataTimeStamp = useSelector((state) => state.user.lastUpdated);

    const callApi = {
      callPower: 'https://ca-lottery.p.rapidapi.com/powerball',
      callMega: 'https://ca-lottery.p.rapidapi.com/megamillions'
    };
    
    const url = props.select.classCalled === 'megaImage' ? callApi.callMega : callApi.callPower;

    const [responseData, setResponseData] = useState(null);
    const [apiData, setApiData] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('history');
    const [numbers, setNumbers] = useState(['🍀','🍀','🍀','🍀','🍀','🍀']);

    useEffect(() => {
      setLoading(true);
    
      const currentTime = new Date();
      const lastUpdatedTime = new Date(powerfulDataTimeStamp);
    
      if (currentTime - lastUpdatedTime > 10000 || powerfulData === null) {
        dispatch(fetchUserById(url)).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, [dispatch, url, powerfulData, powerfulDataTimeStamp]);


    useEffect(() => {
      setResponseData(powerfulData);
    }, [powerfulData]);
    
    const handleTabClick = (tab) => {
      setSelectedTab(tab);
    };

    function generateNumbers() {
      let newNumbers = [];
      for (let i = 0; i < 5; i++) {
        newNumbers.push(Math.floor(Math.random() * (props.select.classCalled === 'powerballImage' ? 69 : 70)) + 1);
      }
      newNumbers.push(Math.floor(Math.random() * (props.select.classCalled === 'powerballImage' ? 26 : 25)) + 1);
      setNumbers(newNumbers);
    }
    
    const closestValue = (value, date) => {
      const predefinedValues = [50000000, 100000000, 250000000, 500000000, 750000000, 1000000000];
      const netEstimateDate1 = new Date(date);
      const netEstimateDate2 = new Date(date);
      const netEstimateDate3 = new Date(date);
      const netEstimateDate4 = new Date(date);
      const netEstimateDate5 = new Date(date);
      const netEstimateDate6 = new Date(date);
      let closestValue = predefinedValues[0];
      let netEstimateDateArray = []
      
      if(value < 50000000) {
        closestValue = 50000000
      } else if (value > 50000001 && value < 100000000) {
        closestValue = 100000000
      } else if (value > 100000001 && value < 250000000) {
        closestValue = 250000000
      } else if (value > 250000001 && value < 500000000) {
        closestValue = 500000000
      } else if (value > 500000001 && value < 750000000) {
        closestValue = 750000000
      } else if (value > 750000000 && value < 1000000000) {
        closestValue = 100000000
      } else if (value > 1000000000 ) {
        closestValue = 100000000
      }
      
      if (closestValue === 50000000) {
        netEstimateDateArray.push(
          new Date(netEstimateDate1.setDate(netEstimateDate1.getDate() + 24)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate2.setDate(netEstimateDate2.getDate() + 41)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate3.setDate(netEstimateDate3.getDate() + 59)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate4.setDate(netEstimateDate4.getDate() + 75)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate5.setDate(netEstimateDate5.getDate() + 92)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate6.setDate(netEstimateDate6.getDate() + 99)).toLocaleString('en-US', {month: 'long', day: 'numeric'})
        );

      } else if (closestValue === 100000000) {
        netEstimateDateArray.push(
          'we made it',
          new Date(netEstimateDate2.setDate(netEstimateDate2.getDate() + 17)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate3.setDate(netEstimateDate3.getDate() + 35)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate4.setDate(netEstimateDate4.getDate() + 51)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate5.setDate(netEstimateDate5.getDate() + 68)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate6.setDate(netEstimateDate6.getDate() + 75)).toLocaleString('en-US', {month: 'long', day: 'numeric'})
        );

      } else if (closestValue === 250000000) {
        netEstimateDateArray.push(
          'we made it',
          'we made it',
          new Date(netEstimateDate3.setDate(netEstimateDate3.getDate() + 18)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate4.setDate(netEstimateDate4.getDate() + 34)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate5.setDate(netEstimateDate5.getDate() + 51)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate6.setDate(netEstimateDate6.getDate() + 58)).toLocaleString('en-US', {month: 'long', day: 'numeric'})
        );
      } else if (closestValue === 500000000) {
        netEstimateDateArray.push(
          'we made it',
          'we made it',
          'we made it',
          new Date(netEstimateDate4.setDate(netEstimateDate4.getDate() + 16)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate5.setDate(netEstimateDate5.getDate() + 33)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate6.setDate(netEstimateDate6.getDate() + 40)).toLocaleString('en-US', {month: 'long', day: 'numeric'})
        );
      } else if (closestValue === 750000000) {
        netEstimateDateArray.push(
          'we made it',
          'we made it',
          'we made it',
          'we made it',
          new Date(netEstimateDate5.setDate(netEstimateDate5.getDate() + 17)).toLocaleString('en-US', {month: 'long', day: 'numeric'}),
          new Date(netEstimateDate6.setDate(netEstimateDate6.getDate() + 24)).toLocaleString('en-US', {month: 'long', day: 'numeric'})
        );
      } else if (closestValue === 1000000000) {
        netEstimateDateArray.push(
          'we made it',
          'we made it',
          'we made it',
          'we made it',
          'we made it',
          new Date(netEstimateDate6.setDate(netEstimateDate6.getDate() + 7)).toLocaleString('en-US', {month: 'long', day: 'numeric'})
        );
      }
      
      return netEstimateDateArray;
    };

    useEffect(() => {
      let lotteryData = [];
      if (responseData) {
        for (let y = 0; y < 6; y++) {
          let result = "";
          for (let i = 0; i < 6; i++) {
            if (i === 5) {
              result += "<b>" + responseData.PreviousDraws[y].WinningNumbers[i].Number + "</b> ";
            } else {
              result += responseData.PreviousDraws[y].WinningNumbers[i].Number + ", " ;
            }
          }
          let drawDate = new Date(responseData.PreviousDraws[y].DrawDate);
          drawDate = drawDate.toLocaleString("en-US", { month: "long", day: "numeric" });
          result += '&nbsp;' + '&nbsp;' + '&nbsp;' + '&nbsp;' + drawDate;
          lotteryData.push(result);
        }
        lotteryData.push(closestValue(responseData.NextDraw.JackpotAmount, responseData.NextDraw.DrawDate));
        lotteryData.push(responseData.NextDraw.JackpotAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'}).replaceAll(' ', '').replace(/\.00$/, ''))
        setApiData(lotteryData);
      }
    }, [responseData]);

      return (
        <div className="wrapper">
          <a className='clickableText' href="/"><h1>{props.select.classCalled === 'powerballImage' ? 'POWERBALL' : 'Mega Millions'}</h1></a>
          {loading ? (
            <div className="loadingContainerData">
              <img src={img1} className="luckyNumbers spinAnimation" />
            </div>
          ) : (
            <div>
              <div className="navContainer">
                <p className={`navBar ${selectedTab === 'estimator' ? 'active' : ''}`} onClick={() => handleTabClick('estimator')}>Generator</p>
                <p className={`navBar ${selectedTab === 'history' ? 'active' : ''}`} onClick={() => handleTabClick('history')}>History</p>
                <p className={`navBar ${selectedTab === 'generator' ? 'active' : ''}`} onClick={() => handleTabClick('generator')}>Estimator</p>
                {/* learn ${selectedTab === 'Estimator' ? 'active' : ''} */}
              </div>
              {selectedTab === 'estimator' ? (
                <div className="dataContentWrapper">
                  <ul className="numberContents">
                    <li>{numbers[0]}</li>
                    <li>{numbers[1]}</li>
                    <li>{numbers[2]}</li>
                    <li>{numbers[3]}</li>
                    <li>{numbers[4]}</li>
                    <li><b>{numbers[5]}</b></li>
                  </ul>
                  <button onClick={generateNumbers}>Generate Numbers</button>
                </div>
              ) : selectedTab === 'history' ? (
                <div className="dataContentWrapper">
                  <p className="dataPtags" dangerouslySetInnerHTML={{__html: apiData[0]}}></p>
                  <p className="dataPtags" dangerouslySetInnerHTML={{__html: apiData[1]}}></p>
                  <p className="dataPtags" dangerouslySetInnerHTML={{__html: apiData[2]}}></p>
                  <p className="dataPtags" dangerouslySetInnerHTML={{__html: apiData[3]}}></p>
                  <p className="dataPtags" dangerouslySetInnerHTML={{__html: apiData[4]}}></p>
                  <p className="dataPtags" dangerouslySetInnerHTML={{__html: apiData[5]}}></p>
                </div>
              ) : (
                <div className="dataContentWrapper">
                  <p className="dataPtags" style={{ marginBottom: '35px'}}>Jackpot: <span style={{ color: 'green'}}><b>{apiData[7]}</b></span></p>
                  <p className="dataPtags">50 Million: {apiData[6][0]}</p>
                  <p className="dataPtags">100 Million: {apiData[6][1]}</p>
                  <p className="dataPtags">250 Million: {apiData[6][2]}</p>
                  <p className="dataPtags">500 Million: {apiData[6][3]}</p>
                  <p className="dataPtags">750 Million: {apiData[6][4]}</p>
                  <p className="dataPtags">1 Billion: {apiData[6][5]}</p>
                </div>
              )}
            </div>
          )}
        </div>
      );
}

export default Powerball