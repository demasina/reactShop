import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Catalog from './Catalog'
import Product from './Product'

import style from './Body.less'

class Body extends React.Component {

  test = () => {
    switch(this.props.pathname) {
      case '#/catalog': 
        return <Catalog />
        break; 
      case '#/catalog/product': 
        return <Product selectItem={this.props.productDisplay} dispatch={this.props.dispatch}/>
        break; 
      default:
        return <Catalog />        
        break;
    }
  }

  render() {
    return (
      <div className="col-md-12 parent-div">
        {
          this.test()
        }
      </div>      
    )
  }
}

function mapStateToProps (state) {
  return {
    productDisplay: state.data.productDisplay
  }
}

export default connect(mapStateToProps)(Body)