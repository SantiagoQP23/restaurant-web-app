import { create } from 'zustand';
import { ProductionArea } from '../models/production-area.model';

interface ProductionAreasState {
  productionAreas: ProductionArea[];
  productionAreaActive: ProductionArea | null;
  setProductionAreaActive: (productionArea: ProductionArea | null) => void;
  loadProductionAreas: (productionAreas: ProductionArea[]) => void;
  addProductionArea: (productionArea: ProductionArea) => void;
  updateProductionArea: (productionArea: ProductionArea) => void;
  deleteProductionArea: (productionAreaId: number) => void;
}

export const useProductionAreasStore = create<ProductionAreasState>(
  (set, get) => ({
    productionAreas: [],
    productionAreaActive: null,
    setProductionAreaActive: (productionArea: ProductionArea | null) =>
      set({ productionAreaActive: productionArea }),

    loadProductionAreas: (productionAreas: ProductionArea[]) =>
      set({ productionAreas }),
    addProductionArea: (productionArea: ProductionArea) => {
      const productionAreas = [...get().productionAreas, productionArea];
      set({ productionAreas });
    },
    updateProductionArea: (productionArea: ProductionArea) => {
      const productionAreas = get().productionAreas.map((p) => {
        if (p.id === productionArea.id) {
          return productionArea;
        }
        return p;
      });
      set({ productionAreas });
    },
    deleteProductionArea: (productionAreaId: number) => {
      const productionAreas = get().productionAreas.filter(
        (p) => p.id !== productionAreaId
      );
      set({ productionAreas });
    }
  })
);
