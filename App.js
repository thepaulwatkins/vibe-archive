/* Parent file that exports the app */
import React, { Component } from 'react';
import { Font, Amplitude, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './Router';


class App extends Component {
  /* This is to setup loading custom fonts through Expo */
  constructor(props) {
    super(props);
    this.state = { fontLoaded: true };
  }
 
  /* componentDidMount function to run as soon as app renders */
  async componentDidMount() {
    //command to load font through expo
    await Font.loadAsync({
      'knewave-font': require('./assets/fonts/Knewave-Regular.ttf'),
      'apercu-font': require('./assets/fonts/apercu_regular_pro.ttf'),
      'apercu-bold': require('./assets/fonts/Apercu-Bold.ttf')
    });

    this.setState({ fontLoaded: false });

    /* Firebase project key information */
    const config = {
      apiKey: 'AIzaSyB9ctz8a9i9JA9hI8fWIMBPuIJ-M5KNHTM',
      authDomain: 'vibe-736a2.firebaseapp.com',
      databaseURL: 'https://vibe-736a2.firebaseio.com',
      projectId: 'vibe-736a2',
      storageBucket: 'vibe-736a2.appspot.com',
      messagingSenderId: '49430317049'
    };
    firebase.initializeApp(config);

    const apiKey = '8453e5bfed94fced5e457a11aab4bb41';
    Amplitude.initialize(apiKey);
    Amplitude.logEvent('APP_OPENED');
  }

  render() {
    //if the font hasn't loaded yet, don't show the app now
    if (this.state.fontLoaded) {
      return <AppLoading />;
    }

    //variable store to pass into the provider
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      //wrapping the app within one provider, following the redux framework
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}

/* Export the app */
export default App;
