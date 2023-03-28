import { useEffect, useState } from 'react';
import './App.css';
import RecipeReviewCard from './components/home/Card';
import HomePage from './components/home/HomePage';
import ResponsiveAppBar from './components/navigation/ResponsiveAppBar';

function App() {
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    //get data
    setArrayData([
    "Page 1", 
    "Page ",
    "Page 4",
    "Page 4",
    "Page 4",
    "Page 44",
    "Page 44",
    "Page 44",
    "Page 44",
    "Page 44",
    "Page 14",
    "Page 44",
    "Page 44",
    "Page 44",

   ])
  }, [])

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <header className="App-header">
        <div>
          {arrayData.map((x)=> {
            return (
             <div>
                <HomePage name = {x}/>
                <RecipeReviewCard name = {x}/>
             </div>)
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
