import { ICreatePDF, Img, PdfMakeWrapper, Txt } from "pdfmake-wrapper";
import { Order, TypeOrder } from "../../../../models";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatMoney } from "../../Common/helpers/format-money.helper";

import logo from "../../../../assets/logo3.png";

export const generateOrderPdf = async (order: Order): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize("A7");
  pdf.pageMargins([10, 10, 10, 10]);
  pdf.defaultStyle({
    fontSize: 8,
  });

  pdf.add(
    await new Img(logo)
      .width(35)
      .height(35)
      .alignment("center")
      .margin([0, 0, 0, 10])
      .build()
  );

  pdf.add(new Txt("Restaurant Doña Yoli").alignment("center").bold().end);

  pdf.add(
    pdf.add(
      new Txt(`Pedido N° ${order.num}`)
        .alignment("center")
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    )
  );

  pdf.add(
    new Txt(
      `Tipo: ${
        order.type === TypeOrder.IN_PLACE ? "Para servir" : "Para llevar"
      }`
    ).margin([0, 0, 0, 5]).end
  );

  if (order.type === TypeOrder.IN_PLACE) {
    pdf.add(new Txt(`Mesa ${order.table?.name}`).margin([0, 0, 0, 5]).end);
  }

  pdf.add(
    new Txt(
      `Fecha: ${format(new Date(order.createdAt), "dd MMMM yyyy HH:mm", {
        locale: es,
      })}`
    ).margin([0, 0, 0, 5]).end
  );

  pdf.add(
    new Txt(
      `Entrega: ${format(new Date(order.deliveryTime), "dd MMMM yyyy HH:mm", {
        locale: es,
      })}`
    ).margin([0, 0, 0, 10]).end
  );

  pdf.add(new Txt("Mesero").bold().end);

  pdf.add(
    new Txt(
      `${order.user?.person.lastName} ${order.user?.person.firstName} `
    ).margin([0, 0, 0, 10]).end
  );

  if (order.notes) {
    pdf.add(new Txt("Notas").bold().margin([0, 0, 0, 5]).end);
    pdf.add(new Txt(`${order.notes}`).margin([0, 0, 0, 10]).end);
  }

  pdf.add(new Txt("Productos").bold().margin([0, 0, 0, 5]).end);

  order.details.forEach((detail) => {
    pdf.add(new Txt(`${detail.quantity} - ${detail.product.name}`).end);
    pdf.add(new Txt(`${detail.description}`).margin([0, 0, 0, 5]).end);
  });

  pdf.add(
    new Txt("Total " + formatMoney(order.total)).margin([0, 10, 0, 0]).bold()
      .end
  );

  return pdf.create();
};
