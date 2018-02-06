import React from 'react';
import {Router, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history';
import {routes} from './routes'
import './App.css';

const history = createBrowserHistory()

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div id='content' className='d-flex flex-column'>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
			</Router>
    );
  }
}

export default App;
