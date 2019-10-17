import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Mainpage from './components/mainpage'

class App extends Component {

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <div id="root">
            <Switch>
              <Route
                exact path="/"
                render={(props) => <Mainpage {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


export default App
