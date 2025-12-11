import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { DateFilterDto } from '../../Common/dto';
import { FinanceResponse } from '../services/finances.service';
import { Period } from '../../Common/dto/period.model';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatMoney } from '../../Common/helpers/format-money.helper';

import logo from '../../../../assets/logo3.png';

export const generateFinancialsReportPdf = async (
  data: FinanceResponse[],
  filters: DateFilterDto,
  urlImage?: string
): Promise<ICreatePDF> => {
  const { period, startDate, endDate } = filters;

  const balanceYear = data?.reduce((acc, month) => acc + month.balance, 0);

  const totalIncomes = data?.reduce(
    (acc, month) => acc + Number(month.income.total),
    0
  );

  const totalExpenses = data?.reduce(
    (acc, month) => acc + Number(month.expense.total),
    0
  );

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

  pdf.add(new Txt('Restaurante Doña Yoli').alignment('center').bold().end);

  pdf.add(
    new Txt('Reporte de Ingresos y gastos')
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

  // pdf.add(
  //   new Txt(`Filtros aplicados`).bold().margin([0, 10, 0, 10]).end
  // )

  if (period === Period.DAILY) {
    pdf.add(
      new Txt(
        `Fecha: ${format(new Date(startDate!), 'eeee dd MMMM yyyy', {
          locale: es
        })}`
      )
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    );
  } else if (period === Period.CUSTOM) {
    pdf.add(
      new Txt(
        `Desde: ${format(startDate!, 'eeee dd MMMM yyyy', {
          locale: es
        })} Hasta: ${format(endDate || new Date(), 'eeee dd MMMM yyyy', {
          locale: es
        })}`
      )
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    );
  } else if (period === Period.MONTHLY) {
    pdf.add(
      new Txt(`Mes: ${format(startDate!, 'MMMM', { locale: es })}`)
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    );
  } else if (period === Period.YEARLY) {
    pdf.add(
      new Txt(`Año: ${format(startDate!, 'yyyy')}`)
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    );
  }

  if (urlImage) {
    const chartWidth = 350; // Ajusta el ancho del gráfico en el PDF
    const chartHeight = 250; // Ajusta la altura del gráfico en el PDF

    pdf.add(
      await new Img(urlImage).width(chartWidth).height(chartHeight).build()
    );
  }

  pdf.add(new Txt('Resumen').bold().fontSize(10).margin([0, 10, 0, 5]).end);

  pdf.add(
    new Txt(`Total de ingresos: ${formatMoney(totalIncomes)}`)
      .fontSize(10)
      .margin([0, 10, 0, 5]).end
  );

  pdf.add(
    new Txt(`Total de egresos: ${formatMoney(totalExpenses)}`)
      .fontSize(10)
      .margin([0, 10, 0, 5]).end
  );

  pdf.add(
    new Txt(`Balance: ${formatMoney(balanceYear)}`)
      .bold()
      .fontSize(10)
      .margin([0, 10, 0, 10]).end
  );

  pdf.add(
    new Txt('Datos')
      .alignment('center')
      .bold()
      .fontSize(10)
      .margin([0, 10, 0, 10]).end
  );

  const headers = ['Fecha', 'Ingresos', 'Egresos', 'Balance'];

  const body = data.map((date) => [
    date.date,
    formatMoney(Number(date.income.total)),
    formatMoney(Number(date.expense.total)),
    formatMoney(date.balance)
  ]);

  pdf.add(new Table([headers, ...body]).widths(['*', '*', '*', '*']).end);

  return pdf.create();
};
