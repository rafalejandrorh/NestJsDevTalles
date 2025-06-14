import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrinterService } from 'src/printer/printer.service';
import { getStatisticsReport, getOrderByIdReport } from 'src/reports';
import { getBasicChartSvgReport } from 'src/reports/charts/basic-chart-svg.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {

  constructor(
    private readonly printer: PrinterService
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  async getOrderReportById(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true
          }
        },
      }
    });

    if(!order) throw new NotFoundException(`Order with id ${orderId} not found`);
    if(!order.customers) throw new NotFoundException(`Customer for order id ${orderId} not found`);

    return this.printer.createPdf(getOrderByIdReport({
      data: order as any
    }));
  }

  async getSvgCharts() {
    const docDefinition = await getBasicChartSvgReport();
    return this.printer.createPdf(docDefinition);
  }

  async getStatistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc'
        }
      },
      take: 10
    }); 

    const topCountryData = topCountries.map(({country, _count}) => ({
      country: country,
      customers: _count
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountryData
    });
    
    return this.printer.createPdf(docDefinition);
  }
  
}