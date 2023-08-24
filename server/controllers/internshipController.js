// mongoose
import mongoose from "mongoose";
// models
import { Internship } from "../models/internship.js";
import { User } from "../models/user.js";
import { Invite } from '../models/invite.js'
// functions
import { handleErrors } from './internship.services.js'

// @desc handles internship creation
// @route POST /internships
// @access Private
const post_internships = async (req, res) => {
    // get data from the front-end
    const { company, student, teacher, supervisor, startingDate } = req.body;
    // query the database
    try {
        const internship = await Internship.findOne({ student, isActive: true })
        if (!internship) {
            // gets the teacher, supervisor and student documents, that will be used to populate the internship document
            const Teacher = await User.findOne({ email: teacher, role: 'teacher' })
            const Supervisor = await User.findOne({ email: supervisor, role: 'supervisor' })
            const Student = await User.findOne({ email: student, role: 'student' })
            
            // creates the internship
            const internship = await Internship.create({ 
                isActive: true, 
                isPending: true, 
                company, 
                student, 
                studentFullName: `${Student ? Student.name + ' ' + Student.surname : null}`,
                studentPhone: Student.phone,
                teacher, 
                teacherFullName: `${Teacher ? Teacher.name + ' ' + Teacher.surname : null}`,
                supervisor, 
                supervisorFullName: `${Supervisor ? Supervisor.name + ' ' + Supervisor.surname : null}`,
                startingDate
             });

            // adds the created internship id to the student's internships property array
            Student.internships.push(internship._id)
            // saves the altered Student object
            await Student.save()

            // creates an invite addressed to the assigned supervisor
            await Invite.create({ 
                sender: student, 
                receiver: supervisor, 
                senderFullName: `${Student.name + ' ' + Student.surname}`, 
                senderPhone: Student.phone,
                receiverFullName: `${Supervisor.name + ' ' + Supervisor.surname}`,
                receiverRole: Supervisor.role,
                subject: 'Prakses dienasgrāmata',
                body: `${Student.name + ' ' + Student.surname} no ${Student.school} uzaicināja Jūs pievienoties savai Dienasgrāmatai.`
            })

            return res.status(201).json({ internship })
        } else {
            throw Error("Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus")
        }
        
    } catch (err) {
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }
}

