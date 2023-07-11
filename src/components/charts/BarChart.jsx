import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import api from '../../api/axios.js'

const date = new Date()
const month = date.getMonth()
class BarChart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  

  componentDidMount() {
    api.get('/agen',{withCredentials: true}).then(res=>{
      this.setState({
        chartData: [{
          name: "Perkembangan",
          data: [
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month-6).length,
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month-5).length,
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month-4).length,
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month-3).length,
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month-2).length,
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month-1).length,
            res.data.userData.filter(res=> new Date(res.dibuat_pada).getMonth() === month).length]
        }],
        chartOptions: this.props.chartOptions,
      });
    })
    
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default BarChart;
