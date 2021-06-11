const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
    // find all products
    // be sure to include its associated Category and Tag data
});

// get one product
router.get("/:id", (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
});

// create new product
router.post("/", async (req, res) => {
    /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    const { product_name: productName, price, stock, tagIds } = req.body;
    try {
        const product = await Product.create(req.body);
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (tagIds.length) {
            const productTagIdArr = tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });
            const productTags = await ProductTag.bulkCreate(productTagIdArr);
            res.status(200).json();
        }
        // if no product tags, just respond
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
});

// update product
router.put("/:id", (req, res) => {
    // update product data
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            // find all associated tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // get list of current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // create filtered list of new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete("/:id", (req, res) => {
    // delete one product by its `id` value
});

module.exports = router;
