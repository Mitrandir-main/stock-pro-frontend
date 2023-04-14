import { useEffect, useState } from 'react';
import './App.css';
import RecipeReviewCard from './components/home/Card';
import HomePage from './components/home/HomePage';
import ResponsiveAppBar from './components/navigation/ResponsiveAppBar';
import { Grid } from '@mui/material';
import ChartLine from './components/home/Chart';

function App() {

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Grid>
      <ChartLine/>
      </Grid>
    </div>
  );
}

export default App;
