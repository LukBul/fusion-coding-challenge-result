import React, { Component } from 'react';
import Navigation from '../navigation';
import ColumnChart from '../charts/columnChart';
import './app.css';
import LineChart from '../charts/lineChart';

class App extends Component {

  state = {
    activeChart: ''
  }

  onChartChange = (title) => {
    this.setState({
      activeChart: title
    })
  }

  render() {
    const { activeChart } = this.state;
    let chart;

    switch(activeChart) {
      case 'line':
        chart = <LineChart /> 
        break;
      case 'column':
        chart = <ColumnChart />
        break;
      default:
        chart = <p className="empty">Choose a chart</p>
    }

    return (
      <div className="app">
        <Navigation 
          onChartChange={this.onChartChange}
          activeChart={activeChart}>
        </Navigation>
        <div className="chartField">
          { chart }
        </div>
      </div>
    );
  }
}

export default App;
