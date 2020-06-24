import React from 'react';
import './App.css';
//redux store
import {Provider} from 'react-redux';
import {configureStore} from './store/configStore';
//Theme
import Theme from './theme';
import {ThemeProvider} from '@material-ui/styles';
//Router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Views
import {Map} from './map/map.page.container.component';
import {Navigation} from './shared/components/navigation/navigation.container.component';
import StyleWrapper from './shared/components/styleWrapper';
import {Admin} from './admin/components/admin.page.container.component';
import fetchAllServices from './shared/mongodbConnection';
import {Service} from './assets/data/dataType';
import {setContent} from './map/actions/map.actions';

const App: React.FC = () => {
  const store = configureStore();

  React.useEffect(() => {
    fetchAllServices().then((data: Service[]) =>
      store.dispatch(setContent(data))
    );
  });

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <StyleWrapper>
          <Router>
            <Navigation />
            <Switch>
              <Route path="/admin">
                <Admin />
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
