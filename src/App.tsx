
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handleProductsFetchRequest } from './features/Redux/Reducers/productSlice';
import HeaderTab from './components/Header/HeaderTab';
import "./App.css"




function App() {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleProductsFetchRequest());
  }, []);
  return (
    <Router>
      <div className='headerTab'>
        <HeaderTab/>
        
      </div>
     
    
          <Routes>
            
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} /> */}
            <Route path="/shop" element={<Shop />} />
          </Routes>
    </Router>

    
  );
}

export default App;
