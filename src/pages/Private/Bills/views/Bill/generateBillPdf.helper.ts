import {
  ICreatePDF,
  PdfMakeWrapper,
  Txt,
  Table as TablePdf,
  Img
} from 'pdfmake-wrapper';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { format } from 'date-fns';

import { es } from 'date-fns/locale';
import { Restaurant } from '@/pages/Private/Common/models/restaurant.model';
import { formatMoney } from '@/pages/Private/Common/helpers/format-money.helper';
import { getPaymentMethod } from '@/pages/Private/Common/helpers/get-payment-method';
import { Bill } from '@/models/bill.model';

/**
 * Generate a pdf invoice
 * @version v1.0 11-04-2025 Add generate bill pdf
 * @author Steven Rosales
 */

export const generateBillPdf = async (
  invoice: Bill,
  restaurant: Restaurant
): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts as any);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A5');
  pdf.defaultStyle({
    fontSize: 10
  });

  pdf.add(
    await new Img(restaurant.logo).width(50).height(50).margin([0, 0, 0, 0]).build()
  );

  // margin: left top right bottom
  pdf.add(
    new Txt(restaurant.name).bold().fontSize(14).margin([0, 5, 0, 0])
      .end
  );

  pdf.add(new Txt(restaurant.phone).end);

  pdf.add(new Txt(restaurant.email).end);

  pdf.add(new Txt(restaurant.address).end);

  pdf.add(
    new Txt(`Comprobante N° ${invoice.id}`)
      .bold()
      .alignment('right')
      .fontSize(14)
      .margin([0, 10, 0, 10]).end
  );

  pdf.add(
    new Txt(
      `Fecha: ${format(new Date(invoice.createdAt), 'dd MMMM yyyy HH:mm', {
        locale: es
      })}`
    ).margin([0, 0, 0, 15]).end
  );

  pdf.add(new Txt('Cliente').bold().end);

  if (invoice.client?.person.lastName && invoice.client?.person.firstName) {
    pdf.add(
      new Txt(
        `${invoice.client?.person.lastName} ${invoice.client?.person.firstName} `
      ).end
    );
  } else {
    pdf.add(new Txt('Consumidor final').end);
  }

  if (invoice.client?.address) {
    pdf.add(new Txt(`Dirección: ${invoice.client?.address}`).end);
  }

  if (invoice.client?.person.identification?.num === '0999999999' || !invoice.client?.person.identification?.num) {
    pdf.add(new Txt(`RUC/C.I.: `).end);
  } else {
    pdf.add(
      new Txt(`RUC/C.I.: ${invoice.client?.person.identification?.num}`).end
    );
  }

  pdf.add(new Txt(`Email: ${invoice.client?.person.email || ''}`).end);

  if (invoice.client?.person.numPhone) {
    pdf.add(
      new Txt(`Teléfono: ${invoice.client?.person.numPhone}`).margin([0, 0, 0, 0])
        .end
    );
  } else {
    pdf.add(new Txt(`Teléfono: `).end);
  }


  pdf.add(new Txt('Productos').bold().fontSize(14).margin([0, 10, 0, 5]).end);

  const productHeaders = ['Producto', 'Cantidad', 'Precio', 'Total'];
  const productData = invoice.details.map((detail) => [
    detail.orderDetail.product.name,
    detail.quantity,
    formatMoney(detail.orderDetail.product.price),
    formatMoney(detail.orderDetail.product.price * detail.quantity)
  ]);
  const amount = ['', '', 'Subtotal', formatMoney(invoice.total || 0)];

  const discount = ['', '', 'Descuento', formatMoney(invoice.discount || 0)];

  const total = ['', '', 'Total', formatMoney(invoice.total || 0)];
  pdf.add(
    new TablePdf([productHeaders, ...productData, amount, discount, total])
      .layout('lightHorizontalLines')
      .widths('*').end
  );

  // pdf.add(`Forma de pago: ${}`);

  if (invoice.paymentMethod && invoice.total) {
    pdf.add(
      `${getPaymentMethod(invoice.paymentMethod)}: ${formatMoney(
        invoice.total
      )}`
    );
  }


  pdf.add(new Txt('Observaciones').bold().margin([0, 10, 0, 5]).end);

  pdf.add(new Txt(invoice.comments).end);

  pdf.add(
    new Txt('¡Gracias por su visitarnos!')
      .alignment('center')
      .margin([0, 20, 0, 0]).end
  );

  pdf.info({
    title: `Comprobante N° ${invoice.id}`,
    author: restaurant.name,
    creationDate: new Date().toISOString(),
  });

  return pdf.create();
};