export interface GenesisData {
    rawResponseModels: RawResponseModel[];
    lunaticRawDataModels: LunaticRawDataModel[];
}

export interface RawResponseModel {
    id: {
        timestamp: number;
        date: string;
    };
    interrogationId: string;
    collectionInstrumentId: string;
    mode: string;
    payload: Payload;
    recordDate: string;
    processDate: string;
}

export interface Payload {
    majorModelVersion: string;
    interrogationId: string;
    technicalSurveyUnitId: string;
    usualSurveyUnitId: string;
    partitionId: string;
    collectionInstrumentId: string;
    mode: string;
    isCapturedIndirectly: boolean;
    questionnaireState: string;
    validationDate: string;
    data: Data;
}

export interface Data {
    EXTERNAL: any;
    COLLECTED: any;
}


export interface LunaticRawDataModel {
    id: {
        timestamp: number;
        date: string;
    };
    questionnaireId: string;
    interrogationId: string;
    idUe: string;
    mode: string;
    data: any;
    recordDate: string;
    processDate: string;
}