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
      var data = e.dataSeries.name; 
      var type = '';
        if(data === 'DR'){
        type = 22;
        }if(data === 'CR'){
        type = 24;
        }if(data === 'NR'){
          type = 25;
        }if(data === 'Other'){
          type = 26;
        }

        this.props.openModal(type,id,0,e.dataPoint.text ,'',null); 
		
	}

		render() {
      let value = this.props.value;
      let value2 = this.props.value2;
      let value3 = this.props.value3;
      let value4 = this.props.value4;
	 
    //   CanvasJS.addColorSet("priority",colors);


                const options = {
                    height: 250,
                    // colorSet: "ConShades",
                    zoomEnabled: true,
                    toolTip: {
                      shared: true,
                      contentFormatter: function (e) { 
                          var content = " ";
                          var space = " ";
                          var label = "<span>Date :<span><strong>" + e.entries[0].dataPoint.text + "</strong><br/>";
                          for (var i = 0; i < e.entries.length; i++) { 
                              if(i=== 3){
                                  content += "<span style='color: #39C0AB;'>" + e.entries[i].dataSeries.name + " :</span>"+ space + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
                                  content += "<br/>";    
                              }else if(i=== 0){
                                  content += "<span style='color: #6D78AD;'>" + e.entries[i].dataSeries.name + ": </span>"+ space + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
                                  content += "<br/>";
                              }else if(i=== 1){
                                  content += "<span style='color: #C0504E;'>" + e.entries[i].dataSeries.name + ": </span>"+ space + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
                                  content += "<br/>";
                              }else{
                                  content += "<span style='color:#9BBB58;'>" + e.entries[i].dataSeries.name + ": </span>"+ space + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
                                  content += "<br/>";
                              }
                              
                          }
                          return label+content;
                      }
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
                          type: "stackedColumn",
                          name: "CR",
                          indexLabel: "{y}",
                          indexLabelFormatter: function(e) {
                            if (e.dataPoint.y === 0)
                              return "";
                            else
                              return e.dataPoint.y;
                          },
                          indexLabelFontSize:12,
                          indexLabelFontWeight:800,
                          // toolTipContent: " {label}<br/><span style='\"'color: #4C9CA0;'\"'>Total</span> : {y}",
                          indexLabelFontColor: "#5A5757",
                          showInLegend: true,
                          cursor: "pointer",
                          click: this.openModal,
                          dataPoints:  value2, 
                        },
                        {
                          type: "stackedColumn",
                          name: "DR",
                          indexLabel: "{y}",
                          indexLabelFormatter: function(e) {
                            if (e.dataPoint.y === 0)
                              return "";
                            else
                              return e.dataPoint.y;
                          },
                          indexLabelFontSize:12,
                          indexLabelFontWeight:800,
                          // toolTipContent: " {label}<br/><span style='\"'color: #4C9CA0;'\"'>Total</span> : {y}",
                          indexLabelFontColor: "#5A5757",
                          showInLegend: true,
                          click: this.openModal,
                          dataPoints:  value, 
                          cursor: "pointer"
                        },
                        {
                          type: "stackedColumn",
                          name: "NR",
                          indexLabel: "{y}",
                          indexLabelFormatter: function(e) {
                            if (e.dataPoint.y === 0)
                              return "";
                            else
                              return e.dataPoint.y;
                          },
                          indexLabelFontSize:12,
                          indexLabelFontWeight:800,
                          indexLabelFontColor: "#5A5757",
                          showInLegend: true,
                          click: this.openModal,
                          dataPoints:  value3, 
                          cursor: "pointer",
                        },
                        {
                          type: "stackedColumn",
                          name: "Other",
                          indexLabel: "{y}",
                          indexLabelFormatter: function(e) {
                            if (e.dataPoint.y === 0)
                              return "";
                            else
                              return e.dataPoint.y;
                          },
                          indexLabelFontSize:12,
                          indexLabelFontWeight:800,
                          indexLabelFontColor: "#5A5757",
                          showInLegend: true,
                          click: this.openModal,
                          dataPoints:  value4, 
                          cursor: "pointer",
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
		<div className="chartbuild" style={{width:'90vw'}}>
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
