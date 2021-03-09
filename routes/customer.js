const express = require("express");
const customerDB = require("../utils/customerDB");
const validation = require("../utils/validation");
const { route } = require("./genre");

const router = express.Router();

// API to get full list of customers
router.get("/", async (req, res) => {
    return res.send(await customerDB.getAll());
});
// API to create new customer
router.post("/", async (req, res) => {
    // Validate request data passed by user
    const { error } = validation.validateCreateCustomer(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    res.send(await customerDB.createCustomer(req.body));
});
// API to retrieve single customer by ID
router.post("/:id", async (req, res) => {
    const customer = await customerDB.getCustomerById(req.params.id);
    // Handle request if customer is not found
    if (!customer)
        return res.status(404).send("The requested customer was not found");
    // Return customer to user
    return res.send(customer);
});
// API to delete single customer by ID
router.delete("/:id", async (req, res) => {
    const customer = await customerDB.deleteCustomerById(req.params.id);

    if (!customer) return res.send("Customer not found");

    return res.send(customer);
});
// API to update single customer by ID
router.put("/:id", async (req, res) => {
    const customer = await customerDB.updateCustomerById(
        req.params.id,
        req.body
    );

    if (!customer) return res.send("Customer not found");
    return res.send(customer);
});

module.exports = router;
