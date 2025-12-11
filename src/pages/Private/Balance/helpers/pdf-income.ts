import { ICreatePDF, Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { Income } from '../models/income.model';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatMoney } from '../../Common/helpers/format-money.helper';
import { getPaymentMethod } from '../../Common/helpers/get-payment-method';

import logo from '../../../../assets/logo3.png';

export const generatePdfIncome = async (
  income: Income
): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts as any);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A7');
  pdf.pageMargins([10, 10, 10, 10]);
  pdf.defaultStyle({
    fontSize: 8
  });

  pdf.add(
    await new Img(logo)
      .width(35)
      .height(35)
      .alignment('center')
      .margin([0, 0, 0, 10])
      .build()
  );

  pdf.add(new Txt('Restaurante Doña Yoli').alignment('center').bold().end);

  pdf.add(
    pdf.add(
      new Txt(`Transacción N° ${income.transaction.num}`)
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    )
  );

  pdf.add(
    new Txt('Ingreso').alignment('center').margin([0, 0, 0, 10]).bold().end
  );

  pdf.add(
    new Txt(
      `Fecha: ${format(new Date(income.createdAt), 'dd MMMM yyyy HH:mm', { locale: es })}`
    ).margin([0, 0, 0, 5]).end
  );

  pdf.add(
    new Txt(`Monto: ${formatMoney(income.transaction.amount)}`).margin([
      0, 0, 0, 5
    ]).end
  );

  pdf.add(
    new Txt(`Descripción: ${income.transaction.description}`).margin([
      0, 0, 0, 5
    ]).end
  );

  pdf.add(
    new Txt(
      `Método de pago: ${getPaymentMethod(income.transaction.paymentMethod)}`
    ).margin([0, 0, 0, 5]).end
  );

  // pdf.add(
  //   new Txt(`Responsable: ${income.transaction.responsible.person.firstName} ${income.transaction.responsible.person.lastName}`).margin([0, 0, 0, 5]).end
  // );

  pdf.add(
    new Txt(
      `Registrado por: ${income.transaction.user.person.firstName} ${income.transaction.user.person.lastName}`
    ).margin([0, 0, 0, 5]).end
  );

  // Espacio para firmar

  pdf.add(new Txt('Firma').alignment('center').margin([0, 10, 0, 15]).end);

  pdf.add(
    new Txt('_________________________')
      .alignment('center')
      .margin([0, 0, 0, 1]).end
  );
  pdf.add(
    new Txt(
      `${income.transaction.user.person.firstName} ${income.transaction.user.person.lastName}`
    )
      .alignment('center')
      .margin([0, 0, 0, 5]).end
  );

  return pdf.create();
};
