import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Order, TypeOrder } from '../../../../models';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatMoney } from '../../Common/helpers/format-money.helper';

import { Restaurant } from '../../Common/models/restaurant.model';

/**
 * Generates a PDF document for an order
 * @param order - The order to generate the PDF for
 * @param restaurant - The restaurant associated with the order
 * @returns A promise that resolves to the generated PDF document
 * @author Steven Rosales 
 * @version V1.0 29-03-2025 Add restaurant information to PDF
 */

export const generateOrderPdf = async (
  order: Order,
  restaurant: Restaurant
): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts as any);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A7');
  pdf.pageMargins([10, 10, 10, 10]);
  pdf.defaultStyle({
    fontSize: 8
  });

  pdf.add(
    await new Img(restaurant!.logo)
      .width(35)
      .height(35)
      .alignment('center')
      .margin([0, 0, 0, 10])
      .build()
  );

  pdf.add(new Txt(restaurant!.name).alignment('center').bold().end);

  pdf.add(
    pdf.add(
      new Txt(`Pedido N° ${order.num}`)
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    )
  );

  pdf.add(
    new Txt(
      `Tipo: ${
        order.type === TypeOrder.IN_PLACE ? 'Para servir' : 'Para llevar'
      }`
    ).margin([0, 0, 0, 5]).end
  );

  if (order.type === TypeOrder.IN_PLACE) {
    pdf.add(new Txt(`Mesa ${order.table?.name}`).margin([0, 0, 0, 5]).end);
  }

  pdf.add(
    new Txt(
      `Fecha: ${format(new Date(order.createdAt), 'dd MMMM yyyy HH:mm', {
        locale: es
      })}`
    ).margin([0, 0, 0, 5]).end
  );

  pdf.add(
    new Txt(
      `Entrega: ${format(new Date(order.deliveryTime), 'dd MMMM yyyy HH:mm', {
        locale: es
      })}`
    ).margin([0, 0, 0, 10]).end
  );

  pdf.add(new Txt('Mesero').bold().end);

  pdf.add(
    new Txt(
      `${order.user?.person.lastName} ${order.user?.person.firstName} `
    ).margin([0, 0, 0, 10]).end
  );

  if (order.notes) {
    pdf.add(new Txt('Notas').bold().margin([0, 0, 0, 5]).end);
    pdf.add(new Txt(`${order.notes}`).margin([0, 0, 0, 10]).end);
  }

// ... existing code ...
  pdf.add(new Txt('Productos').bold().margin([0, 0, 0, 5]).end);

  const header = ['Cant.', 'Producto', 'Descripción','Precio'];
  const body = order.details.map(detail => [
    detail.quantity,
    detail.product.name.slice(0, 20),
    detail.description || '--',
    formatMoney(detail.price)
  ]);

  pdf.add(
    new Table([
      header,
      ...body
    ])
    .widths(['auto', '*', '*','*'])
    .layout('lightHorizontalLines')
    .margin([0, 0, 0, 10,])
    .end
  );

  pdf.add(
    new Txt('Total ' + formatMoney(order.total)).margin([0, 10, 0, 0]).bold()
      .end
  );
// ... existing code ...

  pdf.info({
    title: `Pedido #${order.num}`,
    author: `${restaurant!.name}`,
    subject: `Pedido #${order.num}`,
    keywords: `Pedido #${order.num}`,
    creator: `${restaurant!.name}`,
    producer: `${restaurant!.name}`,
    creationDate: new Date().toDateString()
  });

  return pdf.create();
};
