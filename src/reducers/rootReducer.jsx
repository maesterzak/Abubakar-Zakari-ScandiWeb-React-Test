import { type } from "@testing-library/user-event/dist/type"


const initState ={
    //get current value of currency symbol from localstorage or return $ 
    currentCurrencySymbol:localStorage.getItem('currency') ?? "$",
    // default current category is all
    currentCategory: 'all',
    // get current value of cart from local storage or return default cart
    cart: JSON.parse(localStorage.getItem("cart")) ?? {"content":[],"CartTotal":0}
}

const rootReducer = (state= initState, action) => {
    const {type} = action;
    
    
    switch(type){
        case 'CHANGE_CURRENCY':
            
            localStorage.setItem('currency', action.currencySymbol)
            return{
                ...state,
                currentCurrencySymbol: action.currencySymbol

            }
        case 'CHANGE_CATEGORY': 
            return{
                ...state,
                currentCategory: action.categoryName
            }
        
        case 'CHANGE_CART':
            if(action.success === true){
                return{
                    ...state,
                    
                    cart: JSON.parse(localStorage.getItem('cart'))
                }
                
            }
            else{
                break
            }
                

            
         
        default:
            return state; 
             

    }
        
    
    
}

export default rootReducer;