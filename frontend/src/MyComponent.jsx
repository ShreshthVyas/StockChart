
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';
// import 'chartjs-adapter-date-fns';

// const MyComponent = () => {
//   const [instrumentName, setInstrumentName] = useState('NIFTY 50');
//   const [fromDate, setFromDate] = useState('2018-01-01');
//   const [toDate, setToDate] = useState('2018-03-01');
//   const [chartData, setChartData] = useState(null);
//   const [chartInstance, setChartInstance] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/historical-data/', {
//         params: {
//           instrument_name: instrumentName,
//           from_date: `${fromDate} 00:00:00+05:30`,
//           to_date: `${toDate} 00:00:00+05:30`
//         }
//       });
//       console.log('Data from server:', response.data);
//       setChartData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchData();
//   };

//   useEffect(() => {
//     if (chartInstance) {
//       chartInstance.destroy();
//     }
//     renderChart();
//   }, [chartData]); // Re-run when chartData changes

//   const renderChart = () => {
//     if (!chartData) return;
    
//     const labels = chartData.map(dataPoint => dataPoint.date);
//     const prices = chartData.map(dataPoint => dataPoint.price);

//     const ctx = document.getElementById('myChart').getContext('2d');
//     const newChartInstance = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Price',
//           data: prices,
//           borderColor: '#00FFFF', // Neon blue color
//           backgroundColor: '#000000', // Dark background color
//           borderWidth: 1
//         }]
//       }
//     });
//     setChartInstance(newChartInstance);
//   };

//   return (
//     <div className="bg-dark text-white p-5">
//       <h2 className="text-center mb-4">Chart Financial Insight</h2>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <div className="d-flex align-items-center">
//           <label className="me-2">Symbol:</label>
//           <select value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} className="me-2 form-select">
//             <option value="NIFTY 50">NIFTY 50</option>
//             <option value="NIFTY BANK">NIFTY BANK</option>
//           </select>
//           <label className="me-2">From Date:</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="me-2 form-control"
//           />
//           <label className="me-2">To Date:</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="me-2 form-control"
//           />
//           <button type="submit" className="btn btn-primary">Fetch Data</button>
//         </div>
//       </form>
//       <div>
//         <button className="btn btn-danger position-absolute top-0 end-0 mt-2 me-2">Logout</button>
//       </div>
//       <div>
//         <canvas id="myChart"></canvas>
//       </div>
//     </div>
//   );
// };

// export default MyComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const MyComponent = () => {
  const [instrumentName, setInstrumentName] = useState('NIFTY 50');
  const [fromDate, setFromDate] = useState('2018-01-01');
  const [toDate, setToDate] = useState('2018-03-01');
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/historical-data/', {
        params: {
          instrument_name: instrumentName,
          from_date: `${fromDate} 00:00:00+05:30`,
          to_date: `${toDate} 00:00:00+05:30`
        }
      });
      console.log('Data from server:', response.data);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    renderChart();
  }, [chartData]); // Re-run when chartData changes

  const renderChart = () => {
    if (!chartData) return;
    
    const labels = chartData.map(dataPoint => dataPoint.date);
    const prices = chartData.map(dataPoint => dataPoint.price);

    const ctx = document.getElementById('myChart').getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price',
          data: prices,
          borderColor: '#00FFFF', // Neon blue color
          backgroundColor: '#000000', // Dark background color
          borderWidth: 1
        }]
      }
    });
    setChartInstance(newChartInstance);
  };

  // Calculate min and max dates for the date inputs
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-dark text-white p-5">
      <h2 className="text-center mb-4">Chart Financial Insight</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="d-flex align-items-center">
          <label className="me-2">Symbol:</label>
          <select value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} className="me-2 form-select">
            <option value="NIFTY 50">NIFTY 50</option>
            <option value="NIFTY BANK">NIFTY BANK</option>
          </select>
          <label className="me-2">From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            min="2017-01-02" // Set minimum date allowed
            max=  "2021-01-27"
            className="me-2 form-control"
          />
          <label className="me-2">To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min="2017-01-02" // Set minimum date allowed
            max=  "2021-01-27"// Set maximum date allowed (current date)
            className="me-2 form-control"
          />
          <button type="submit" className="btn btn-primary">Fetch Data</button>
        </div>
      </form>
      <div>
        <button className="btn btn-danger position-absolute top-0 end-0 mt-2 me-2">Logout</button>
      </div>
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default MyComponent;

