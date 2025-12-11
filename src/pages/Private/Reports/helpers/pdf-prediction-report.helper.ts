import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Footfall } from '../models/day.interface';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import logo from '../../../../assets/logo3.png';

export const generatePredictionReport = async (
  data: Footfall[],
  urlImage: string
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
    new Txt('Reporte de Predicción de afluencia')
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

  if (urlImage) {
    const chartWidth = 350; // Ajusta el ancho del gráfico en el PDF
    const chartHeight = 250; // Ajusta la altura del gráfico en el PDF

    pdf.add(
      await new Img(urlImage).width(chartWidth).height(chartHeight).build()
    );
  }

  const header = ['Fecha', 'Afluencia'];
  const body = data.map((item) => {
    // return [item.date, item.quantity]
    return [
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
