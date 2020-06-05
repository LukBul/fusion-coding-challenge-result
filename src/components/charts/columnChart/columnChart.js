import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import ReactFusioncharts from "react-fusioncharts";
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import ReactFC from 'react-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Loader from '../../loader/loader';

import './columnChart.css';

ReactFC.fcRoot(FusionCharts, Charts, CandyTheme);

class ColumnChart extends Component {

  state = {
    loading: false,
    chart: {
      caption: "Latest foreign exchange reference rates (EUR)",
      subcaption: "",
      xaxisname: "Country",
      yaxisname: "Rates",
      numbersuffix: "",
      theme: "candy"
    },
    data: []
  }

  componentDidMount() {
    this.setState({loading: true})
    fetch('https://api.exchangeratesapi.io/latest')
      .then(data => data.json())
      .then(result => {
        let material = [];

        Object.getOwnPropertyNames(result.rates).forEach(item => {
          material.push({
            label: item,
            value: result.rates[item].toString()
          })
        })
        this.setState({
          loading: false,
          data: material.slice(0, 10)
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
            type="column2d"
            width="100%"
            height="95%"
            dataFormat="JSON"
            dataSource={this.state}/>
        }
      </>
    )
    
  }
}

export default ColumnChart;