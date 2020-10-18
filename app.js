// constructor function for adding methods to any prototype of an object
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    } 
};

// adding new method to the String proptotype
String.method('titleCase', function () {
    var splitStr = this.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // Assign modified string back to the array of strings
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
});

const persons = Object.freeze([ //Don't edit this array
{
    userId: 1,
    name: "Teppo Testaaja",
    dateOfBirth: new Date("1959-01-01"),
    email: "teppo.testaaja@buutti.com"
},
{
    userId: 2,
    name: "Tessa Testaaja",
    dateOfBirth: new Date("1981-01-01"),
    email: "tessa.testaaja@buutti.com"
},
{
    userId: 3,
    name: "Teuvo Testaaja",
    dateOfBirth: new Date("1989-05-05"),
    email: "teuvo.testaaja@buutti.com"
},
{
    
    userId: 4,
    name: "Outi Ohjelmoija",
    dateOfBirth: new Date("1972-06-06"),
    email: "outi.ohjelmoija@buutti.com"
},
{
    userId: 5,
    name: "Olli Ohjelmoija",
    dateOfBirth: new Date("1989-05-05"),
    email: "olli.ohjelmoija@buutti.com"
},
{
    userId: 6,
    name: "Teppo Ohjelmoija",
    dateOfBirth: new Date("1980-02-02"),
    email: "teppo.ohjelmoija@buutti.com"
}
]);
const professions = Object.freeze([
    {
        userId: 1,
        workplace: "Some Company",
        position: "Manager"
    }, 
    {
        userId: 2,
        workplace: "Epic Company",
        position: "System admin"
    },
    {
        userId: 3,
        workplace: "Some Company",
        position: "Developer"
    },
    {
        userId: 4,
        workplace: "Some Company",
        position: "Manager"
    },
    {
        userId: 5,
        workplace: "Epic Company",
        position: "System admin"
    },
    {
        userId: 6,
        workplace: "Epic company",
        position: "Developer"
    }
]);
const interests = Object.freeze([
    {
        userId: 1,
        interest: "Cats"
    },
    {
        userId: 1,
        interest: "Computers"
    },
    {
        userId: 2,
        interest: "Ice hockey"
    },
    {
        userId: 3,
        interest: "Computers"
    },
    {
        userId: 3,
        interest: "Cats"
    },
    {
        userId: 3,
        interest: "Football"
    },
    {
        userId: 4,
        interest: "Computers"
        
    },
    {
        userId: 4,
        interest: "Epicness"
    },
    {
        userId: 5,
        interest: "Computers"
    },
    {
        userId: 6,
        interest: "Fishing"
    },
    {
        userId: 6,
        interest: "Cats"
    }
])
/*
It's enough to make this function work with the
'persons' array above. You don't have to consider or defend
against any other type of names. */
const findByFirstName = (firstname) => {
    let sortedPersons = [];
    persons.forEach(person => {
        if (person.name.includes(firstname)) {
            sortedPersons.push(person);
        }; 
    });
    console.log( `All persons with first name ${firstname} are:`, sortedPersons);
    
    return sortedPersons;
};
/*
Should return the users age.
Age should be an integer.
findPersonAge("Teuvo Testaaja") returns 31
*/

// get person's age from date of birth
const getPersonAge = birthday => {
    birthday = new Date(birthday);
    const now = new Date();
    const diff = now.getTime() - birthday.getTime();
    age = Math.floor(diff / 1000 / 60 / 60 / 24 / 365); 
    
    return age;
};

const findPersonAge = (name) => { //Age in years
    let age;
    persons.forEach(person => {
        if (person.name.includes(name)) {
            age = getPersonAge(person.dateOfBirth);
        }; 
    });
    console.log(`Calculate Person ${name} age:`, age);
    
    return age;
};
/*
Calculate the average age of all users in the persons array (full
years)
*/
const calculateAverageAge = () => {
    let ages =[];
    let sumOfAges = 0;
    
    persons.forEach(person => {
        const age = getPersonAge(person.dateOfBirth);
        ages.push(age);
    });
    
    sumOfAges = ages.reduce((acc, curr) => acc + curr);
    const averageAge = Math.floor(sumOfAges / ages.length)
    
    console.log("The average age of all persons:", averageAge);
    
    return averageAge;
};
/*
Turn the arrays of objects (persons, professions, interests) into a
new object of workplace profiles with employees of the
particular company listed as shown below.
Also include the interests of that particular
employee as a new array in the employeeObject.
Below is an example of how Some Company
profile object should look like:
{
    'Some Company': {
        employees: [
            {
                userId: 1,
                name: "Teppo Testaaja",
                dateOfBirth: 1959-01-01T00:00:00.000Z,
                email: "teppo.testaaja@buutti.com",
                position: "Manager",
                interests: ["Computers", "Cats"]
            },
            {
                userId: 3,
                name: "Teuvo Testaaja",
                dateOfBirth: 1989-05-05T00:00:00.000Z,
                email: "teuvo.testaaja@buutti.com",
                position: "Developer",
                interests: ["Computers", "Cats", "Football"]
            },
            {
                userId: 4,
                name: "Outi Ohjelmoija",
                dateOfBirth: 1972-06-06T00:00:00.000Z,
                email: "outi.ohjelmoija@buutti.com",
                
                position: "Manager",
                interests: ["Computers", "Epicness"]
            }
        ]
    },
    ...
}
*/
const createCompanyProfiles = () => {
    // merge persons and professions arrays
    let personsProfessions = persons.map((person, i) => Object.assign({}, person, professions[i]));
    
    // find unique workplaces
    const workplaces = [];
    professions.forEach(person => {
        workplaces.push(person.workplace.titleCase());
    });
    const uniqueWorkplaces = [...new Set(workplaces)];   
    
    // merge interests and personsProfessions arrays
    let companyProfiles = personsProfessions.map((person) => {
        let arrayOfInterest = [];
        // loop throught the array of interests and find matching userId 
        interests.forEach(el => {
            if (el.userId === person.userId) {
                // if userId matches take the value of interests push it to the arrayOfInterests
                arrayOfInterest.push(el.interest);
            }            
        });            
        // create new interests property for person and set value = arrayOfInterest of the current person
        person.interests = arrayOfInterest;
        return person; 
    });        
    
    // create companies object to store each company 
    let companies = {};
    // iterate through uniqueWorkplaces to create new company object on each iteration
    uniqueWorkplaces.forEach((workplace) => {
        // create array to store persons that work in current workplace
        let employees = []
        companyProfiles.forEach(person => {
            if (person.workplace !== undefined && person.workplace.titleCase() === workplace) {
                delete person['workplace'];
                employees.push(person);
            }
        });
        // create empty company object
        companies[workplace] = {};
        // adding new key value pair, key = employees, value = array of employees
        companies[workplace].employees = employees;
    });
    console.log("Company profiles created:", companies);
    
    return companies;
};

// calling all the functions required by the task
findByFirstName("Teppo");
findPersonAge("Teuvo Testaaja");
calculateAverageAge();
createCompanyProfiles();
