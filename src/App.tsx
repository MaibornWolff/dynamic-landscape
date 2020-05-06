import React from 'react';
import './App.css';

//redux store
import {Provider} from 'react-redux';
import {configureStore} from './store/configStore';

//Theme
import Theme from './theme';
import {ThemeProvider} from '@material-ui/styles';

//Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Views
import {Map} from './map/map.page.container.component';
import {Navigation} from './shared/components/navigation/navigation.container.component';
import StyleWrapper from './shared/components/styleWrapper';

const App: React.FC = () => {
  const store = configureStore();

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <StyleWrapper>
          <Router>
            <Navigation />
            <Switch>
              <Route path="/admin">
                <p>Admin Page</p>
              </Route>
              <Route path="/">
                <Map />
              </Route>
            </Switch>
          </Router>
        </StyleWrapper>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
