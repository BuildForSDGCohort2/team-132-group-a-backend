/*User Class*/
/*This is the User class of the app*/
/*Class version : 1.0.0*/

function User (userNom, userPrename, userPays, userId, userMail, userPlaceBirth, userBirthDate, userSkills, userCreation) {
    // body...
    this.nom = userNom;
    this.prenom = userPrename;
    this.country = userPays;
    this.id = userId;
    this.email = userMail;
    this.placeBirth = userPlaceBirth;
    this.dateBirth = userBirthDate;
    this.skills = userSkills;
    this.dateCreation = userCreation;
}

//Setters
User.prototype.setId = function (userId){
    if(parseInt(userId) !== 0){
        this.id = userId;
    }
};

User.prototype.setNom = function(number){
    if(number.length() > 0){
        this.nom = number;
    }
};

User.prototype.setPrenom = function(name){
    if(name.length() > 0){
        this.prenom = name;
    }
};

User.prototype.setCountry = function(pays){
    if(pays.length() > 0){
        this.country = pays;
    }
};

User.prototype.setEmail = function(encoded){
    if(encoded.length() > 0){
        this.email = encoded;
    }
};

User.prototype.setPlaceBirth = function(number){
    if(number.length() > 0){
        this.placeBirth = number;
    }
};

User.prototype.setDateBirth = function(name){
    if(name.length() > 0){
        this.dateBirth = name;
    }
};

User.prototype.setSkills = function(pays){
    if(pays.length() > 0){
        this.skills = pays;
    }
};

User.prototype.setDateCreation = function(encoded){
    if(encoded.length() > 0){
        this.dateCreation = encoded;
    }
};

//Getters
User.prototype.getNom = function () {
    // body...
    return this.nom;
};

User.prototype.getID = function() {
    // body...
    return this.id;
};

User.prototype.getPrenom = function() {
    // body...
    return this.prenom;
};

User.prototype.getEmail = function() {
    // body...
    return this.email;
};

User.prototype.getCountry = function() {
    // body...
    return this.country;
};

User.prototype.getPlaceBirth = function() {
    // body...
    return this.placeBirth;
};

User.prototype.getDateBirth = function() {
    // body...
    return this.dateBirth;
};

User.prototype.getSkills = function() {
    // body...
    return this.skills;
};

User.prototype.getDateCreation = function() {
    // body...
    return this.dateCreation;
};

User.prototype.getUserJSON = function() {
    // body...
    return {
        nom:this.getNom(),
        prenom:this.getPrenom(),
        country:this.getCountry(),
        id:this.getID(),
        email:this.getEmail(),
        skills:this.getSkills(),
        dateBirth:this.getDateBirth(),
        placeBirth:this.getPlaceBirth(),
        dateCreation:this.getDateCreation()
    };
};
module.exports = User;