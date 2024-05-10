const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const chalk = require('chalk');
const initDataBase = require('./startUp/initDataBase');
const routes = require('./routes');

const app = express();
const PORT = config.get('port') ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  console.log('Production');
} else {
  console.log('Development');
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDataBase();
    });

    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () =>
      console.log(
        chalk.bgGreen(`Server started. PORT - ${PORT}. NODE_ENV - ${process.env.NODE_ENV}`),
      ),
    );
  } catch (e) {
    console.log(chalk.bgRed('Server not started: ', e));
    process.exit(1);
  }
}

start();
