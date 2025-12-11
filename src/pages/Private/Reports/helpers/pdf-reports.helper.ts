import { ICreatePDF, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DateFilterDto } from '../../Common/dto';
import { ResponseIncomesByUser } from '../services/dashboard.service';
import { Period } from '../../Common/dto/period.model';
import { format } from 'date-fns';
import { Chart as ChartJS } from 'chart.js';
import { formatMoney } from '../../Common/helpers/format-money.helper';
import { es } from 'date-fns/locale';

import logo from '../../../../assets/logo3.png';

export function triggerTooltip(chart: ChartJS | null) {
  if (!chart) {
    return;
  }

  const tooltip = chart.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2
        },
        {
          datasetIndex: 1,
          index: 2
        }
      ],
      {
        x: (chartArea?.left + chartArea?.right) / 2 || 0,
        y: (chartArea?.top + chartArea?.bottom) / 2 || 0
      }
    );
  }

  chart.update();
}

export const generateWaiterReportPdf = async (
  data: ResponseIncomesByUser[],
  filterDto: DateFilterDto,
  urlImage?: string
): Promise<ICreatePDF> => {
  PdfMakeWrapper.setFonts(pdfFonts as any);

  const { period, startDate, endDate } = filterDto;

  const pdf = new PdfMakeWrapper();

  pdf.pageSize('A4');

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
    new Txt('Reporte de desempeño de meseros')
      .alignment('center')
      .bold()
      .fontSize(15)
      .margin([0, 10, 0, 1]).end
  );

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
    const chartWidth = 200; // Ajusta el ancho del gráfico en el PDF
    const chartHeight = 150; // Ajusta la altura del gráfico en el PDF

    pdf.add(
      pdf.add(
        await new Img(urlImage).width(chartWidth).height(chartHeight).build()
      )
    );
  }

  pdf.add(
    new Txt('Datos')
      .alignment('center')
      .bold()
      .fontSize(10)
      .margin([0, 10, 0, 10]).end
  );

  const headers = [
    { text: 'Mesero', bold: true },
    { text: 'Pedidos', bold: true },
    { text: 'Total', bold: true }
  ];

  const body = data.map((item) => {
    return [
      `${item.firstName} ${item.lastName}`,
      item.orderCount,
      formatMoney(Number(item.total))
    ];
  });

  pdf.add(
    new Table([headers, ...body])
      .widths(['*', '*', '*'])
      .layout('lightHorizontalLines').end
  );

  return pdf.create();
};
