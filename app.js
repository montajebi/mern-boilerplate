const express = require('express');
const handleErrors = require('./middlewares/handleErrors');
const { NotFound } = require('./utils/errorUtils');

const mainRouter = require('./routes');

const app = express();

app.use(express.json());

app.use('/auth', mainRouter.authRouter);
app.use('/api/v1/users', mainRouter.userRoutes);

app.all('*', (req, _, next) => {
  return next(
    new NotFound(`Route ${req.originalUrl} not found on this server!`)
  );
});

// Global Error Handler
app.use(handleErrors);

module.exports = app;
