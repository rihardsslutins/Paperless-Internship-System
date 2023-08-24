// packages
import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js'

// models
import { User } from "./user.js";

const Schema = mongoose.Schema

const studentExists = async (value) => {
    return await User.findOne({ email: value, role: 'student'})
}

const supervisorExists = async (value) => {
    return await User.findOne({ email: value, role: 'supervisor' })
}

const teacherExists = async (value) => {
    return await User.findOne({ email: value, role: 'teacher' })
}

const journalSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Lūdzu ievadi datumu'],
    },
    taskDescription: {
        type: String,
        required: [true, 'Lūdzu ievadi aprakstu']
    },
    hoursSpent: {
        type: Number,
        required: [true, 'Lūdzu ievadi pavadīto laiku'],
        max: [8, 'Lūdzu ievadi pavadīto stundu skaitu, kas nepārsniedz 8'],
        min: [1, 'Lūdzu ievadi pavadīto stundu skaitu, kas ir vienāds ar vai pārsniedz 1']
    },
    grade: {
        type: Number,
        max: [10, 'Lūdzu ievadi atzīmi, kas nepārsniedz 10'],
        min: [1, 'Lūdzu ievadi atzīmi, kas ir vienāda ar vai pārsniedz 1'],
    }
})

const internshipSchema = new Schema({
    isActive: {
        type: Boolean,
        required: [true, 'Praksei nav iestatīta aktivitātes īpašība']
    },
    isPending: {
        type: Boolean,
        required: [true, 'Praksei nav iestatīta verifikācijas īpašība']
    },
    company: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmuma nosaukumu']
    },
    supervisor: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no uzņēmuma) e-pastu'],
        lowercase: true,
        validate: [supervisorExists, 'Lūdzu ievadi prakses vadītāja (no uzņēmuma) e-pastu pareizi']
    },
    supervisorFullName: {
        type: String,
        required: [true, 'Prakses vadītāja pilnais vārds netika pievienots']
    },
    teacher: {
        type: String,
        required: [true, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu'],
        lowercase: true,
        validate: [teacherExists, 'Lūdzu ievadi prakses vadītāja (no skolas) e-pastu pareizi']
    },
    teacherFullName: {
        type: String,
        required: [true, 'Skolotāja pilnais vārds nav pievienots'],
    },
    student: {
        type: String,
        required: [true, 'Studenta e-pasts nav sasniedzams'],
        lowercase: true,
        validate: [studentExists, 'Studenta e-pasts nav derīgs'],
    },
    studentFullName: {
        type: String,
        required: [true, 'Studenta pilnais vārds nav pievienots']
    },
    studentPhone: {
        type: Number,
        required: [true, 'Studenta tālrunis nav pievienots']
    },
    startingDate: {
        type: Date,
        required: [true, 'Lūdzu ievadi datumu kurā sākās prakse']
    },
    endingDate: {
        type: Date
    },
    journal: {
        type: [journalSchema],
        // validate: (element) => {
        //     throw Error(`sdfdsfsd ${element[0]}`)
        // }
    }
});

const Internship = mongoose.model('internship', internshipSchema);

export { Internship };