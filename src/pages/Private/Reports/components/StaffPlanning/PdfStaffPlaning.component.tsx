import { FC } from 'react';

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer';
import { Footfall } from '../../models/day.interface';
import { Staff } from '../../models/staff.interface';

import logo from '../../../../../assets/logo.png';
import { format } from 'date-fns';

interface Props {
  footfalls: Footfall[];
  staffs: Staff[];
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

export const PdfStaffPlaning: FC<Props> = ({ footfalls, staffs }) => {
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
            Planificación de personal
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
            Planificación de personal de{' '}
            {format(footfalls[0].date, 'YYYY-MM-dd')} hasta{' '}
            {format(footfalls[footfalls.length - 1].date, 'YYYY-MM-dd')}
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
            <Text style={styles.text}>Asistencia</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Chefs</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Cocineros</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Meseros</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Personal total</Text>
          </View>
        </View>
        {footfalls.map((day, index) => (
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
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{day.affluences.find(affluence => affluence.type === TypeAffluence["PREDICTED"])?.affluence}</Text>
            </View> */}
            <View style={styles.column}>
              <Text style={styles.text}>{staffs[index].chefs}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{staffs[index].cooks}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{staffs[index].waiters}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{staffs[index].total}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};
