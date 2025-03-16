import {
  ICreatePDF,
  PdfMakeWrapper,
  Txt,
  Table as TablePdf,
  Img
} from 'pdfmake-wrapper';
import { Invoice } from '../../Orders/models/Invoice.model';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { formatMoney } from '../../Common/helpers/format-money.helper';
import { getPaymentMethod } from '../../Common/helpers/get-payment-method';
import { format } from 'date-fns';

import logo from '../../../../assets/logo3.png';
import { es } from 'date-fns/locale';

export const generateInvoicePdf = async (
  invoice: Invoice
): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A5');
  pdf.defaultStyle({
    fontSize: 10
  });

  pdf.add(
    await new Img(logo).width(50).height(50).margin([0, 0, 0, 0]).build()
  );

  // margin: left top right bottom
  pdf.add(
    new Txt('Restaurante Doña Yoli').bold().fontSize(14).margin([0, 5, 0, 0])
      .end
  );

  pdf.add(new Txt('Teléfono: 0992629516').end);

  pdf.add(new Txt('Email: restaurantedeyoli@gmail.com').end);

  pdf.add(new Txt('San Pablo - Santa Elena').end);

  pdf.add(
    new Txt(`Comprobante N° ${invoice.transactionNumber}`)
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

  pdf.add(
    new Txt(
      `${invoice.client?.person.lastName} ${invoice.client?.person.firstName} `
    ).end
  );

  pdf.add(new Txt(`Dirección: ${invoice.client?.address}`).end);

  if (invoice.client?.person.identification?.num === '0999999999') {
    pdf.add(new Txt(`RUC/C.I.: `).end);
  } else {
    pdf.add(
      new Txt(`RUC/C.I.: ${invoice.client?.person.identification?.num}`).end
    );
  }

  pdf.add(new Txt(`Email: ${invoice.client?.person.email}`).end);

  pdf.add(
    new Txt(`Teléfono: ${invoice.client?.person.numPhone}`).margin([0, 0, 0, 0])
      .end
  );

  pdf.add(new Txt('Productos').bold().fontSize(14).margin([0, 10, 0, 5]).end);

  const productHeaders = ['Producto', 'Cantidad', 'Precio', 'Total'];
  const productData = invoice.details.map((detail) => [
    detail.product.name,
    detail.quantity,
    formatMoney(detail.price),
    formatMoney(detail.amount)
  ]);
  const amount = ['', '', 'Subtotal', formatMoney(invoice.amount)];

  const discount = ['', '', 'Descuento', formatMoney(invoice.discount || 0)];

  const total = ['', '', 'Total', formatMoney(invoice.total || 0)];
  pdf.add(
    new TablePdf([productHeaders, ...productData, amount, discount, total])
      .layout('lightHorizontalLines')
      .widths('*').end
  );

  // pdf.add(`Forma de pago: ${}`);

  if (invoice.paymentMethod && invoice.amountPaid) {
    pdf.add(
      `${getPaymentMethod(invoice.paymentMethod)}: ${formatMoney(
        invoice.amountPaid
      )}`
    );
  }

  pdf.add(`Cambio: ${formatMoney(invoice.difference || 0)}`);

  pdf.add(new Txt('Observaciones').bold().margin([0, 10, 0, 5]).end);

  pdf.add(new Txt(invoice.comments).end);

  pdf.add(
    new Txt('¡Gracias por su visitarnos!')
      .alignment('center')
      .margin([0, 20, 0, 0]).end
  );

  return pdf.create();
};
