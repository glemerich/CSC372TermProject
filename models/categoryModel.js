const categories = [
    { id: 1, name: 'Collectibles', priority_level: 1 },
    { id: 2, name: 'Cameras', priority_level: 2 },
    { id: 3, name: 'Toys', priority_level: 3 },
    { id: 4, name: 'Outdoor', priority_level: 4 },
];

exports.getAllCategories = () => categories;
exports.getCategoryById = (id) => categories.find((category) => category.id === parseInt(id));
exports.createCategory = (newCategory) => {
    const id = categories.length + 1;
    const category = { id, ...newCategory };
    categories.push(category);
    return category;
};
exports.updateCategory = (id, updatedCategory) => {
    const index = categories.findIndex((category) => category.id === parseInt(id));
    if (index !== -1) {
        categories[index] = { ...categories[index], ...updatedCategory };
        return categories[index];
    }
    return null;
};
exports.deleteCategory = (id) => {
    const index = categories.findIndex((category) => category.id === parseInt(id));
    if (index !== -1) categories.splice(index, 1);
};