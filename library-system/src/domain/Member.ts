import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../infrastructure/database';

export class Member extends Model {
    public code!: string;
    public name!: string;
}

Member.init({
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Member',
});
