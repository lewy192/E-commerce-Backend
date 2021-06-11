const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const allTags = await Tag.findAll({ include: { model: Product } });

        res.status(200).json(allTags);
    } catch (err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
    // find a single tag by its `id`
    const { tagId } = req.params.id;
    try {
        const tag = await Tag.findByPk({ where: { id: tagId } });
        res.status(200).json(tag);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
    // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
    // create Ida new tag
    const { tagId, tagName } = req.body;
    try {
        const newTag = await Tag.create({ id: tagId, tagName: tagName });
        res.status(200).json(newTag);
    } catch (err) {
        res.status(500);
    }
});

router.put("/:id", async (req, res) => {
    const { tagId } = req.params;
    const { newTagId, newTagName } = req.body;
    try {
        const newTag = await Tag.update(
            { id: newTagId, tagName: newTagName },
            { where: { id: tagId } }
        );
        res.json(newTag);
    } catch (err) {
        res.status(500);
    }
    // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
    // delete on tag by its `id` value
    const { tagId } = req.params;
    try {
        const deletedTag = await Tag.destroy({ where: { id: tagId } });
        res.status(200).json(deletedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
