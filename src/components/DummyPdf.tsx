import { Document, Page, Text, View } from "@react-pdf/renderer";

export const DummyPdf = ({ source, data }: { source: string; data: any }) => {
  return (
    <Document pageMode="useOutlines">
      <Page size="A4">
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
