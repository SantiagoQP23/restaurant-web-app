import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Footfall } from '../models/day.interface';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ComparisonFootfallResponse,
  FootfallResponse
} from '../services/footfall.service';
import { DateFiltePaginationDto } from '../../Common/dto';
import { Period } from '../../Common/dto/period.model';

import img from '../../../../assets/logo3.png';

export const generateFootfallSimulationReport = async (
  data: FootfallResponse,
  filters: DateFiltePaginationDto,
  urlImage?: string
): Promise<ICreatePDF> => {
  const { period, startDate, endDate } = filters;

  PdfMakeWrapper.setFonts(pdfFonts as any);

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A4');
  // pdf.pageMargins([10, 10, 10, 10]);
  pdf.defaultStyle({
    fontSize: 10
  });

  pdf.add(
    await new Img(img)
      .width(50)
      .height(50)
      .alignment('center')
      .margin([0, 0, 0, 10])
      .build()
  );

  pdf.add(new Txt('Restaurant Doña Yoli').alignment('center').bold().end);

  pdf.add(
    new Txt('Reporte de Afluencia simulada')
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

  if (period === Period.DAILY) {
    pdf.add(
      new Txt(
        `Fecha: ${format(new Date(startDate!), 'eeee dd MMMM yyyy', { locale: es })}`
      )
        .alignment('center')
        .bold()
        .fontSize(10)
        .margin([0, 10, 0, 10]).end
    );
  } else if (period === Period.CUSTOM) {
    pdf.add(
      new Txt(
        `Desde: ${format(startDate!, 'eeee dd MMMM yyyy', { locale: es })} Hasta: ${format(endDate || new Date(), 'eeee dd MMMM yyyy', { locale: es })}`
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

  // // MAE
  // pdf.add(
  //   new Txt(`MAE: ${data.mae}`).margin([0, 0, 0, 10]).alignment('center').fontSize(8).end
  // );

  // // MAPE
  // pdf.add(
  //   new Txt(`MAPE: ${data.mape}`).margin([0, 0, 0, 10]).alignment('center').fontSize(8).end
  // );

  const header = ['Fecha', 'Afluencia simulada'];
  const body = data.footfall.map((item) => {
    // return [item.date, item.quantity]
    // return [format(new Date(item.date), 'eeee dd MMMM yyyy', {locale: es}), item.real, item.forecast, item.difference]
    return period === Period.YEARLY
      ? [item.date, item.quantity]
      : [
          format(new Date(item.date), 'eeee dd MMMM yyyy', { locale: es }),
          item.quantity
        ];
  });

  pdf.add(
    new Table([header, ...body])
      .widths(['*', '*'])
      .layout('lightHorizontalLines').end
  );

  return pdf.create();
};
