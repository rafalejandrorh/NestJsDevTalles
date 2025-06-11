import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrinterService } from 'src/printer/printer.service';
import { getOrderByIdReport } from 'src/reports';

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
    console.log(JSON.stringify(order, null, 2));
    console.log(order.customer_id);

    // Ensure 'customers' is not null to satisfy the CompleteOrder type
    if (!order.customers) {
      throw new NotFoundException(`Customer for order id ${orderId} not found`);
    }
    return this.printer.createPdf(getOrderByIdReport({
      data: order as any
    }));
  }

}