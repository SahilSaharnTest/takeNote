
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App2 from './components/App2';

function App() {

  // const location = useLocation();
  //we have to use this inside the router component also known  as BrowserRouter...
  //so moved them to the app2.js 

  return (
    <>
      <Router>

        <App2/>

      </Router>
    </>
  );
  
}

export default App;
