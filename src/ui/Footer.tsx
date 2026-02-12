import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../components/styles';

interface FooterProps {
    data?: any;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
    const surveyTitle = data?.body?.interrogation?.collectionInstrumentId ?? 'N/A';
    const usualSurveyUnitId = data?.body?.interrogation?.payload?.usualSurveyUnitId ?? null;
    const currentDate = new Date().toLocaleDateString('fr-FR');

    return (
        <>
            <View
                fixed
                style={styles.footerBar}
            />
            <View
                fixed
                style={styles.footerContent}
            >
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 8 }}>
                        {surveyTitle} - {usualSurveyUnitId ? `Unité enquêtée : ${usualSurveyUnitId}` : 'Unité enquêtée : N/A'}
                    </Text>
                    <Text style={{ fontSize: 8 }}>Généré : {currentDate}</Text>
                </View>
                <Text style={{ fontSize: 8 }} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} fixed />
            </View>
        </>
    );
};

export default Footer;