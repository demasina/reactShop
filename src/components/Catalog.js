import React, { Component } from 'react'
import { connect, bindActionCreators } from 'react-redux'
import { startLoad, unmount, displayData } from '../actions/catalogAction'
import { Link } from 'react-router'
import Product from './Product'

  
import style from './Catalog.less'

class Catalog extends Component {

  componentDidMount() {    
    let fetching = !this.props.dataListProduct.isFetching;
    this.props.dispatch(startLoad(fetching));  
  }

  componentWillUnmount() {   
    this.props.dispatch(unmount());
  }

  render() {
    let data = this.props.dataListProduct.productList;
    const { dispatch } = this.props;

    function some(item) {
      dispatch(displayData(item));
    }

    return (      
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-12 text-center '>
          <h3>Products</h3>
          <div className='row products-wrapper'>   
            {              
              data.map(function(item) {
                return (
                  <div className="col-xs-12 col-sm-6 col-md-4" key={item.id}>
                    <Link to="/catalog/product" onClick={() => some(item)}>
                    <div className="product-img">                    
                      <img src={item.img} alt={item.text} title={item.text} />                                       
                    </div>
                    </Link> 
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    dataListProduct: state.data
  }
}

export default connect(mapStateToProps)(Catalog)