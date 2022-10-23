import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import Main from './components/Main';
import { getAllRegularServers } from './store/regularserver';
import { getAllDmServers } from './store/dmserver';
import { loadMessgesByChannelThunk} from'./store/messages';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const pathLocation = useLocation();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      await dispatch(getAllRegularServers())
      await dispatch(getAllDmServers())
      setLoaded(true);
    })();
  }, [dispatch]);

  // useEffect(()=> {
  //   (async()=> {
  //     await dispatch(getAllRegularServers());
  //     await dispatch(getAllDmServers());
  //   })();
  // }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* {pathLocation.pathname === '/login' && <NavBar />} */}
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <Route path='/' exact={true} >
          <SplashPage />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/@me' exact={true}>
          <Main />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/@me/:serverId' exact={true}>
          <Main />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/:serverId/:channelId' exact={true}>
          <Main />
        </ProtectedRoute>

        <ProtectedRoute path='/channels/:serverId' exact={true}>
          <Main />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
