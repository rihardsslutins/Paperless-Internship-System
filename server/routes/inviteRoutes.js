import express from 'express';

// controllers
import { send_invite, get_invites, reject_invite, accept_invite, get_invited_teachers } from '../controllers/inviteController.js';

// middleware
import { protect } from '../middleware/authMiddleware.js';

const inviteRouter = express.Router();

// creates and sends an invite
inviteRouter.post('/invites', protect, send_invite);

// gets all invites
inviteRouter.get('/invites', protect, get_invites);

// accepts an invite
inviteRouter.put('/invites/:id', protect, accept_invite)

// deletes an invite
inviteRouter.delete('/invites/:id', protect, reject_invite)

// gets all invited teachers
inviteRouter.get('/invites/teachers', protect, get_invited_teachers)


export default inviteRouter;