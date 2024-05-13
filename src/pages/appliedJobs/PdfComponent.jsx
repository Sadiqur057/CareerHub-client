import PropTypes from "prop-types"
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfComponent = ({displayData}) => (
  <Document>
    <Page size="A4">
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.columnHeader}>
            <Text>Job Title</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text>Job Type</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text>Resume Link</Text>
          </View>
        </View>
        {
          displayData.map((data,idx)=><View key={idx} style={styles.row}>
            <View style={styles.column}>
              <Text>{data.job}</Text>
            </View>
            <View style={styles.column}>
              <Text>{data.job_category}</Text>
            </View>
            <View style={styles.column}>
              <Text>{data.resume}</Text>
            </View>
          </View>)
        }
        

      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'column',
    padding: 10,
    
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    display:'flex',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  column: {
    padding: 8,
    minWidth:'100px'
    
  },
  columnHeader: {
    padding: 8,
    display:'flex',
    minWidth:'100px',
  },
});

PdfComponent.propTypes = {
  displayData: PropTypes.array
}

export default PdfComponent;
