import sum from 'lodash.sum'
import CheckOut from './CheckOut';
import { UiButton } from "./UI/Button";
import React, { Component } from 'react'
import { connect } from 'react-redux';



//ui, prop, symbol
class CartSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }
  componentDidMount(){
    
  }
  CartCheckOut = () => {
    const success = CheckOut()
    const { changeCart } = this.props;

    changeCart(success);
  }
  render(){
    
    const {ui, cart, currentCurrencySymbol} = this.props
    // from cart get the current cost of each product multiplied by its quantity
    const amount = cart["content"].map(
      (item) =>
        item.prices.find((price) => price.currency.symbol === currentCurrencySymbol).amount *
        item.quantity
    );
    // using loadash get sum of all costs in cart
    const total = sum(amount);
    // get tax value for total products
    const taxAmount = (21 / 100) * total;
    // get total value of cart including tax
    const cartTotal = taxAmount + total;
   
    return(
      <>
        {ui === "mainCart" ? 
        
        <div className="item-summary">
        <p>
          Tax 21%:{" "}
          <span>
            {currentCurrencySymbol} {taxAmount.toFixed(2)}
          </span>
        </p>
        <p>
          Quantity: <span>{cart["CartTotal"]}</span>
        </p>
        <b>Total</b>:{" "}
        <span>
          {currentCurrencySymbol} {cartTotal.toFixed(2)}
        </span>
        <UiButton onClick={()=>this.CartCheckOut()} cart>ORDER</UiButton>
      </div>
        :
        <>
          <span>Total</span>
          <span>
            {currentCurrencySymbol} {total.toFixed(2)}
          </span>
        </>
        }
      </>
    )
  }
  // if (ui === "mainCart") {
  //   return (
      // <div className="item-summary">
      //   <p>
      //     Tax 21%:{" "}
      //     <span>
      //       {symbol} {taxAmount.toFixed(2)}
      //     </span>
      //   </p>
      //   <p>
      //     Quantity: <span>{cart["CartTotal"]}</span>
      //   </p>
      //   <b>Total</b>:{" "}
      //   <span>
      //     {symbol} {cartTotal.toFixed(2)}
      //   </span>
      //   <UiButton onClick={()=>CheckOut()} cart>ORDER</UiButton>
      // </div>
  //   );
  // } else {
  //   return (
  //     <>
  //       <span>Total</span>
  //       <span>
  //         {symbol} {total.toFixed(2)}
  //       </span>
  //     </>
  //   );
  // }
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currentCurrencySymbol: state.currentCurrencySymbol,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCart: (success) => {
      dispatch({ type: "CHANGE_CART", success: success });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
