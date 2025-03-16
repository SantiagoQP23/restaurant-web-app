import { FC } from 'react';

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { IDay, Footfall } from '../../../models/day.interface';

import logo from '../../../../../../assets/logo.png';
import { format } from 'date-fns';

interface Props {
  days: IDay[];
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

export const PdfFootfallPrediction: FC<Props> = ({ days }) => {
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
            Predicción de afluencia
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
            Predicción de afluencia de {format(days[0].date, 'YYYY-MM-dd')}{' '}
            hasta {format(days[days.length - 1].date, 'YYYY-MM-dd')}{' '}
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
            <Text style={styles.text}>Temperatura promedio</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Precipitacion {'(mm)'}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Asistencia</Text>
          </View>
        </View>
        {days.map((day, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: 'black'
            }}
          >
            <View style={styles.column}>
              <Text style={styles.text}>{format(day.date, 'YYYY-MM-dd')}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.name}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.temp} °C</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.precip}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{day.name}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};
