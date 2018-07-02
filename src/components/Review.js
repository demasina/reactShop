import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';

import style from './Review.less'

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      activePage: 1,
      itemsCountPerPage: 10,
      startReviewShow: 0,
      endReviewShow: 10
    };
  }

  handlePageChange(pageNumber) {
    let oldStartReviewShow = this.state.startReviewShow,
        oldEndReviewShow = this.state.endReviewShow,
        count = this.state.itemsCountPerPage,
        page = pageNumber * 10;   

    if (pageNumber > this.state.activePage) {
      this.setState({
        activePage: pageNumber,
        startReviewShow: page - count,
        endReviewShow: page
      });
    } else if (pageNumber < this.state.activePage) {
      this.setState({
        activePage: pageNumber,
        startReviewShow: oldStartReviewShow - count,
        endReviewShow: oldEndReviewShow - count
      });      
    } else {
      return
    }    
  }

  render() {
    let allReview = this.props.review; 
    let reviewNodes = allReview.map(function(item, i) {
            let date = item.created_at,
                time;
            date = date.split("T");
            time = date[1];
            time = time.split(".");
            return (
              <li key={i} className="review-user">
                <div className="row">
                  <div className="col-md-6">
                    <span className="name-user">{item.created_by.username}</span> 
                  </div>
                  <div className="col-md-6 text-right">
                    <span className="date-review" title={time[0]}>{date[0]}</span>
                  </div>
                </div> 
                <div className="rate-product">
                  <span>Rating:<StarRatingComponent 
                  name="rate1" 
                  starCount={item.rate} 
                  value={item.rate}
                />
                </span>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="text-review">{item.text}</p>
                  </div>
                </div>

              </li>
            )
          })

    function decimalAdjust(type, value, exp) {        //
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;

      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }

      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    
      value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
      }

      // Десятичное округление вверх
      if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
          return decimalAdjust('ceil', value, exp);
        };
      }

    let pageCount = Math.ceil10(reviewNodes.length, 1);
    let newReview = reviewNodes.slice(this.state.startReviewShow, this.state.endReviewShow)

    return (
      <div> 

        <div className="review-title" >Customer reviews</div>
            <div 
              className="progress-bar progress-bar-success" 
              role="progressbar" 
              aria-valuenow="20" 
              aria-valuemin="0" 
              aria-valuemax="100" 
              style={{width: "100%"}}>
          </div>
        { newReview }
      </div>
    )
  }



}

export default Review