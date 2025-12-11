export type NomenclatureItem = {
    id: string;
    label: string
}

export type Nomenclature = {
    id: string;
    items: NomenclatureItem[];
}