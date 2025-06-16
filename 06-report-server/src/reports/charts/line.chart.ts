import * as Utils from 'src/helpers/chart-utils';

interface LineEntry {
  label: string | null;
  value: number | null;
}

interface LineOptions {
  entries: LineEntry[];
  legend: {
    display?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
  };
  title?: string;
}

export const generatetLineChart = async (options: LineOptions): Promise<string> => {
  const { legend: { position  = 'top' }, title = 'Gráfica de Líneas' } = options;

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: title,
        data: Utils.numbers({count: 6, min: -100, max: 100}),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
      }
    ]
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {
      legend: {
        position: position
      },
    },
  };

  return Utils.chartJsToImage(config, {
    width: 500,
    height: 200
  });
}