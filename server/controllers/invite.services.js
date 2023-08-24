// handles errors
export const handleErrors = (emptyErrorObject, err, role) => {
  
    // the yet unpopulated errors object
    const errors = emptyErrorObject;
  
    // assigns whatever error the User model returned to the errors object defined above
    if (err.message.includes(`invite validation failed`)) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    
    if (err.message === 'Lūdzu pievieno skolotāja e-pastu') {
      errors.receiver = 'Lūdzu pievieno skolotāja e-pastu'
    }
    if (err.message === 'Pievienotā studenta e-pasts neeksistē') {
      errors.sender = 'Pievienotā studenta e-pasts neeksistē'
    }
    if (err.message === 'Pievienotā skolotāja e-pasts neeksistē') {
      errors.receiver = 'Pievienotā skolotāja e-pasts neeksistē'
    }
    if (err.message === 'Pieteikumus vienam skolotājam atkārtoti nevar sūtīt') {
      errors.receiver = 'Pieteikumus vienam skolotājam atkārtoti nevar sūtīt'
    }
    if (err.message === 'Skolotājs jau ir akceptējis Jūsu ielūgumu') {
      errors.receiver = 'Skolotājs jau ir akceptējis Jūsu ielūgumu'
    }
    if (err.message === 'Lūdzu pievieno adresāta e-pastu') {
      errors.receiver = 'Lūdzu pievieno adresāta e-pastu'
    }
    if (err.message === 'Adresāta e-pasts neeksistē') {
      errors.receiver = 'Adresāta e-pasts neeksistē'
    }
    if (err.message === 'Studenta e-pasts neeksistē') {
      errors.sender = 'Studenta e-pasts neeksistē'
    }
    if (err.message === 'Viens un tas pats prakses vadītājs (no uzņēmuma) nevar būt vairākās aktīvās dienasgrāmatās/praksēs vienā un tajā pašā laikā') {
      errors.sender = 'Viens un tas pats prakses vadītājs (no uzņēmuma) nevar būt vairākās aktīvās dienasgrāmatās/praksēs vienā un tajā pašā laikā'
    }
  
    return errors;
  };