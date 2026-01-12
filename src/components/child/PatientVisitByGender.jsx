import React, { useState, useEffect } from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const PatientVisitByGender = () => {
  let { patientVisitChartOptions } = useReactApexChart();
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      return {
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
        data: [
          2500000, 1800000, 8500000, 12000000, 2800000, 15000000, 2900000,
          3200000, 900000, 10500000, 3500000, 4200000,
        ],
      };
    };

    fetchChartData().then((response) => {
      setCategories(response.categories);
      setSeries([{ name: "Visits", data: response.data }]);
    });
  }, []);

  const formatValue = (value) => {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + "Cr";
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2) + "L";
    }
    return value;
  };

  const chartOptions = {
    ...patientVisitChartOptions,
    xaxis: {
      ...patientVisitChartOptions.xaxis,
      categories: categories,
    },
    yaxis: {
      labels: {
        formatter: (value) => formatValue(value),
        style: {
          fontSize: "14px",
          colors: "#666",  // visual fix
        },
      },
    },
    grid: {
      show: true,
      padding: {
        left: 20,
        right: 0,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => formatValue(val),
      },
    },
    dataLabels: {
      enabled: false, // cleaner look
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
            <ReactApexChart
              options={chartOptions}
              series={series}
              type="bar"
              height={260}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVisitByGender;
