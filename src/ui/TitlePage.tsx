import React from 'react';
//import { PdfRequestFromBody } from '../models/types';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../components/styles';
import { LogoInsee } from './logoInsee';


interface TitlePageProps {
    // Waiting for a proper mock json file
    // data: PdfRequestFromBody;

    data: any;
}

export const TitlePage: React.FC<TitlePageProps> = ({ data }) => {

    console.log('TitlePage data', data)
    const currentDate = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const surveyTitle = data.body.interrogation.collectionInstrumentId || "Titre du questionnaire";
    const validationDate = data.body.interrogation.payload.validationDate ? new Date(data.body.interrogation.payload.validationDate).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
        : null;

    console.log('validationDate', data.body.interrogation.payload.validationDate)

    const usualSurveyUnitId = data.body.interrogation.payload.usualSurveyUnitId || "ID de l'unité enquêtée";


    return (
        <Page size="A4" style={styles.page}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100%',
                padding: 40
            }}>
                <View style={{ marginBottom: 20 }}>
                    <LogoInsee />
                </View>

                <View style={{
                    width: '100%',
                    maxWidth: 400,
                    marginBottom: 40
                }}>
                    <Text style={styles.titleHeader}>

                        Données saisies pour {surveyTitle}
                    </Text>
                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.titleSubHeader}>
                            Unité enquêtée
                        </Text>
                        <Text style={styles.titleLabel}>
                            {usualSurveyUnitId}
                        </Text>
                    </View>

                    {validationDate && (
                        <View style={{ marginBottom: 25 }}>
                            <Text style={styles.titleSubHeader}>
                                Date de validation
                            </Text>
                            <Text style={styles.titleLabel}>

                                {validationDate}
                            </Text>
                        </View>
                    )}

                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.titleSubHeader}>
                            Date de génération du PDF
                        </Text>
                        <Text style={styles.titleLabel}>
                            {currentDate}
                        </Text>
                    </View>
                </View>
            </View>
        </Page>
    );
};

export default TitlePage;
