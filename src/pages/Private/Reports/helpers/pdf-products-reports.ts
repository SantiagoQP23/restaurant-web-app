import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import {
  BestSellingCategoriesResponse,
  ResultBestSellingProducts
} from '../services/dashboard.service';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatMoney } from '../../Common/helpers/format-money.helper';
import { DateFilterDto } from '../../Common/dto';
import { Period } from '../../Common/dto/period.model';

import logo from '../../../../assets/logo3.png';

export const generateProductsReport = async (
  filters: any,
  { categories }: BestSellingCategoriesResponse,
  { products }: ResultBestSellingProducts
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
    await new Img(logo)
      .width(50)
      .height(50)
      .alignment('center')
      .margin([0, 0, 0, 10])
      .build()
  );

  pdf.add(new Txt('Restaurante Doña Yoli').alignment('center').bold().end);

  pdf.add(
    new Txt('Reporte de Productos y categorías')
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

  const categoriesHeader = ['Categoría', 'Cantidad de productos vendidos'];
  const categoriesBody = categories.map((category) => [
    category.categoryName,
    category.totalSold
  ]);

  pdf.add(new Txt('Categorías más vendidos').bold().margin([0, 10, 0, 10]).end);
  pdf.add(
    new Table([categoriesHeader, ...categoriesBody])
      .widths(['*', '*'])
      .layout('lightHorizontalLines').end
  );

  const productsHeader = ['Producto', 'Categoría', 'Cantidad', 'Ingresos'];
  const productsBody = products.map((product) => [
    product.productName,
    product.categoryName,
    product.totalSold,
    formatMoney(product.productPrice * product.totalSold)
  ]);

  pdf.add(new Txt('Productos más vendidos').bold().margin([0, 10, 0, 10]).end);

  pdf.add(
    new Table([productsHeader, ...productsBody])
      .widths(['*', '*', '*', '*'])
      .layout('lightHorizontalLines').end
  );

  return pdf.create();
};
