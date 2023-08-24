// packages
import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

// models
import { User } from "./user.js";

const Schema = mongoose.Schema

const inviteSchema = new Schema({
    sender: {
        type: String,
        required: [true, 'Studenta e-pasts netika pievienots'],
        validate: [isEmail, 'Pievienotais studenta e-pasts nav derīgs'],
    },
    senderFullName: {
        type: String,
        required: [true, 'Studenta pilnais vārds nav pievienots']
    },
    senderPhone: {
        type: Number,
        required: [true, 'Studenta tālrunis nav pievienots']
    },
    receiver: {
        type: String,
        required: [true, 'Skolotāja e-pasts netika pievienots'],
        validate: [isEmail, 'Pievienotā skolotāja e-pasts nav derīgs'],
    },
    receiverFullName: {
        type: String,
        required: [true, 'Skolotāja pilnais vārds nav pievienots']
    },
    receiverRole: {
        type: String,
        required: [true, 'Adresāta loma nav iestatīta']
    },
    subject: {
        type: String,
        required: [true, 'Lūdzu pievieno ielūguma tēmu']
    },
    body: {
        type: String,
        required: [true, 'Lūdzu ievadi ielūguma tekstu']
    },
}, 
{
    timestamps: true
}
)

inviteSchema.statics.invite = async function (sender, receiver) {
    if (receiver) {
        const Sender = await User.findOne({ email: sender, role: 'student' })
        if (Sender) {
            const Receiver = await User.findOne({ email: receiver, role: 'teacher' })
            if (Receiver) {
                const teachersArray = Sender.teachers.filter(object => object.email === receiver)
                console.log(teachersArray)
                if (!teachersArray.length) {
                    const invite = await Invite.findOne({ sender, receiver})
                    console.log(invite)
                    if (!invite) {
                        Invite.create({
                            sender, 
                            receiver, 
                            senderFullName: `${Sender.name + ' ' + Sender.surname}`, 
                            receiverFullName: `${Receiver.name + ' ' + Receiver.surname}`,
                            senderPhone: Sender.phone,
                            receiverRole: Receiver.role,
                            subject: 'Prakses dienasgrāmata',
                            body: `${Sender.name + ' ' + Sender.surname} no ${Sender.school} uzaicināja Jūs pievienoties savām dienasgrāmatām.`
                        })
                    } else {
                        throw Error('Pieteikumus vienam skolotājam atkārtoti nevar sūtīt')
                    }
                } else {
                    throw Error('Skolotājs jau ir akceptējis Jūsu ielūgumu')
                } 
            } else {
                throw Error('Pievienotā skolotāja e-pasts neeksistē')
            }
        } else {
            throw Error('Pievienotā studenta e-pasts neeksistē')
        }
    } else {
        throw Error('Lūdzu pievieno skolotāja e-pastu')
    }
}


const Invite = mongoose.model('invite', inviteSchema);

export { Invite };