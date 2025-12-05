import { Nomenclature, NomenclatureItem } from "../models/nomenclature";
import { nomenclatureCache } from "./nomenclatureCacheService";

class NomenclatureLoaderService {
    private fetchPromises: Map<string, Promise<NomenclatureItem[]>> = new Map();

    /**
     * Get nomenclature items by storeName
     * Returns cached version if available, otherwise fetches
     */
    async getNomenclatures(storeName: string, nomenclatureSourceUri: string): Promise<NomenclatureItem[]> {
        const cachedItems = nomenclatureCache.getNomenclature(storeName);
        if (cachedItems) {
            return cachedItems;
        }

        if (this.fetchPromises.has(storeName)) {
            return this.fetchPromises.get(storeName)!;
        }

        const fetchPromise = this.fetchNomenclature(storeName, nomenclatureSourceUri);
        this.fetchPromises.set(storeName, fetchPromise);

        try {
            const items = await fetchPromise;
            nomenclatureCache.setNomenclature(storeName, items);
            return items;
        } finally {
            this.fetchPromises.delete(storeName);
        }
    }

    private async fetchNomenclature(storeName: string, nomenclatureSourceUri: string): Promise<NomenclatureItem[]> {
        try {
            const url = `${nomenclatureSourceUri}/nomenclatures/${storeName}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch nomenclature: ${response.statusText}`);
            }

            const nomenclature: Nomenclature = await response.json();
            return nomenclature.items;
        } catch (error) {
            console.error(`Error fetching nomenclature ${storeName}:`, error);
            return [];
        }
    }

    /**
     * Get label for a specific id from a nomenclature
     * Not used yet
     */
    async getLabel(storeName: string, id: string, nomenclatureSourceUri: string): Promise<string | undefined> {
        const cachedLabel = nomenclatureCache.getLabelFromCache(storeName, id);
        if (cachedLabel) {
            return cachedLabel;
        }

        const items = await this.getNomenclatures(storeName, nomenclatureSourceUri);
        return items.find(item => item.id === id)?.label;
    }

}

export const nomenclatureLoaderService = new NomenclatureLoaderService();