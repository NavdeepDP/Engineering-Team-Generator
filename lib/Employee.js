// Write code to define and export the Employee class

class Employee{

    constructor(name, id, email, role ="Employee"){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;

    }

    getName(){

        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getId()
    {
        return this.id;
    }

    getRole(){
        return this.role;
    }
}


module.exports = Employee;