import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data_set = [];
class Chart extends Component {
  state = {
    labels: undefined,
    datasets: [
      {
        label: "Bitcoin",
        data: undefined,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1
      }
    ]
  };

  getDates = async () => {
    await fetch("https://api.coindesk.com/v1/bpi/historical/close.json") //Fetch JSON API for BPI of prev 30 days
      .then(data => data.json()) //Parse JSON Data
      .then(data => data.bpi) //Navigate to Array-Map of BPI in JSON
      .then(data => {
        let bpi = data; //Take in BPI Map for conversion
        let dates = Object.keys(bpi); //Parse array of 30 day dates for labels from BPI
        let vals = [];
        for (let i in bpi) {
          vals.push(bpi[i]); //Parse Array of 30 day cost for values from BPI map
        }
        let rgb = [
          255 * Math.random(),
          255 * Math.random(),
          255 * Math.random()
        ];
        let f = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.2)`; //Generate Fill
        let s = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 1)`; //Generate Stroke

        data_set.push({
          //Push to dataset array
          label: "Bitcoin",
          data: vals,
          backgroundColor: f,
          borderColor: s,
          borderWidth: 1
        });

        this.setState({
          labels: dates,
          datasets: data_set
        });
      });
  };

  componentDidMount() {
    this.getDates();
  }
  render() {
    return (
      <div className="chart">
        <Line
          type="line"
          data={this.state}
          height="100vh"
          options={{
            legend: {
              display: true,
              position: "top",
              labels: {
                boxWidth: 80,
                fontColor: "black"
              }
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Date",
                    fontColor: "black"
                  }
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Price",
                    fontColor: "black"
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
