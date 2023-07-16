import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

const formatNumber = (value) => {
  return value.toFixed(2);
};

// chart options
const areaChartOptions = {
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return formatNumber(val) + '%';
    }
  },
  //   chart: {
  //     height: 340,
  //     type: 'line',
  //     toolbar: {
  //       show: false
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },

  tooltip: {
    x: {
      format: 'MM'
    }
  }
};
const separateValueLabel = (data) => {
  const labels = [];
  const values = [];
  data.forEach((element) => {
    labels.push(element.label);
    values.push(element.value);
  });
  return { labels, values };
};

// ==============================|| REPORT AREA CHART ||============================== //

const DonutChart = (props) => {
  const { data, legendClick } = props;
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    const { labels, values } = separateValueLabel(data || []);
    setSeries(values);
    setLabels(labels);
    setOptions((prevState) => ({
      ...prevState,
      //   colors: [theme.palette.warning.main],
      grid: {
        borderColor: line
      },
      labels: labels,
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      },
      chart: {
        events: {
          legendClick: legendClick
        }
      }
    }));
  }, [primary, secondary, line, theme, data]);

  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  return <ReactApexChart options={options} series={series} height={345} type="donut" labels={labels} />;
};

export default DonutChart;
