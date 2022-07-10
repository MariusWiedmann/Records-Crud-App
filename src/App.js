import CRUD from "./CRUD.js";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div><h1>Record Collector's CRUD App</h1>
      <p>To edit, simply click on the item you'd like to change!</p>
      </div>
      <div>
        <CRUD/>
      </div>
    </Router>
      
    
  );
}

export default App;