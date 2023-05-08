import './App.css';
import ResponsiveAppBar from './components/navigation/ResponsiveAppBar';
import { WebSocketDemo } from './components/home/SocketConnection';

function App() {

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <WebSocketDemo/>

        {/* <ChartRenderer/> */}
    </div>
  );
}

export default App;
