/* jshint ignore: start */

import React from 'react';
import './App.css';
import { render } from 'react-dom';
import Header from './components/Header';
import MessageText from './components/MessageText';
import Popup from 'reactjs-popup';
import BurgerIcon from './components/BurgerIcon';
import Menu from './components/Menu';
import Text from './components/Text';
// import SimpleMDEReact from 'react-simplemde-editor';
// import 'simplemde/dist/simplemde.min.css';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// import { Redirect } from 'react-router-dom';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Privacy from './components/Privacy';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  marginTop: '40px'
};
const contentStyle = {
  background: 'rgba(255,255,255,0)',
  width: '80%',
  border: 'none'
};

const Home = () => (
  <div>
    <div>
      <MessageText />
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

// const Contact = () => (
//   <div>
//     <h2>Contact Page</h2>
//   </div>
// );

const App = () => (
  <div>
    <Router>
      <div>
        <Link to='/'>
          <Header />
        </Link>
        <div style={styles}>
          <Popup
            modal
            overlayStyle={{ background: 'rgba(255,255,255,0.98' }}
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            trigger={(open) => <BurgerIcon open={open} />}>
            {(close) => <Menu close={close} />}
          </Popup>

          <hr />
            <Route exact path='/' component={Home} />
            <Route path='/text' component={Text} />
            <Route path='/privacy' component={Privacy} />
            <Route path='/404'component={NotFound} />
        </div>
      </div>
    </Router>
  </div>
);

render(<App />, document.getElementById('root'));

registerServiceWorker();
