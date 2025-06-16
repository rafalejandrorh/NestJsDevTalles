import * as Utils from 'src/helpers/chart-utils';

interface DonutEntry {
  label: string | null;
  value: number | null;
}

interface DonutOptions {
  entries: DonutEntry[];
  legend: {
    display?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
  };
}

export const generateDonutChart = async (options: DonutOptions): Promise<string> => {
  const { legend: { position  = 'top' } } = options;

  const data = {
    labels: options.entries.map((e) => e.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((e) => e.value),
        //backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };
  
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position
      },
      // title: {
      //   display: true,
      //   text: 'Top Countries',
      // },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    },
  };

  return Utils.chartJsToImage(config);
};