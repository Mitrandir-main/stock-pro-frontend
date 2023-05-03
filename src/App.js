import { useEffect, useState } from 'react';
import './App.css';
import RecipeReviewCard from './components/home/Card';
import HomePage from './components/home/HomePage';
import ResponsiveAppBar from './components/navigation/ResponsiveAppBar';
import { Grid } from '@mui/material';
import ChartLine from './components/home/Chart';
import Chart2 from './components/home/Chart2';
import ChartRenderer from './components/home/ChartRenderer';

function App() {

  return (
    <div className="App">
      <ResponsiveAppBar/>
        <ChartRenderer/>
    </div>
  );
}

export default App;
