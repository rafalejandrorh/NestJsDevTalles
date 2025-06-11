import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { countries as Country } from "generated/prisma";
import { headerSection } from "../sections/header.section";
import { footerSection } from "../sections/footer.section";

interface ReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountriesListReport = (options: ReportOptions): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;
  
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subTitle ?? 'List of Countries',
      showDate: true,
      showLogo: true,
    }),
    footer: footerSection,
    pageMargins: [ 40, 110, 40, 60 ],
    content: [
      {
        layout: 'customLayout01', //'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [ 50, 50, 50, '*', 'auto', '*' ],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              { text: country.id.toString() },
              { text: country.iso2 },
              { text: country.iso3 },
              { text: country.name, bold: true },
              { text: country.continent },
              { text: country.local_name },
            ]),
            ['', '', '', '', '', ``],

            // Option 1: Total Countries
            // [
            //   '',
            //   '',
            //   '',
            //   '',
            //   'Total',
            //   {
            //     text: `${countries.length} países`,
            //     bold: true,
            //   },
            // ],
            //[ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ],
          ]
        }
      },
      // Option 2: Total Countries
      // Tabla de totales
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de países',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${countries.length} países`,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      }
    ]
  }

}