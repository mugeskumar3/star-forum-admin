import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";

// Initialize the 3D module with fallback for different export structures
if (typeof highcharts3d === "function") {
  highcharts3d(Highcharts);
} else if (typeof highcharts3d === "object" && highcharts3d.default) {
  highcharts3d.default(Highcharts);
}

const PatientVisitByGender = () => {
  const options = {
    chart: {
      type: "column",
      height: 350,
      options3d: {
        enabled: true,
        alpha: 0,
        beta: 25,
        depth: 100,
        viewDistance: 0,
      },
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        skew3d: true,
        style: {
          fontSize: "12px",
          color: "#333",
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      max: 80,
      title: {
        text: "",
      },
      gridLineWidth: 1,
      gridLineColor: "#e0e0e0",
      labels: {
        style: {
          fontSize: "12px",
          color: "#333",
        },
      },
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true, // Distributed colors
        edgeWidth: 1,
        edgeColor: "rgba(0,0,0,0.1)",
        groupZPadding: 10,
      },
    },
    colors: [
      {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, "#C4161C"], // Start with Red
          [1, "#1F1E46"], // End with Blue
        ],
      },
    ],
    series: [
      {
        name: "Visits",
        data: [15, 25, 42, 38, 30, 75, 52, 62, 5, 2, 2, 2],
        showInLegend: false,
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat: "Visits: {point.y}",
    },
  };

  return (
    <div className="col-xxl-12">
      <div className="card h-100">
        <div className="card-header border-bottom bg-base py-16 px-24">
          <h6 className="text-lg fw-semibold mb-0">
            Overall Business Achievement
          </h6>
        </div>
        <div className="card-body p-24">
          <div id="patientVisitChart" className="y-value-left">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVisitByGender;
