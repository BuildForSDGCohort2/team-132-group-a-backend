

function Article(id, title, writtenBy, community, content, type, date_article) {
	// body...
	this._id = id;
	this._title = title;
	this._written = writtenBy;
	this._community = community;
	this._content = content;
	this._type = type;
	this._date = date_article;
}

Article.prototype.setId = function(id) {
	// body...
	if(parseInt(id) !== 0)
		this._id = id;
};

Article.prototype.setTitle = function(title) {
	// body...
	if(title.length > 0)
		this._title = title;
};

Article.prototype.setWritten = function(writtenBy) {
	// body...
	if(writtenBy.length > 0)
		this._written = writtenBy;
};

Article.prototype.setCommunity = function(community) {
	// body...
	if(community.length > 0)
		this._community = community;
};

Article.prototype.setContent = function(content) {
	// body...
	if(content.length > 0)
		this._content = content;
};

Article.prototype.setType = function(type) {
	// body...
	if(type.length > 0)
		this._type = type;
};

Article.prototype.setDate = function(date_article) {
	// body...
	if(date_article.length > 0)
		this._date = date_article;
};

Article.prototype.setLikeCount = function(like) {
	// body...
	if(parseInt(like) >= 0)
		this._likes = like;
};

Article.prototype.setCommentCount = function(comments) {
	// body...
	if(parseInt(comments) >= 0)
		this._commentsNo = comments;
};

Article.prototype.setCommentList = function(comments) {
	// body...
	//if(typeof comments === 'array')
	this._comments = comments;
};

Article.prototype.setLiked = function(liked) {
	// body...
	if(typeof liked === 'boolean')
		this._isLiked = liked;
};

Article.prototype.setCommunityId = function(id) {
	// body...
	if(parseInt(id) >= 0)
		this._idCommunity = id;
};

Article.prototype.setCommunityCanonical = function(canonical) {
    // body...
    if(canonical.length > 0)
        this._canonical = canonical;
};

Article.prototype.getId = function() {
	// body...
	return this._id;
};

Article.prototype.getTitle = function() {
	// body...
	return this._title;
};

Article.prototype.getWritten = function() {
	// body...
	return this._written;
};

Article.prototype.getCommunity = function() {
	// body...
	return this._community;
};

Article.prototype.getContent = function() {
	// body...
	return this._content;
};

Article.prototype.getType = function() {
	// body...
	return this._type;
};

Article.prototype.getDate = function() {
	// body...
	return this._date;
};

Article.prototype.getLikeCount = function() {
	// body...
	return this._likes;
};

Article.prototype.getCommentCount = function() {
	// body...
	return this._commentsNo;
};

Article.prototype.isLiked = function() {
	// body...
	return this._isLiked;
};

Article.prototype.getCommentList = function() {
	// body...
	return this._comments;
};

Article.prototype.getIdCommunity = function() {
	// body...
	return this._idCommunity;
};

module.exports = Article;