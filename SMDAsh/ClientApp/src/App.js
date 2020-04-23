import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ChartAno from "./components/ChartAno";
import RpaAno from './components/RpaAno';
//import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-labels';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {
    return (
        <div className="App">
            <ChartAno />
            <RpaAno />
            
        </div>
    );}
 

export default App;
