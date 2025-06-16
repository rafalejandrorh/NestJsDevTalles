import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "../sections/header.section";
import { footerSection } from "../sections/footer.section";
import { generateDonutChart } from "../charts/donut.chart";
import { generatetLineChart } from "../charts/line.chart";


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
  
  const [donutChart, lineChart] = await Promise.all([
    generateDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers
      })),
      legend: {
        position: 'left'
      }
    }),
    generatetLineChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers
      })),
      legend: {},
      title: 'Movimiento de Inventario'
    })
  ])

  return {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de Clientes',
      subtitle: options.subTitle ?? 'Top 10 de Países con más Clientes',
      showLogo: true,
      showDate: true
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 Países con más Clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10]
              },
              {
                image: donutChart,
                width: 300
              },
            ]
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
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
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20]
      }
    ]
  }

};