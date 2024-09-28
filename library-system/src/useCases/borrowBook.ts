import { Borrow } from '../domain/Borrow';
import { Book } from '../domain/Book';
import { Member } from '../domain/Member';

export const borrowBook = async (memberCode: string, bookCode: string) => {
    const member = await Member.findOne({ where: { code: memberCode } });
    const borrowedBooks = await Borrow.count({ where: { memberCode } });

    if (borrowedBooks >= 2) {
        throw new Error('Member cannot borrow more than 2 books');
    }

    const book = await Book.findOne({ where: { code: bookCode } });
    if (!book || book.stock <= 0) {
        throw new Error('Book is not available');
    }

    const penaltyRecord = await Borrow.findOne({ 
        where: { 
            memberCode,
            returnDate: null, 
        },
        order: [['borrowDate', 'DESC']],
    });
    
    if (penaltyRecord) {
        const daysBorrowed = (new Date().getTime() - new Date(penaltyRecord.borrowDate).getTime()) / (1000 * 3600 * 24);
        if (daysBorrowed > 7) {
            throw new Error('Member is currently penalized and cannot borrow books for 3 days');
        }
    }

    await Borrow.create({ memberCode, bookCode });
    book.stock -= 1;
    await book.save();

    return { message: 'Book borrowed successfully' };
};
