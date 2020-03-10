import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/svg/logo_white.svg'

import content from '../content/footer-nav.json'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer is-dark">
        <div className="container container-medium">
          <div className="footer-inner">
            <div className="columns">
              <div className="column">
                <div className="footer-content">
                  <div className="columns is-mobile">
                    {content.sections.map((col, index) => {
                      return(
                        <div className="column" key={index}>
                          <h6 className="footer-title">{col.title}</h6> 
                          <ul className="footer-list nobullet">
                            {col.nav.map((item, index) => {
                              return(
                              <li className="item-no-bullet" key={index}>
                                {item.link.match(/^https?:\/\//) ? 
                                  <a href={item.link}>{item.text}</a>
                                  :
                                  <Link to={item.link}>
                                    {item.text}
                                  </Link>                                                                    
                                }                                
                              </li>
                              )
                            })}                          
                          </ul>
                        </div>
                      )
                    })}                  
                  </div>
                </div>
              </div> 
              <div className="column">
                <div className="footer-aside">
                  <div className="footer-entry">
                    <p>
                      Kata Containers is an independent open source community collaboratively developing code under the Apache 2 license. The project is supported by the OpenStack Foundation; the community follows the OpenStack Foundation <a href="//www.openstack.org/legal/community-code-of-conduct/">Code of Conduct</a>.
                    </p>
                  </div> 
                  <div className="footer-brand">
                    <a href="/" className="router-link-exact-active router-link-active">
                      <img src={logo} alt="Kata Containers" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>                
    </footer>
    )
  }
}

export default Footer
