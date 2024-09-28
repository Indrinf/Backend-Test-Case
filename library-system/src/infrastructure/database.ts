import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('library', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});
