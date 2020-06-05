import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import ReactFusioncharts from "react-fusioncharts";
import ReactFC from 'react-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import UmberTheme from 'fusioncharts/themes/fusioncharts.theme.umber';
import Loader from '../../loader/loader';

import './lineChart.css';

ReactFC.fcRoot(FusionCharts, Charts, UmberTheme);

class LineChart extends Component {

  state = {
    loading: false,
    chart: {
      caption: "USD",
      yaxisname: "EUR",
      subcaption: "[05.21-06.03]",
      numbersuffix: "",
      rotatelabels: "1",
      setadaptiveymin: "1",
      theme: 'umber'
    },
    data: []
  }

  componentDidMount() {
    this.setState({loading: true})
    fetch('https://api.exchangeratesapi.io/history?start_at=2020-05-21&end_at=2020-06-03&symbols=USD')
      .then(data => data.json())
      .then(result => {        
        let material = [];

        Object.getOwnPropertyNames(result.rates).forEach(item => {
          material.push({
            label: item, 
            value: result.rates[item]['USD'].toString()
          })
        })
        this.setState({
          loading: false,
          data: material
        })
      })
  }

  render () {
    const { loading, data } = this.state;

    if(loading) {
      return <Loader />
    }

    return (
      <>
        {
          data && 
          <ReactFusioncharts
            type="line"
            width="100%"
            height="95%"
            dataFormat="JSON"
            dataSource={this.state}/>
        }
      </>
    )
    
  }
}

export default LineChart;