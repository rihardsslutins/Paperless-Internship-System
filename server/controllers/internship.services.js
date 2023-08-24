// handles errors
const handleErrors = (err) => {
    // the yet unpopulated errors object
    const errors = {
      isActive: '',
      isPending: '',
      company: '',
      student: '',
      studentFullName: '',
      studentPhone: '',
      teacher: '',
      teacherFullName: '',
      supervisor: '',
      supervisorFullName: '',
      startingDate: '',
      date: '',
      taskDecription: '',
      hoursSpent: '',
      grade: '',
      password: '',
      endingDate: ''
    }
  
    // assigns whatever error the User model returned to the errors object defined above
    if (err.message.includes('internship validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    // checks if the student has an active internship
    if (err.message === 'Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus') {
      errors.student = 'Studentam nevar būt vairākas aktīvas dienasgrāmatas vienlaikus';
    }

    // checks whether or not the user has entered the endingDate
    if (err.message === 'Lūdzu ievadi prakses noslēguma datumu') {
      errors.endingDate = 'Lūdzu ievadi prakses noslēguma datumu';
    }

    // checks whether or not the user has entered the password
    if (err.message === 'Lūdzu ievadi savu paroli') {
      errors.password = 'Lūdzu ievadi savu paroli';
    }

    // checks whether or not the entered email exists in the database
    if (err.message === 'Ievadītais e-pasts ir nepareizs') {
      errors.student = 'Ievadītais e-pasts ir nepareizs';
    }

    // checks whether or not the entered password corresponds to the user with the previously entered email
    if (err.message === 'Ievadītā parole ir nepareiza') {
      errors.password = 'Ievadītā parole ir nepareiza';
    }
    return errors;
  };

  export { handleErrors }