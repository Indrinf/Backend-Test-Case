import { Router } from 'express';
import { Member } from '../domain/Member';
import { Borrow } from '../domain/Borrow';

const router = Router();

router.get('/', async (req, res) => {
    const members = await Member.findAll();
    const memberBooksCount = await Promise.all(members.map(async (member) => {
        const count = await Borrow.count({ where: { memberCode: member.code, returnDate: null } });
        return { member, booksBorrowed: count };
    }));
    res.status(200).send(memberBooksCount);
});

export default router;
