const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const allCategories = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(allCategories);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    const { id: categoryId } = req.params;
    console.log(categoryId);
    try {
        const selectedCategory = await Category.findByPk(
            categoryId
            // include: [{ model: Product }],
        );
        res.status(200).json(selectedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    // create a new category
    try {
        const { category_name: newCategoryName } = req.body;
        const newCategory = await Category.create({
            categoryName: newCategoryName,
        });
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(500);
    }
});

router.put("/:id", async (req, res) => {
    // update a category by its `id` value
    try {
        const { id: categoryId } = req.params;
        const { categoryName: updatedCategoryName } = req.body;
        console.log(updatedCategoryName);
        const updatedCategory = Category.update(
            { category_name: updatedCategoryName },
            {
                where: { id: categoryId },
            }
        );
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500);
    }
});

router.delete("/:id", async (req, res) => {
    // delete a category by its `id` value
    try {
        const { id: categoryId } = req.params;
        const deletedCategory = Category.destroy({ where: { id: categoryId } });
        res.status(200).json(deletedCategory);
    } catch (err) {
        res.status(500);
    }
});

module.exports = router;
