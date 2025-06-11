import { Content } from "pdfmake/interfaces";

const banner: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  alignment: 'left',
  margin: [10, 30]
}

export const bannerSection = (): Content => {
  return banner;
}