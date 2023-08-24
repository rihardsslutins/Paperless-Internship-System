// packages
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const options = { discriminatorKey: 'role' };

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Lūdzu ievadi vārdu'],
    },
    surname: {
      type: String,
      required: [true, 'Lūdzu ievadi uzvārdu'],
    },
    phone: {
      type: Number,
      required: [true, 'Lūdzu ievadi telefona numuru'],
      minLength: [8, 'Parole nevar būt īsāka par 8 rakstzīmēm'],
      maxLength: [8, 'Parole nevar būt garāka par 8 rakstzīmēm']
    },
    gender: {
      type: String,
      required: [true, 'Lūdzu ievadi dzimumu'],
    },
    email: {
      type: String,
      required: [true, 'Lūdzu ievadi e-pastu'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Lūdzu ievadi derīgu e-pastu'],
    },
    password: {
      type: String,
      required: [true, 'Lūdzu ievadi paroli'],
      minlength: [8, 'Parole nevar būt īsāka par 8 rakstzīmēm'],
    },
  },
  options,
);

// hashes password
userSchema.pre('save', async function (next) {
  const user = await User.findOne({ _id: this._id })
  if (!user) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }

});

// authorizes a user (sends them user data by way of token)
userSchema.statics.login = async function (email, password) {
  // finds a user with the entered email
  const user = await this.findOne({ email });
  if (user) {
    // compares the entered password with the existing user in the collection with the previously entered email
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Ievadītā parole ir nepareiza');
  }
  throw Error('Ievadītais e-pasts ir nepareizs');
};

// resets password
userSchema.statics.reset = async function (id, oldPassword, newPassword) {
  const user = await User.findOne({ _id: id })
  if (!oldPassword) {
    throw Error('Lūdzu ievadi veco paroli');
  }
  if (oldPassword.length < 8) {
    throw Error('Vecā parole nevar būt īsāka par 8 rakstzīmēm');
  }
  if (!newPassword) {
    throw Error('Lūdzu ievadi jauno paroli');
  }
  if (newPassword.length < 8) {
    throw Error('Jaunā parole nevar būt īsāka par 8 rakstzīmēm');
  } 
  if (user) {
    const auth = await bcrypt.compare(oldPassword, user.password)
    console.log(auth, oldPassword, user.password)
    if (auth) {
      const salt = await bcrypt.genSalt();
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword
      return user
    }
    throw Error('Vecā parole ir ievadīta nepareizi');
  }
  throw Error('Lietotājs neeksistē');
}

const User = mongoose.model('user', userSchema);

const TeacherUser = User.discriminator(
  'teacher',
  new Schema(
    {
      students: [
        {fullName: String, email: String, phone: Number}
      ],
      school: {
        type: String,
        required: [true, 'Lūdzu ievadi skolu'],
      },
    }), options
);

const StudentUser = User.discriminator(
  'student',
  new Schema({
    internships: [{ type: String }],
    school: {
      type: String,
      required: [true, 'Lūdzu ievadi skolu'],
    },
    teachers: [
      {fullName: String, email: String, phone: Number}
    ]
  }), options
);

const SupervisorUser = User.discriminator(
  'supervisor',
  new Schema(
    {
      field: {
        type: String,
        required: [true, 'Lūdzu ievadi nozari'],
      },
      company: {
        type: String,
        required: [true, 'Lūdzu ievadi uzņēmumu'],
      },
      interns: [
        {fullName: String, email: String, phone: Number}
      ]
    }), options
);

export { User, StudentUser, TeacherUser, SupervisorUser };
