/*Community Class*/
/*This is the Community class of the app*/
/*Class version : 1.0.0*/

function Community (result) {
    // body...
    this.nom = result.name;
    this.canonical = result.canonical_name;
    this.description = result.description;
    this.creator = result.creator_id;
    this.id = result.id;
    this.votes = result.vote;
    this.followers = result.followers;
    this.nbrComments = result.nbr_comments;
    this.dateCreation = result.creation_date;
    this.tags = result.hashtag_ids;
}

//Setters
Community.prototype.setId = function (CommunityId){
    if(parseInt(CommunityId) !== 0){
        this.id = CommunityId;
    }
};

Community.prototype.setNom = function(number){
    if(number.length > 0){
        this.nom = number;
    }
};

Community.prototype.setDescription = function(name){
    if(name.length > 0){
        this.description = name;
    }
};

Community.prototype.setCreator = function(pays){
    if(pays.length > 0){
        this.creator = pays;
    }
};

Community.prototype.setVotes = function(encoded){
    if(encoded.length > 0){
        this.votes = encoded;
    }
};

Community.prototype.setNbrComments = function(number){
    if(number.length > 0){
        this.nbrComments = number;
    }
};

Community.prototype.setFollowers = function(name){
    if(name.length > 0){
        this.followers = name;
    }
};

Community.prototype.setTags = function(pays){
    if(pays.length > 0){
        this.tags = pays;
    }
};

Community.prototype.setDateCreation = function(encoded){
    if(encoded.length > 0){
        this.dateCreation = encoded;
    }
};

//Getters
Community.prototype.getNom = function () {
    // body...
    return this.nom;
};

Community.prototype.getID = function() {
    // body...
    return this.id;
};

Community.prototype.getDescription = function() {
    // body...
    return this.description;
};

Community.prototype.getVotes = function() {
    // body...
    return this.votes;
};

Community.prototype.getCreator = function() {
    // body...
    return this.creator;
};

Community.prototype.getNbrComments = function() {
    // body...
    return this.nbrComments;
};

Community.prototype.getFollowers = function() {
    // body...
    return this.followers;
};

Community.prototype.getTags = function() {
    // body...
    return this.tags;
};

Community.prototype.getDateCreation = function() {
    // body...
    return this.dateCreation;
};

Community.prototype.getCommunityJSON = function() {
    // body...
    return {
        nom:this.getNom(),
        description:this.getDescription(),
        creator:this.getCreator(),
        id:this.getID(),
        votes:this.getVotes(),
        tags:this.getTags(),
        followers:this.getFollowers(),
        nbrComments:this.getNbrComments(),
        dateCreation:this.getDateCreation()
    };
};
module.exports = Community;