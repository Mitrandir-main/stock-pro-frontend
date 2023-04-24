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
      {/* <Grid container spacing={2}>
      <Grid xs={12} md={6}> */}

       {/* <ChartLine/> */}
      {/* </Grid>
      <Grid xs={12} md={6}>
        <Chart2/>
      </Grid>
      <Grid xs={12} md={6}> */}
        <ChartRenderer/>
      {/* </Grid>

      </Grid> */}
    </div>
  );
}

export default App;
