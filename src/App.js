
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryView from './components/CategoryView';
import PdpView from './components/PdpView';
import './App.css';
import Navbar from './components/Navbar';
import CartView from './components/CartView';
import { Component } from 'react';
import PageNotFound from './components/PageNotFound';



class App extends Component{
 
  componentDidMount(){
    // create cart in local storage if it does not exist
    if(localStorage.getItem('cart') === null){
      localStorage.setItem('cart', JSON.stringify({"content":[],"CartTotal":0}))
      
    }
    if(localStorage.getItem('currentCategory') === null){
      localStorage.setItem('currentCategory', 'all')
    }
    
    
  }
  
  render() {
  return (
    <div className="app-body">

      
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<CategoryView />} />
          <Route path='/:id' element={<PdpView />} />
          <Route path='/cart' element={<CartView />} />
          <Route path="*" element={<PageNotFound />} />
          
        </Routes>
      </Router>
    
      
    </div>
  );

}
}

export default App;
