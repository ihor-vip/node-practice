module.exports = {
    authorizationUser: (req, res) => {
        try {
            res.json('You are logged in');
        } catch (e) {
            res.json(e.message);
        }
    }
};
