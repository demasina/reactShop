import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { startLoadReview , unmount, addReview } from '../actions/productAction'
import Review from './Review'
import StarRatingComponent from 'react-star-rating-component';

import style from './Product.less'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textfield: "",
      rating: 0,
      id: "",
      title: "",
      img: "",
      text: ""
    }
  }

  componentWillMount() {
    let idProduct = this.props.selectItem.id;
    if (idProduct == undefined) {
      let data = JSON.parse(localStorage.getItem("product"));      
      let { id, title, img, text } = data;
      this.setState({ id: id, title: title, img: img, text: text });      
    }
  }

  componentDidMount() {
    let idProduct = this.props.selectItem.id;
    if (idProduct == undefined) {                             // Чтобы при обновлении страницы, не терялся контекст
      let data = JSON.parse(localStorage.getItem("product")),
          newId = data.id;
      this.props.dispatch(startLoadReview(newId));
    } else {
      this.props.dispatch(startLoadReview(idProduct));
    }
  }

  componentDidUpdate() {  
    let idProduct = this.props.selectItem.id;
    if (this.props.selectItem.id > 0) {
      let product = JSON.stringify(this.props.selectItem);
      localStorage.setItem("product", product);
    } 
    if (this.props.successAdd)  {      
      this.props.dispatch(startLoadReview(idProduct));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(unmount());
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleInput = (event) => {
    this.setState({textfield: event.target.value});
  }

  handleSubmit = () => {
    let idProduct = this.props.selectItem.id,
        rate = this.state.rating,
        comment = this.state.textfield,
        token = this.props.userToken,
        data = { idProduct, rate, comment, token};
    
    if (token.length === 0) {
      alert("Only registered users can post a new comment. \Log in or Sign up.");
      return;
    }

    if (comment.trim().length === 0) {
      alert("Please enter more than nothing");
      return;
    }  
    
    if (rate ===0) {
      alert("Please rate this product")
    }
       
    this.props.dispatch(addReview(data));
    this.setState({textfield: ""});
    this.props.dispatch(startLoadReview(idProduct));
  }
  
  render() {
    let selectProduct = (this.props.selectItem.length != 0) ? 
                              this.props.selectItem : 
                              { 
                                id: this.state.id, 
                                title: this.state.title, 
                                img: this.state.img, 
                                text: this.state.text
                              }    
    return (
      <div className="col-md-12 parent-div">
        <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="product-info">
            <ul className="product-select">
              <li>
                <h2>{selectProduct.title}</h2>
              </li>
              <li>
                <img src={selectProduct.img} alt={selectProduct.title} title={selectProduct.title} />
                <p className="product-description">Product Description</p>
              </li>
              <li>{selectProduct.text}</li>
            </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 review-area">         
          <h3>Leave a review:</h3>
          <textarea 
            onChange={this.handleInput}
            ref="reviewInputField"
            value={this.state.textfield }
          />
          <div className="rates-review">
            <StarRatingComponent 
            name="rate1" 
            starCount={5} 
            value={this.state.rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          </div>  
          <button 
            className="btn btn-send"
            onClick={this.handleSubmit}
          >
          Send</button>
          <ul className="product-review">
            <Review review={this.props.review}/>
          </ul>
        </div>
        </div>

      </div>      
    )
  }
}

function mapStateToProps (state) {
  return {
    review: state.product.showReview,
    successAdd: state.product.successAdd,
    userToken: state.login.token
  }
}

export default connect(mapStateToProps)(Product)