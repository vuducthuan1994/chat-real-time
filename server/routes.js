module.exports = function(app, socket) {

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/mess/:from/:to", (req, res, next) => {
        var result = [];
        var user1 = req.params.from;
        var user2 = req.params.to;
        for (let j = 0; j < messengerList.length; j++) {
            const mess = messengerList[j];
            if ((mess.from == user1 && mess.to == user2) || (mess.from == user2 && mess.to == user1)) {
                result.push(mess);
            }
        }
        console.log(result);
        res.json(result);
    });
    app.get(`/accounts`, (request, response) => {
        response.json(accounts);
    });

    app.get(`/accounts/:id`, (request, response) => {
        const accountId = Number(request.params.id);
        const getAccount = accounts.find((account) => account.id === accountId);

        if (!getAccount) {
            response.status(500).send('Account not found.')
        } else {
            response.json(getAccount);
        }
    });

    app.post(`/accounts`, (request, response) => {
        const incomingAccount = request.body;

        accounts.push(incomingAccount);

        response.json(accounts);
    });

    app.put(`/accounts/:id`, (request, response) => {
        const accountId = Number(request.params.id);
        const body = request.body;
        const account = accounts.find((account) => account.id === accountId);
        const index = accounts.indexOf(account);

        if (!account) {
            response.status(500).send('Account not found.');
        } else {
            const updatedAccount = {...account, ...body };

            accounts[index] = updatedAccount;

            response.send(updatedAccount);
        }
    });

    app.delete(`/accounts/:id`, (request, response) => {
        const accountId = Number(request.params.id);
        const newAccounts = accounts.filter((account) => account.id != accountId);

        if (!newAccounts) {
            response.status(500).send('Account not found.');
        } else {
            accounts = newAccounts;
            response.send(accounts);
        }
    });

    //other routes..
}