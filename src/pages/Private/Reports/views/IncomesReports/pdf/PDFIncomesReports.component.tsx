import { DateIncome } from '../../../models/date-orders.interface';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { FC } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import logo from '../../../../../../assets/logo.png';

interface Props {
  dates: DateIncome[];
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  column: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black'
  }
});

export const PDFIncomesReports: FC<Props> = ({ dates }) => {
  return (
    <Document>
      <Page size='A4' style={{ padding: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}
          >
            Ingresos
          </Text>
          <Image src={logo} style={{ width: 100, height: 100 }} />
        </View>

        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginBottom: 5,
              fontWeight: 'bold'
            }}
          >
            Restaurante Doña Yoli
          </Text>

          <Text style={{ fontSize: 12, marginBottom: 2 }}>
            {' '}
            Ingresos de Febrero{' '}
          </Text>
        </View>

        <View
          style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'black' }}
        >
          <View style={styles.column}>
            <Text style={styles.text}>Fecha</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Día</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Ingreso</Text>
          </View>
        </View>
        {dates.map((day, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: 'black'
            }}
          >
            <View style={styles.column}>
              <Text style={styles.text}>
                {format(new Date(day.date), 'dd/MM/yyyy', { locale: es })}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>
                {format(new Date(day.date), 'EEEE', { locale: es })}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.text}>$ {day.total}</Text>
            </View>
          </View>
        ))}

        <View
          style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'black' }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Total</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}></Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>
              $ {dates.reduce((acc, curr) => acc + curr.total, 0)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
