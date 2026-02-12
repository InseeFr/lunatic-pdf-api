import React from 'react';
//import { PdfRequestFromBody } from '../models/types';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../components/styles';
import { LogoInsee } from './LogoInsee';

interface TitlePageProps {
    surveyTitle: string;
    usualSurveyUnitId: string;
    validationDate: string;
}

export const TitlePage: React.FC<TitlePageProps> = ({ surveyTitle, usualSurveyUnitId, validationDate }) => {

    const currentDate = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedValidationDate = new Date(validationDate).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.titleView}>
                <View style={{ marginBottom: 20 }}>
                    <LogoInsee />
                </View>

                <View style={{
                    width: '100%',
                    maxWidth: 400,
                    marginBottom: 40
                }}>
                    <Text style={styles.titleHeader}>

                        Récapitulatif {surveyTitle}
                    </Text>
                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.titleSubHeader}>
                            Unité enquêtée
                        </Text>
                        <Text style={styles.titleLabel}>
                            {usualSurveyUnitId}
                        </Text>
                    </View>

                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.titleSubHeader}>
                            Date de validation
                        </Text>
                        <Text style={styles.titleLabel}>

                            {formattedValidationDate}
                        </Text>
                    </View>

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
