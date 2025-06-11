import fs from 'fs';
import { TDocumentDefinitions } from "pdfmake/interfaces";

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {
  return {
    content: [
      {
        svg: svgContent,
        width: 100,
        fit: [100, 100]
      }
    ]
  }
};