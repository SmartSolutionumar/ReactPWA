import CanvasJSReact from '../assets/canvasjs.react';
var React = require('react');
var Component = React.Component;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;




class ColumnChart extends Component {
  constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e) {
		if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	openModal = (e) =>{
    var id = e.dataPoint.data;
    var name = e.dataSeries.name;
        var type = '';
        if(this.props.Headprop === 'DR'){
        type = 5;
        }if(this.props.Headprop === 'CR'){
        type = 6;
        }if(this.props.Headprop === 'NR'){
        type = 7;
        }if(this.props.Headprop === 'OTH'){
        type = 8;
        }

        var contype = '';
        if(name === 'Implementation'){
          contype = 1;
        }if(name === 'Live'){
          contype = 2;
        }if(name === 'AMC'){
          contype = 3;
        }if(name === 'Other'){
          contype = 4;
        }
        this.props.openModal(type,0,id,e.dataPoint.label +" - ("+ e.dataPoint.y+")",contype); 
		
	}

		render() {
      let value = this.props.value;
	 
    //   CanvasJS.addColorSet("priority",colors);


                const options = {
                    height: 250,
                    // colorSet: "ConShades",
                    zoomEnabled: true,
                    toolTip: {
                      shared: true
                    },
                    legend:{
                                cursor: "pointer",
                                itemclick: this.toggleDataSeries
                            },
                      animationEnabled: true,
                        
                        axisX : {
                          gridThickness:0, 
                          labelMaxWidth: 80,
                          labelAngle: 50,
                          labelFontSize: 10,
                          interval:1,
                        },
                        axisY:{
                          gridThickness: 0
                        },
                        data: [
                      {
                          type: "column",
                          indexLabel: "{y}",
                          indexLabelFormatter: function(e) {
                            if (e.dataPoint.y === 0)
                              return "";
                            else
                              return e.dataPoint.y;
                          },
                          indexLabelPlacement: "outside", 
                          indexLabelFontSize:12,
                          indexLabelFontWeight:800,
                          toolTipContent: " {label}<br/><span style='\"'color: #4C9CA0;'\"'>Complaint No</span> : {Comno}<br/><span style='\"'color: #4C9CA0;'\"'>StartTime</span> : {Descriptions1}<br/><span style='\"'color: #4C9CA0;'\"'>TimeTaken</span> : {y} mins",
                          indexLabelFontColor: "#5A5757",
                        //   click: this.openModal,
                          dataPoints:  value, 
                        }
                
                      ]
		}

							const options2 = {
											theme: "light2", // "light1", "light2", "dark1", "dark2"
											 animationEnabled: true,
											
											height: 230,
											 colorSet: "ByType",

											 subtitles:[{
													 text: "No Record",
													 horizontalAlign: "center",
													 verticalAlign: "center",
													 fontSize: 16,
													 fontFamily: "Roboto,Helvetica Neue,sans-serif"
											 }]
						}


		return (
		<div className="chartbuild">
				{(() => {
					if (value) {
					return (
						<CanvasJSChart options = {options}
						onRef={ref => this.chart = ref}
						/>
					)
					} else {
					return (
						<CanvasJSChart options = {options2}
						onRef={ref => this.chart = ref}
						/>
					)
					}
				})()}

			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ColumnChart;
