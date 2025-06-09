import type { Column, Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'left',
  margin: [0, 0, 0, 20]
}

const currentDate: Column = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 150
}

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showLogo = true, showDate = true } = options;
  
  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate ? currentDate : '';

  const headerSubTitle: Content = subtitle ? {
    text: subtitle ? subtitle : '',
    fontSize: 16,
    bold: true,
    alignment: 'center',
    margin: [0, 2, 0, 0],
  } : '';
  const headerTitle: Content = title ? { 
    stack: [
      { text: title, 
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 15, 0, 0]
      },
      headerSubTitle
    ] 
  } : '';

  return {
    columns: [
      headerLogo,
      headerTitle,
      headerDate
    ]
  }
}