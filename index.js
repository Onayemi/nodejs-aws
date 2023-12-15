const express = require('express');
// const { getData } = require('./dynamo');
const { getData, getDataById, addOrUpdateData } = require('./dynamo');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
    <center>
    <h1>API Endpoint Developed By Taiwo Ajayi </h1>
    <h3>
    Fetch all  Get: http://35.182.248.242/details <br/><br/>
    Fetch By ID  Get: http://35.182.248.242/details/1 <br/><br/>
    Create Details  Post: http://35.182.248.242/details <br/><br/>
    </h3>
    </center>
    `);
    // res.send('Hello World');
});

app.get('/details', async (req, res) => {
    try {
        const details = await getData();
        res.json(details);
    } catch (error) {
        // console.error(error)
        res.status(500).json({err: "something went wrong"});
    }
});

app.get('/details/:cust_id', async (req, res) => {
    const cust_id = req.params.cust_id;
    try {
        const details = await getDataById(cust_id);
        res.json(details);
    } catch (error) {
        // console.error(error)
        res.status(500).json({err: "something went wrong"});
    }
});

app.post('/details', async (req, res) => {
    const detail = req.body;
    try {
        const newDetail = await addOrUpdateData(detail);
        res.json({status: true, message: newDetail});
    } catch (error) {
        // console.error(error)
        res.status(500).json({err: "something went wrong"});
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});