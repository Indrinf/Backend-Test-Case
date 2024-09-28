import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../infrastructure/database';

export class Borrow extends Model {
    public memberCode!: string;
    public bookCode!: string;
    public borrowDate!: Date;
    public returnDate!: Date | null;
}

Borrow.init({
    memberCode: {
        type: DataTypes.STRING,
        references: {
            model: 'Members',
            key: 'code',
        },
    },
    bookCode: {
        type: DataTypes.STRING,
        references: {
            model: 'Books',
            key: 'code',
        },
    },
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Borrow',
});
