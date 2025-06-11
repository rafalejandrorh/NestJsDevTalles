import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { bannerSection } from "../sections/banner.section";
import { footerSection } from "../sections/footer.section";
import { CurrencyFormatter, DateFormatter } from "src/helpers";

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0]
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0]
  }
}

export interface CompleteOrder {
  order_id:      number;
  customer_id:   number;
  order_date:    Date;
  customers:     Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id:   number;
  customer_name: string;
  contact_name:  string;
  address:       string;
  city:          string;
  postal_code:   string;
  country:       string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id:        number;
  product_id:      number;
  quantity:        number;
  products:        Products;
}

export interface Products {
  product_id:   number;
  product_name: string;
  category_id:  number;
  unit:         string;
  price:        string;
}


interface ReportValues {

  title?: string;
  subTitle?: string;
  data: CompleteOrder;

}

export const getOrderByIdReport = (value: ReportValues): TDocumentDefinitions => {

  const { data } = value;
  const { customers, order_details } = data;
  const subTotal = order_details.reduce((acc, detail) => acc + +detail.products.price * detail.quantity, 0);
  const total = subTotal * 1.15;

  return {
    styles: styles,
    header: bannerSection,
    footer: footerSection,
    pageMargins: [40, 60, 40, 60],
    content: [

      // Name Company
      {
        text: 'Tucan Code',
        style: 'header',
      },

      // Customer Detail
      {
        columns: [
          {
            text: `15 Montgomery Str, Suite 100,\n Ottawa ON K2Y 9X1, CANADA\n BN: 12783671823\n https://devtalles.com`,
          },
          {
            text: [
              {
                text: `Recibo No#: ${data.order_id}\n`,
                bold: true
              },
              {
                text: `Fecha del recibo: `,
                bold: true
              },
              `${DateFormatter.getDDMMMMYYYY(data.order_date)}\n`,
              {
                text: `Pagar antes de: `,
                bold: true
              }, 
              `${DateFormatter.getDDMMMMYYYY(new Date())}\n`
            ],
            alignment: 'right'
          }
        ]
      },

      //QR
      {
        qr: 'https://tucan-code.com',
        fit: 75,
        alignment: 'right'
      },

      // Customer Address
      {
        text: [
          {
            text: `Cobrar a:\n`,
            style: 'subHeader'
          },
          `Razón Social: ${customers.customer_name}\n Contacto: ${customers.contact_name}\n ${customers.address}, ${customers.city}, ${customers.country}\n`
        ]
      },

      // Table Order Details 
      {
        layout: 'headerLineOnly',
        margin: [0, 30],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],

            ...order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity,
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price),
              },
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                alignment: 'right'
              }

            ])
          ]

        }
      },

      `\n`,

      // Table Total
      {
        columns: [
          {
            width: '*',
            text: ''
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    bold: true,
                    alignment: 'right'
                  }
                ],
                [
                  {
                    text: 'Total',
                    bold: true,
                    alignment: 'right'
                  },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    bold: true,
                    alignment: 'right'
                  }
                ]
              ]
            }
          }
        ]
      }

    ]
  }

}