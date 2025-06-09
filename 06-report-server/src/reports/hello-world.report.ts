import type { TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (options: ReportOptions): TDocumentDefinitions => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: `Hello ${name}`,
        style: 'header',
      },
      {
        text: 'This is a simple PDF report generated using pdfmake.',
        style: 'subheader',
      },
      {
        text: 'This report demonstrates basic text formatting and styles.',
        style: 'text',
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      text: {
        fontSize: 12,
      },
    },
  };
  return docDefinition;
}