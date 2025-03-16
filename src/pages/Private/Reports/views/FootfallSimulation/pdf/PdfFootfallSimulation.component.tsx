import { FC } from 'react';

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { IDay } from '../../../models/day.interface';

import logo from '../../../../../../assets/logo.png';

interface Props {
  days: IDay[];
  month?: string;
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

export const PdfFootfallSimulation: FC<Props> = ({ days, month }) => {
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
            Simulación de afluencia
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

          {/* {
            month
              ? <Text style={{ fontSize: 12, marginBottom: 2 }}>Simulación de afluencia del mes {month}</Text>
              : <Text style={{ fontSize: 12, marginBottom: 2 }}>Predicción de afluencia de {days[0].date} hasta {days[days.length - 1].date} </Text>

          } */}
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
          <View style={styles.column}>
            <Text style={styles.text}>Feriado</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Asistencia Simulada</Text>
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
            {/* <View style={styles.column}>
              <Text style={styles.text}>{day.date}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.nameDay}</Text>
            </View> */}
            <View style={styles.column}>
              <Text style={styles.text}>{day.temp} °C</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.precip}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.holiday ? 'Sí' : 'No'}</Text>
            </View>
            {/* <View style={{ flex: 1 }}>
              <Text style={styles.text}>{day.affluences.find(affluence => affluence.type === TypeAffluence["SIMULATED"])?.affluence}</Text>
            </View> */}
          </View>
        ))}
      </Page>
    </Document>
  );
};
