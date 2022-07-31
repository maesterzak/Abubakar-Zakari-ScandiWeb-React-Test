const CheckOut =() =>{
    
    localStorage.setItem('cart', JSON.stringify({"content":[],"CartTotal":0}))
    console.log("Your order has been initialised.Thank you for shopping at our store!!")
    return true
      
    
}
export default CheckOut;