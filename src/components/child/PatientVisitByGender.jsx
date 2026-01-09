import React, { useState, useEffect } from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const PatientVisitByGender = () => {
  let { patientVisitChartOptions } = useReactApexChart();
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("Month");

  // Simulated API fetch
  const fetchChartData = async (selectedFilter) => {
    // In a real app, you would fetch data here
    return new Promise((resolve) => {
      setTimeout(() => {
        if (selectedFilter === "Week") {
          resolve({
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: [120, 150, 180, 220, 190, 250, 300],
          });
        } else if (selectedFilter === "Year") {
          resolve({
            categories: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            data: [2100, 1800, 2500, 2200, 2800, 3000, 2900, 3200, 2700, 3100, 3500, 3800],
          });
        } else {
          // Month - generate days for current month
          const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          const dailyData = Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 100) + 50);
          resolve({
            categories: days,
            data: dailyData,
          });
        }
      }, 500); // Simulate network delay
    });
  };

  useEffect(() => {
    fetchChartData(filter).then((response) => {
      setCategories(response.categories);
      setSeries([{ name: "Visits", data: response.data }]);
    });
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Merge dynamic categories with base options
  const chartOptions = {
    ...patientVisitChartOptions,
    xaxis: {
      ...patientVisitChartOptions.xaxis,
      categories: categories,
    },
  };

  // Calculate totals for the legend (optional/mock)
  const totalVisits = series[0]?.data.reduce((a, b) => a + b, 0) || 0;
  const maleVisits = Math.floor(totalVisits * 0.45);
  const femaleVisits = totalVisits - maleVisits;

  return (
    <div className='col-xxl-12'>
      <div className='card h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>
              Patient Visit By Gender
            </h6>
            <select
              className='form-select form-select-sm w-auto bg-base border-0 text-secondary-light'
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="Month">This Month</option>
              <option value="Week">This Week</option>
              <option value="Year">This Year</option>
            </select>
          </div>
        </div>
        <div className='card-body p-24'>
          <div id='patientVisitChart' className='margin-16-minus y-value-left'>
            <ReactApexChart
              options={chartOptions}
              series={series}
              type='bar'
              height={260}
              width={"100%"}
            />
          </div>
          <ul className='d-flex flex-wrap align-items-center justify-content-center my-3 gap-3'>
            <li className='d-flex align-items-center gap-2'>
              <span className='w-12-px h-8-px rounded-pill bg-warning-600' />
              <span className='text-secondary-light text-sm fw-semibold'>
                Male:
                <span className='text-primary-light fw-bold'>{maleVisits}</span>
              </span>
            </li>
            <li className='d-flex align-items-center gap-2'>
              <span className='w-12-px h-8-px rounded-pill bg-success-600' />
              <span className='text-secondary-light text-sm fw-semibold'>
                Female:
                <span className='text-primary-light fw-bold'> {femaleVisits}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientVisitByGender;
