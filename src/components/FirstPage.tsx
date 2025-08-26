import { Page, Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "./style";

export const FirstPage = () => {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <View>
        <Text style={pdfStyles.title}>Récapitulatif des données saisies</Text>
      </View>
    </Page>
  );
};
