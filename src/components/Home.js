import React from 'react'
import img1 from '../images/lucky.png'
import img2 from '../images/arrow.png'

function Home() {
  return (
    <div className="wrapperHome">
      <h1>LANDMARK</h1>
      <div className="linkContainer">
        <a href="/powerball" className="buttonStyle">powerball</a>
        <a href="/mega" className="buttonStyle">mega</a>
      </div>
      <div className='imageContainer'>
      <img src={img2} className="arrow"></img>
        <a href="/cover">
          <img src={img1} className="lucky spinAnimation"></img>
        </a>
      </div>
    </div>
  )
}

export default Home