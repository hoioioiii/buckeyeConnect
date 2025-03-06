import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => { // Generates a salt for the hash function. The salt is then used to hash the password.
            if (err) {
                reject(err) // If there is an error, reject the promise
            }
            bcrypt.hash(password, salt, (err, hash) => { // Hashes the password
                if (err) {
                    reject(err)
                }
                resolve(hash) // If there is no error, resolve the promise with the hash
            })
        })
    })
}

// must compare passwords because we can't store the password in plain text
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}