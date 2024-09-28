import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../infrastructure/database';

export class Book extends Model {
    public code!: string;
    public title!: string;
    public author!: string;
    public stock!: number;
}

Book.init({
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Book',
});
