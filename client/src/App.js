import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import Navbar from './menu/Navbar';
import Footer from './menu/Footer';
import Contact from './menu/Contact';


import Register from './user/Register';
import Profile from './user/Profile';
import Login from './user/Login';
import Cart from './user/Cart';

import CreateDetail from './details/CreateDetail';
import DetailCards from './details/DetailCards';

function App() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.location.reload();
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/create-detail/:id?" component={CreateDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/contact" component={Contact} />
          <Route path="/" component={DetailCards} exact />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
