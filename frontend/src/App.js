
// import './App.css';
import AppRoute from './routes/appRoute.js'
import {Provider} from 'react-redux'
import store from '../src/store/Store.js'

function App() {
  return (
    <>
    <Provider store={store}>    
      <AppRoute/>
    </Provider>
    </>
  );
}

export default App;