// @desc handles internship fetching
// @route GET /internships
// @access Private
const get_internships = async (req, res) => {
    try {
        // grabs the email and role property values from the user object returned from the authorization middleware
        const { email, role } = await User.findById(req.user.id)

        let internships = [];
        // assigns a value to the internships variable based on what role user has sent the get request
        if (role === 'student') {
            internships = await Internship.find({ student: email })
            return res.status(200).json({ internships })
        } else if (role === 'teacher') {
            // internships = await Internship.find({ teacher: email })
            const thingy = await Internship.distinct('student')
            for (let i = 0; i < thingy.length; i++) {
                const student = await User.findOne({ email: thingy[i] })
                let auth = []
                student.teachers.map(teacher => {
                    if (teacher.email === email) {
                        auth.push(teacher)
                    }
                })
                if (auth.length) {
                    const doc = await Internship.findOne({ student: thingy[i] })
                    console.log(`THIS IS THE INTERNSHIP ${doc}`)
                    internships.push(doc)
                }
            }
            console.log(thingy)
            return res.status(200).json({ internships })
        } else if (role === 'supervisor') {
            internships = await Internship.find({ supervisor: email, isActive: true, isPending: false })
            return res.status(200).json({ internships })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

// @desc handles internship fetching for teacher
// @route GET /internships/teacher/:id
// @access Private
const get_internships_teacher = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log(req.params.id)
            const internship = await Internship.findById(req.params.id)
            const Student = await User.findOne({ email: internship.student })
            console.log(Student)
            const internships = await Internship.find({ student: Student.email })
            return res.status(200).json({ internships })
        } else {
            throw Error("ID parameter doesn't exist")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

// @desc handles a single internship's fetching
// @route GET /internships/:id
// @access Private
const get_single_internships = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const { email, role } = await User.findById(req.user.id)
            let internship
            if (role === 'student') {
                // internship = await Internship.find({ _id: req.params.id }).sort({ 'journal.date': -1 })
                internship = await Internship.find({ _id: req.params.id})
                const sortedJournal = await Internship.aggregate([
                    { $match: { _id: mongoose.Types.ObjectId(req.params.id) }},
                    { $unwind: '$journal' },
                    { $sort: { 'journal.date': 1 }},
                    { $group: { _id: '$_id', journal: { $push: '$journal'}}}])
                if (sortedJournal[0]) {
                    internship[0].journal = sortedJournal[0].journal
                } 
                // internship = await Internship.findOne({ _id: req.params.id, student: email }).sort("-journal.date")
            } else if (role === 'teacher') {
                let checkInternship = await Internship.find({ _id: req.params.id })
                console.log(checkInternship)
                const user = await User.findOne({ email: checkInternship[0].student, role: 'student' })
                console.log(user)
                const isFound = user.teachers.some(teacher => {
                    if (teacher.email === email) {
                      return true;
                    }
                    return false;
                });
                if (!isFound) {
                    throw Error('Dienasgrāmata neeksistē')
                }
                internship = checkInternship
                const sortedJournal = await Internship.aggregate([
                    { $match: { _id: mongoose.Types.ObjectId(req.params.id) }},
                    { $unwind: '$journal' },
                    { $sort: { 'journal.date': 1 }},
                    { $group: { _id: '$_id', journal: { $push: '$journal'}}}])
                    if (sortedJournal[0]) {
                        internship[0].journal = sortedJournal[0].journal
                    } 

            } else if (role === 'supervisor') {
                internship = await Internship.find({ _id: req.params.id, isActive: true, isPending: false})
                console.log(internship)
                const sortedJournal = await Internship.aggregate([
                    { $match: { _id: mongoose.Types.ObjectId(req.params.id) }},
                    { $unwind: '$journal' },
                    { $sort: { 'journal.date': 1 }},
                    { $group: { _id: '$_id', journal: { $push: '$journal'}}}])
                if (sortedJournal[0]) {
                    internship[0].journal = sortedJournal[0].journal
                } 
            }
            return res.status(200).json({ internship: internship[0] });
        } else {
            throw Error("ID parameter doesn't exist")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

// @desc handles the completion of an internship
// @route PUT /internships
// @access Private
const put_internships = async (req, res) => {
    const { email, password, endingDate } = req.body
    const _id = req.params.id
    try {
        console.log(email, password, endingDate)
        if (!endingDate) {
            throw Error("Lūdzu ievadi prakses noslēguma datumu")
        }
        if (!password) {
            throw Error("Lūdzu ievadi savu paroli")
        }
        const internship = await Internship.findById(_id)
        const auth = await User.login(email, password)
        if (auth) {
            internship.endingDate = endingDate
            internship.isActive = false
            await internship.save()
            return res.status(200).json({ internship })
        } else {
            throw Error('Something went wrong!')
        }
    } catch (err) {
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }
}

// @desc handles creation of a journal record
// @route POST /journals
// @access Private
const post_journal = async (req, res) => {
    const { _id, date, taskDescription, hoursSpent } = req.body

    try {
        const internship = await Internship.findOne({_id}).clone()
        internship.journal.push({
            date,
            taskDescription,
            hoursSpent,
        })

        await internship.save()
        return res.status(201).json({ internship })
    } catch (err) {
        const errors = handleErrors(err)
        return res.status(400).json({ errors })
    }
}

// @desc handles a journal record's grading
// @route PUT /journals/:id
// @access Private
const put_journal = async (req, res) => {
    const { id, role, date, hoursSpent, grade, taskDescription } = req.body
    try {
        console.log(id, role, date, hoursSpent, grade, taskDescription)
        const internship = await Internship.findById(id)
        const _id = req.params.id
        if (role === 'student') {
            internship.journal.map(record => {
                console.log(record._id.toString() === _id)
                if (record._id.toString() === _id) {
                    console.log("I hit")
                    record.date = date
                    record.hoursSpent = hoursSpent
                    record.taskDescription = taskDescription
                }
            })
            await internship.save()
            return res.status(200).json({ internship })
        } else if (role === 'supervisor') {
            console.log("I hit")
            internship.journal.map((record) => {
                if (record._id.toString() === _id) {
                    record.grade = grade
                }
            })
            await internship.save()
            return res.status(200).json({ internship })
        }
        // const internship = await Internship.findById(id)
        // const _id = req.params.id
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        console.log(errors)
        return res.status(400).json({ errors })
    }

}



export { post_internships, get_internships, get_internships_teacher, get_single_internships, put_internships, post_journal, put_journal }