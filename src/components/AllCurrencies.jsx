import React, { Component } from "react";
import getAllCurrencies from "../queries/AllCurrenciesQuery";
import { client } from "../index";
import { connect } from "react-redux";

class AllCurrencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      loading: true,
      currencyState: false
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
    
  }

  async getInitialData() {
    const watch = client.watchQuery({
      query: getAllCurrencies,
    });
    this.subobj = watch.subscribe(({ loading, data }) => {
      this.setState({
        currencies: data.currencies,
        loading: loading,
        
      });
    });
  }
  componentWillUnmount() {
    this.subobj.unsubscribe();
  }

  currencyToggler = () =>{
    this.setState({
      currencyState: !this.state.currencyState
    })
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChange = (symbol) => {

    this.props.changeCurrency(symbol);
    this.currencyToggler();
    
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.currencyToggler()
    }
  }
  
  currencyOpen = () =>{
    this.setState({
      currencyState:true
    })
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  

  render() {
    const { loading, currencies, currencyState } = this.state;

    if (loading === false) {
      return (
        
          <li>
          <div className="dropdown-ctn">
            <button onClick={()=>this.currencyOpen()} className="dropDownbtn">{this.props.currentCurrencySymbol} <img alt="down angle" src="/assets/down-angle.svg" /></button>
            <div ref={this.wrapperRef} className={currencyState ?  "myDropdown" : "d-none"}>
            {currencies.map((currency, index) => {
              return (
                <span key={index} onClick={()=>this.handleChange(currency.symbol)}  className="dropdown-item"> {currency.symbol} {currency.label}</span>
              )
            })}  
                
                
            </div>
          </div>
          </li>

       
      );
    } else {
      return <p>loading</p>;
    }
  }
}

//add the value of current currency symbol from redux to component props
const mapStateToProps = (state) => {
  return {
    currentCurrencySymbol: state.currentCurrencySymbol,
  };
};
// for dipatching change currency events to redux
const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currencySymbol) => {
      dispatch({ type: "CHANGE_CURRENCY", currencySymbol: currencySymbol });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllCurrencies);
