import './App.css';
import ResponsiveAppBar from './components/navigation/ResponsiveAppBar';
import AssetRenderer from './components/home/AssetRenderer'

function App() {

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <AssetRenderer/>
    </div>
  );
}

export default App;
