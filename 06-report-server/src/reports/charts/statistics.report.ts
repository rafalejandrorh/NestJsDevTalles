import { TDocumentDefinitions } from "pdfmake/interfaces";
import { title } from "process";
import * as Utils from 'src/helpers/chart-utils';

interface TopCountry {
  country: string | null;
  customers: number | null;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountriesDonut = async (topCountries: TopCountry[]): Promise<string> => {
  const data = {
    labels: topCountries.map((country) => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((country) => country.customers),
        //backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };
  
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left'
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

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {
  const donutChart = await generateTopCountriesDonut(options.topCountries);

  return {
    content: [
      {
        image: donutChart,
        width: 500
      }
    ]
  }

};