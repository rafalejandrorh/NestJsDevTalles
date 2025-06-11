import fs from 'fs';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers/chart-utils'

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

const generateChartImage = () => {
  const chartConfig = {
    type: 'bar',                                // Show a bar chart
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Mi primer gráfico',
          data: [65, 59, 80, 81, 56, 55, 10],
          backgroundColor: 'rgba(93, 75, 192, 0.2)',
          borderColor: 'rgb(81, 75, 192)',
          borderWidth: 1,
        },
      ],
    }
  };

  return Utils.chartJsToImage(chartConfig);
}

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {
  const chart = await generateChartImage()

  return {
    content: [
      {
        svg: svgContent,
        width: 100,
        fit: [100, 100]
      },
      {
        image: chart,
        width: 500
      }
    ]
  }
};