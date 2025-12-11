import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { formatMoney } from '../../Common/helpers/format-money.helper';

import logo from '../../../../assets/logo3.png';
import { CashRegister } from '../models/cash-register.model';

export const generatePdfCashReport = async (
  cash: CashRegister
): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts as any);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A4');
  // pdf.pageMargins([10, 10, 10, 10]);
  pdf.defaultStyle({
    fontSize: 10
  });

  pdf.add(
    await new Img(logo)
      .width(50)
      .height(50)
      .alignment('center')
      .margin([0, 0, 0, 10])
      .build()
  );

  pdf.add(new Txt('Restaurant Doña Yoli').alignment('center').bold().end);

  pdf.add(
    new Txt('Reporte de caja')
      .alignment('center')
      .bold()
      .fontSize(15)
      .margin([0, 10, 0, 1]).end
  );

  // Fecha de generación del reporte
  pdf.add(
    new Txt(
      `Generado en: ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: es })}`
    )
      .margin([0, 0, 0, 10])
      .alignment('center')
      .fontSize(8).end
  );

  pdf.add(new Txt(`Información de apertura`).bold().margin([0, 0, 0, 10]).end);

  pdf.add(
    new Txt(
      `Fecha: ${format(new Date(cash.createdAt), 'dd MMMM yyyy HH:mm', {
        locale: es
      })}`
    ).end
  );
  pdf.add(
    new Txt(
      `Aperturado por: ${cash.createdBy.person.firstName} ${cash.createdBy.person.lastName}`
    ).margin([0, 5, 0, 5]).end
  );

  pdf.add(
    new Txt(`Resumen de transacciones en efectivo`)
      .bold()
      .margin([0, 10, 0, 10]).end
  );

  pdf.add(
    new Txt(`Monto inicial: ${formatMoney(cash.initialAmount)}`).margin([
      0, 0, 0, 5
    ]).end
  );
  pdf.add(
    new Txt(`Ingresos ${formatMoney(cash.totalIncome)}`).margin([0, 10, 0, 5])
      .end
  );

  pdf.add(
    new Txt(`Egresos ${formatMoney(cash.totalExpense)}`).margin([0, 10, 0, 5])
      .end
  );

  pdf.add(
    new Txt(`Balance: ${formatMoney(cash.balance)}`).margin([0, 0, 0, 5]).bold()
      .end
  );

  pdf.add(
    new Txt(`Resumen de transacciones en transferencias`)
      .bold()
      .margin([0, 10, 0, 10]).end
  );

  if (cash.isClosed) {
    pdf.add(new Txt(`Información de cierre`).bold().margin([0, 10, 0, 10]).end);

    pdf.add(
      new Txt(`Monto final: ${formatMoney(cash.finalAmount)}`).margin([
        0, 0, 0, 5
      ]).end
    );

    pdf.add(
      new Txt(`Diferencia: ${formatMoney(cash.discrepancy)}`).margin([
        0, 0, 0, 5
      ]).end
    );

    pdf.add(
      new Txt(
        `Cerrado por: ${cash.closedBy.person.firstName} ${cash.closedBy.person.lastName}`
      ).margin([0, 0, 0, 5]).end
    );
  }

  pdf.add(
    new Txt(`Transacciones`).alignment('center').bold().margin([0, 10, 0, 5])
      .end
  );

  const transactionsHeaders = ['Fecha', 'Monto', 'Descripción', 'Responsable'];
  const transactionsData = cash.cashTransactions.map((transaction) => [
    format(new Date(transaction.createdAt), 'dd MMMM yyyy HH:mm', {
      locale: es
    }),
    formatMoney(transaction.amount),
    transaction.description,
    `${transaction.performedBy.person.firstName} ${transaction.performedBy.person.lastName}`
  ]);

  pdf.add(
    new Table([transactionsHeaders, ...transactionsData]).widths([
      'auto',
      'auto',
      '*',
      'auto',
      '*'
    ]).end
  );

  return pdf.create();
};
