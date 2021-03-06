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
    try {
        const { id: tagId } = req.params;
        const tag = await Tag.findByPk(tagId, { include: { model: Product } });
        res.status(200).json(tag);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
    // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
    // create Ida new tag

    try {
        const { tagName } = req.body;
        const newTag = await Tag.create(
            { tagName },
            { include: { model: Product } }
        );
        res.status(200).json(newTag);
    } catch (err) {
        res.status(500);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id: tagId } = req.params;
        const updatedTag = await Tag.update(req.body, { where: { id: tagId } });
        console.log("hi" + updatedTag);
        // if (!updateTag[0]) {
        //     res.status(404);
        //     res.send("You have tried to update a Tag that doesn't exist");
        // }
        console.log(" ere ");
        res.status(200);
        res.send(`tag with an id of ${tagId} has been updated`);
    } catch (err) {
        res.status(500);
    }
    // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
    // delete on tag by its `id` value
    try {
        const { id: tagId } = req.params;
        const deletedTag = await Tag.destroy({ where: { id: tagId } });
        res.status(200).send(`tag with an id of ${tagId} has been deleted`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
