import { Nomenclature, NomenclatureItem } from "../models/nomenclature";

class NomenclatureCacheService {
    readonly cache: Map<string, NomenclatureItem[]> = new Map();

    /**
     * Set one nomenclature items in cache
     */
    setNomenclature(storeName: string, items: NomenclatureItem[]): void {
        console.log(`Added ${items.length} items for ${storeName}`);
        this.cache.set(storeName, items);
    }

    /**
    * Set all nomenclatures into cache (for preview mode)
    */
    setAllNomenclatures(nomenclatures: Nomenclature[]): void {
        console.log(`Set ${nomenclatures.length} nomenclatures into cache`);
        nomenclatures.forEach(nom => {
            this.setNomenclature(nom.id, nom.items);
        });
    }

    /**
     * Get nomenclature items from cache
     */
    getNomenclature(storeName: string): NomenclatureItem[] | undefined {
        const items = this.cache.get(storeName);
        if (items) {
            console.log(`Found nomenclature for ${storeName}`);
        } else {
            console.log(`Missing nomenclature for ${storeName}`);
        }
        return items;
    }

    /**
     * Check if nomenclature exists in cache
     */
    hasNomenclature(storeName: string): boolean {
        return this.cache.has(storeName);
    }

    /**
     * Get label for a specific item ID
     */
    getLabelFromCache(storeName: string, itemId: string): string | undefined {
        const items = this.getNomenclature(storeName);
        return items?.find(item => item.id === itemId)?.label;
    }


    /**
     * Clear the entire cache
     */
    clear(): void {
        console.log(`Clearing cache`);
        this.cache.clear();
    }

}

export const nomenclatureCache = new NomenclatureCacheService();