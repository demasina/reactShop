import React from 'react'
import { render } from 'react-dom'
import Header from '../components/Header'
import Body from '../components/Body'

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <header>
          <div className="row"> 
            <Header />
          </div>
        </header>
        <section>
          <div className="row">
            <Body pathname={location.hash}/>
          </div>
        </section>
  
      </div>

    )
  }
}

export default App