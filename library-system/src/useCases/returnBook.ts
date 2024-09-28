import { Borrow } from '../domain/Borrow';
import { Book } from '../domain/Book';

export const returnBook = async (memberCode: string, bookCode: string) => {
    const borrowRecord = await Borrow.findOne({ 
        where: { 
            memberCode, 
            bookCode, 
            returnDate: null 
        } 
    });

    if (!borrowRecord) {
        throw new Error('This book was not borrowed by the member');
    }

    const daysBorrowed = (new Date().getTime() - new Date(borrowRecord.borrowDate).getTime()) / (1000 * 3600 * 24);
    
    if (daysBorrowed > 7) {
        throw new Error('Book returned after penalty period');
    }

    borrowRecord.returnDate = new Date();
    await borrowRecord.save();

    const book = await Book.findOne({ where: { code: bookCode } });
    if (book) {
        book.stock += 1;
        await book.save();
    }

    return { message: 'Book returned successfully' };
};
