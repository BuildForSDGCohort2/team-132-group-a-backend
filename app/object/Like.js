
function Like(id, sender, community, article, date) {
	// body...
	this._id = id;
	this._sender = sender;
	this._community = community;
	this._article = article;
	this._date = date;
}

Like.prototype.setId = function(id) {
	// body...
	if(parseInt(id) !== 0)
		this._id = id;
};

Like.prototype.setSender = function(sender) {
	// body...
	if(sender.length > 0)
		this._sender = sender;
};

Like.prototype.setCommunity = function(first_argument) {
	// body...
};

module.exports = Like;