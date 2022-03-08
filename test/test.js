function loginUser(email, password) {
    setTimeout(() => {
        console.log("Now we have the data")
        return {userEmail: email}
    }, 2000)
}



console.log("Start")

const user = loginUser("myemail@google.com", 123456)
console.log(user)

console.log("End")