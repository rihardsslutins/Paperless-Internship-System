// mongoose
import mongoose from "mongoose";
// models
import { Invite } from "../models/invite.js";
import { Internship } from "../models/internship.js";
import { User } from "../models/user.js";

// functions
import { handleErrors } from "./invite.services.js";

const send_invite = async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        const invite = await Invite.invite(sender, receiver)
        return res.status(201).json({ invite })
    } catch (err) {
        console.log(err)
        const emptyErrorObject = {
            receiver: '',
            receiverFullName: '',
            sender: '',
            senderFullName: '',
            senderPhone: '',
            subject: '',
            body: ''
        }
        const errors = handleErrors(emptyErrorObject, err)
        return res.status(400).json({ errors })
    }
}

const get_invites = async (req, res) => {
    const { email } = await User.findById(req.user.id)
    try {
        const invites = await Invite.find({ receiver: email }) 
        return res.status(200).json({ invites })  
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const reject_invite = async (req, res) => {
    const _id = req.params.id
    try {
        
        // const invite = await Invite.findByIdAndDelete(_id);
        const invite = await Invite.findOne({ _id })
        const Sender = await User.findOne({ email: invite.sender })
        const Receiver = await User.findOne({ email: invite.receiver })

        switch (Receiver.role) {
            case 'teacher':
                await invite.remove()
                break;
            case 'supervisor':
                // finds whatever internship the supervisor was invited in
                const internship = await Internship.findOne({ student: invite.sender, supervisor: invite.receiver, isActive: true, isPending: true })
                // removes rejectedInternship from student internships array
                Sender.internships.filter(Internship => new mongoose.Types.ObjectId(Internship) === internship._id)
                await Sender.save()
                // deletes the rejected internship
                await internship.remove()
                // deletes the rejected invite
                await invite.remove()
                break;
            default:
                break;
        }
        return res.status(200).json({ invite })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const accept_invite = async (req, res) => {
    const _id = req.params.id
    try {
        const invite = await Invite.findOne({_id})
        const { receiverFullName, senderFullName, senderPhone, receiver, sender } = invite
        const Receiver = await User.findOne({ email: receiver })
        const Sender = await User.findOne({ email: sender })
        switch (Receiver.role) {
            case 'teacher':
                // pushes the teachers full name and email to the students teachers array
                Sender.teachers.push({ 
                    fullName: receiverFullName, 
                    email: receiver 
                })
                // saves the students changes
                await Sender.save()
                
                // pushes the students full name and email to the teachers students array
                Receiver.students.push({
                    fullName: senderFullName,
                    email: sender,
                    phone: senderPhone,
                })
                // saves the teachers changes
                await Receiver.save()
                
                // deletes the invite
                await invite.remove()

                break;

            case 'supervisor':
                // looks for the internship the supervisor has been invited to and hasn't accepted yet
                const internship = await Internship.findOne({ student: sender, supervisor: receiver, isActive: true, isPending: true })
                
                // changes the internships isPending property to indicate that the invited supervisor has accepted the invite
                internship.isPending = false;
                // pushes the student's full name and email to the supervisor's interns array
                Receiver.interns.push({
                    fullName: senderFullName,
                    email: sender,
                    phone: senderPhone,
                })
                
                // saves the altered internship
                await internship.save()
                // saves the altered supervisor
                await Receiver.save()

                // deletes the invite
                await invite.remove()
                break;
            default:
                break;
        }

        return res.status(200).json({ Receiver })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

const get_invited_teachers = async (req, res) => {
    const { email } = await User.findOne({ _id: req.user.id })
    try {
        const invites = await Invite.find({ sender: email, receiverRole: 'teacher' })
        return res.status(200).json({ invites })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

export { send_invite, get_invites, reject_invite, accept_invite, get_invited_teachers }