import type { Content } from "pdfmake/interfaces";

export const footerSection = (currentPage: number, pageCount: number): Content => {
  return {
    text: currentPage && pageCount ? `Page ${currentPage.toString()} of ${pageCount}` : '',
    fontSize: 12,
    bold: true,
    alignment: 'right',
    margin: [0, 15, 40, 0]
  }
}


