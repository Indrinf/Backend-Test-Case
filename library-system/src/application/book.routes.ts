import { Router } from 'express';
import { Book } from '../domain/Book';

const router = Router();

router.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.status(200).send(books);
});

export default router;
