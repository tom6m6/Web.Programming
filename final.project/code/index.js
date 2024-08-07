const express = require('express');
const app = express();

const router_sina = require('./router/router_sina');
const router_wy = require('./router/router_wy');
const router_eastmoney = require('./router/router_eastmoney');
const router_user = require('./router/router_user');
const router_charts = require('./router/router_charts');

const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router_sina);
app.use(router_wy);
app.use(router_eastmoney);
app.use(router_user);
app.use(router_charts);

app.listen(3000);