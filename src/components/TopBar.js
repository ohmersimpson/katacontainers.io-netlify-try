import React from 'react'
import content from '../content/top-bar.json'
import barLogo from '../img/svg/bar-logo.svg'

const TopBar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }  

  render() {

    if(content.bar) {
      return (      
        <div className="bar is-dark-gray">
          <div className="container">
            <div className="bar-inner">
              <div className="bar-logo">
                <img src={barLogo} alt="Meet the Kata Community" />
              </div> 
              <div className="bar-entry">
                <p>{content.bar.text}</p>
              </div> 
              <a href={content.bar.link} target="_blank" className="bar-btn" rel="noopener noreferrer">{content.bar.button}</a>
            </div>
          </div>
        </div>              
      )    
    } else {
      return null;
    }    
  }
}

export default TopBar
