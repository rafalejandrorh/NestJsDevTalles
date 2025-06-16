import { TDocumentDefinitions } from "pdfmake/interfaces";
import { generateDonutChart } from "./donut.chart";
import { headerSection } from "../sections/header.section";

interface TopCountry {
  country: string | null;
  customers: number | null;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {
  
  const donutChart = await generateDonutChart({
    entries: options.topCountries.map((c) => ({
      label: c.country,
      value: c.customers
    })),
    legend: {
      position: 'left'
    }
  });

  return {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de Clientes',
      subtitle: options.subTitle ?? 'Top 10 de Países con más Clientes',
      showLogo: true,
      showDate: true
    }),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Top 10 de Países con más Clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10]
              },
              {
                image: donutChart,
                width: 320
              },
            ]
          },
          {
            width: 'auto',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((c) => [
                  c.country ?? '',
                  c.customers ?? ''
                ])
              ]
            }
          }
        ]
      }
    ]
  }

};