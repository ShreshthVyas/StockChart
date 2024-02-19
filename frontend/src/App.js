import React from 'react';
import { BrowserRouter as Router, Route, Routes , Link } from 'react-router-dom';
import MyComponent from './MyComponent';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './pic.jpg'; // Import the image

const WelcomePage = () => {
  return (
    <div className="bg-dark text-white p-5" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <h1 className="text-center mb-4">Welcome to Stock Insights</h1>
      <p className="lead text-center mb-4">Unlock the power of data-driven investment decisions</p>
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-dark border-0 text-white">
            <div className="card-body">
              <h2 className="card-title text-center">New User?</h2>
              <p className="card-text text-center">Join us today and start your journey towards financial success.</p>
              <div className="text-center">
                <Link to="/register" className="btn btn-primary">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-dark border-0 text-white">
            <div className="card-body">
              <h2 className="card-title text-center">Existing User?</h2>
              <p className="card-text text-center">Login to access your account and explore our premium features.</p>
              <div className="text-center">
                <Link to="/login" className="btn btn-success">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );   
}



const App = ()=> {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route  path="/"  element={<WelcomePage />} ></Route>
          <Route  path="/home"  element={<MyComponent />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

