import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, updateCategory, updateSection } from '../../../../redux';
import { ICategory, IProduct } from '../../../../models';

export const useEditMenuStore = () => {
  const { sections, products, categories } = useSelector(selectMenu);
  const dispatch = useDispatch();

  const findSectionById = (id: string) => {
    return sections.find((section) => section.id === id);
  };

  const findProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const findCategoryById = (id: string) => {
    return categories.find((category) => category.id === id);
  };

  const addProductToCategory = (product: IProduct, category: ICategory) => {
    dispatch(
      updateCategory({
        ...category,
        products: [...category.products, product]
      })
    );
  };

  const addCategoryToSection = (category: ICategory, sectionId: string) => {
    const section = findSectionById(sectionId);

    if (!section) return;

    dispatch(
      updateSection({
        ...section,
        categories: [...section.categories, category]
      })
    );
  };

  const removeCategoryFromSection = (
    category: ICategory,
    sectionId: string
  ) => {
    const section = findSectionById(sectionId);

    if (!section) return;

    dispatch(
      updateSection({
        ...section,
        categories: section.categories.filter((c) => c.id !== category.id)
      })
    );
  };

  const updateCategoryInSections = (category: ICategory) => {
    const section = findSectionById(category.section.id);

    if (!section) return;

    const updatedCategories = section.categories.map((c) =>
      c.id === category.id ? category : c
    );

    dispatch(updateSection({ ...section, categories: updatedCategories }));
  };

  const removeProductFromCategory = (
    product: IProduct,
    category: ICategory
  ) => {
    dispatch(
      updateCategory({
        ...category,
        products: category.products.filter((p) => p.id !== product.id)
      })
    );
  };

  const changeProductCategory = (product: IProduct, oldCategoryId: string) => {
    const newCategory = findCategoryById(product.category.id);

    if (newCategory) addProductToCategory(product, newCategory);

    const oldCategory = findCategoryById(oldCategoryId);

    if (oldCategory) removeProductFromCategory(product, oldCategory);
  };

  const changeCategorySection = (category: ICategory, oldSectionId: string) => {
    const newSection = findSectionById(category.section.id);

    if (newSection) addCategoryToSection(category, newSection.id);

    const oldSection = findSectionById(oldSectionId);

    if (oldSection) removeCategoryFromSection(category, oldSection.id);
  };

  return {
    addCategoryToSection,
    addProductToCategory,
    changeProductCategory,
    findCategoryById,
    findProductById,
    findSectionById,
    removeProductFromCategory,
    removeCategoryFromSection,
    changeCategorySection,
    updateCategoryInSections
  };
};
