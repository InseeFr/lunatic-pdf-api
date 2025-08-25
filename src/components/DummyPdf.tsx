import { Document, Page, Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "./style";
import { FirstPage } from "./FirstPage";

export const DummyPdf = ({ source, data }: { source: string; data: any }) => {
  return (
    <Document pageMode="useOutlines" creationDate={new Date()}>
      <FirstPage />
      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text>Source :</Text>
          <Text>{source}</Text>
          <Text>Data :</Text>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      </Page>
    </Document>
  );
};
