import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Hero from './context/pages/Hero';
import Nhl from './components/Nhl';
import Cards from './components/Cards';
import Foo from './components/Foo';
import { UserProvider } from './context/usercontext';
import Private from './context/pages/Private/Private';
import PrivateHero from './context/pages/Private/PrivateHero/PrivateHero';
import Caca from './components/Caca';
import Search from './components/Search';
import Profile from './Profil/Profile';
import AdminProfile from './Profil/AdminProfile';
import AdminLogin from './Profil/AdminLogin';



function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Navbar />
          <Search/>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin-login" component={AdminLogin} />
            <Route path="/admin-profile" component={AdminProfile} /> // Ajoutez la route pour AdminProfile
            <Route path="/register" component={Register} />
            <Private exact path="/private" component={Private} />
            <Private exact path="/private/private-acceuil" component={PrivateHero} />
            <Hero/>
          </Switch>   

         <Nhl />
          
        
            <Switch> 
          <Route path="/caca" component={Caca} />
           <Route path="/" component={Cards} />
           </Switch>
          
          <Foo />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
