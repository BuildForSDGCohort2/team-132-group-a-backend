/*ArticleManager file Created By Henock Bongi [HBI] on December, 20th, 2017 at 21:49 [09:49 PM]*/
/*Version 1.0*/

var _articleList = [];
var _db;
var _fileUtils;
var _article;
var _tmpTab = [];
var ArticleObject = require('../object/Article');

function ArticleManager(db, fileUtils) {
	// body...
	_db = db;
	_fileUtils = fileUtils;
	/*this.getCommunityArticles(1, 'Tosala', function(found, list){
		if(found){
			fileUtils.logger(fileUtils.stringifyJSON(list));
		}
	});*/
}

ArticleManager.prototype.addArticle = function(user_id, title, nom, community, content, type, fn) {
	// body...
	_db.addArticle(user_id, title, community, content, type, function(saved, id_article, date_article){
		if(saved){
			_article = new ArticleObject(id_article, title, nom, 'community', content, type, date_article);
			fn(true, _article);
		}else{
			fn(false);
		}
	});
};

ArticleManager.prototype.addLike = function(tag, sender_id, id_article, fn) {
	// body...
	_db.addLike(tag, sender_id, id_article, fn);
};

ArticleManager.prototype.addComment = function(sender_id, content, id_article, fn) {
	// body...
	_db.addComment(sender_id, content, id_article, fn);
};

ArticleManager.prototype.getCommunityArticles = function(id_community, community_name, user_id, fn) {
	// body...
    _db.getCommunityArticles(id_community, function(found, data, usernames, likeCounts, commentCounts){
        if(found){
            for (var i = 0; i < data.length; i++) {
                _db.checkLikeStatus(data[i].id, i, user_id, function (got, index, liked, comments, likeCount, commentCount) {
                    if (got) {
                        _fileUtils.logger('return Like -- '+got);
                        _article = new ArticleObject(data[index].id, data[index].title, usernames[index], community_name, data[index].content, data[index].type, data[index].date_creation);
                        _article.setLikeCount(likeCount);
                        _article.setCommentCount(commentCount);
                        _article.setLiked(liked);
                        _article.setCommentList(comments);
                        _article.setCommunityId(id_community);
                        _fileUtils.logger(typeof comments);
                        //fileUtils.logger(fileUtils.stringifyJSON(likeCount));

                        _articleList.push(_article);
                        if(_articleList.length === data.length){
                            fn(true, _articleList);
                            _articleList = [];
                        }
                    }
                });
                /*_db.getComments(data[i].id, i, function(got, comments, index){
                    if(got){
                        _article = new ArticleObject(data[index].id, data[index].title, usernames[index], community_name, data[index].content, data[index].type, data[index].date_creation);
                        _article.setLikeCount(likeCount[index]);
                        _article.setCommentCount(commentCount[index]);
                        _article.setCommentList(comments);
                        _article.setCommunityId(id_community);
                        _article.setLiked(liked);
                        //fileUtils.logger(fileUtils.stringifyJSON(likeCount));
                        _articleList.push(_article);
                        if(_articleList.length === data.length){
                            fn(true, _articleList);
                            _articleList = [];
                        }
                    }
                });*/
            }
        }else{
            fn(false);
        }
    });
};
ArticleManager.prototype.getFollowedCommunityArticles = function(session, id_community, community_name, user_id, t, _communityM, _userM, fn) {
	// body...
    var commLen = t;
    _tmpTab.push(id_community);
    if(session){
        _db.getFollowedCommunityArticlesFinal(id_community, function (found, data) {
            _fileUtils.logger('return -- '+found);
            if(found) {
                _fileUtils.logger(_fileUtils.stringifyJSON(data));
                for (var i = 0; i < data.data.length; i++) {
                    _db.checkLikeStatus(data.data[i].id, i, user_id, function (got, index, liked, comments, likeCount, commentCount) {
                        if (got) {
                            var communityName = _communityM.getCommunityNameById(data.data[index].community_id);
                            var userName = _userM.getUserById(data.data[index].written_by);
                            _fileUtils.logger('return Like -- '+got);
                            _article = new ArticleObject(data.data[index].id, data.data[index].title, userName, communityName, data.data[index].content, data.data[index].type, data.data[index].date_creation);
                            _article.setLikeCount(likeCount);
                            _article.setCommentCount(commentCount);
                            _article.setLiked(liked);
                            _article.setCommentList(comments);
                            _article.setCommunityId(id_community);
                            let communityCanonical = _communityM.getCommunityById(data.data[index].community_id);
                            _fileUtils.logger(_fileUtils.stringifyJSON(communityCanonical));
                            _article.setCommunityCanonical(communityCanonical.canonical);
                            _fileUtils.logger(typeof comments);
                            //fileUtils.logger(fileUtils.stringifyJSON(likeCount));

                            _articleList.push(_article);
                            _fileUtils.logger(''+commLen +'==='+ _tmpTab.length);
                            _fileUtils.logger(commLen === _tmpTab.length);
                            if (commLen === _tmpTab.length) {
                                fn(true, _articleList);
                            }
                        }
                    });
                }
            }
        });
    }
};

ArticleManager.prototype.getLatestNews = function (user_id, _communityM, _userM, fn){
    _db.getLatestNews(function(state, articles){
        if(state){
            for (let i = 0; i < articles.length; i++) {
                _db.checkLikeStatus(articles[i].id, i, user_id, function (got, index, liked, comments, likeCount, commentCount) {
                    if (got) {
                        var communityName = _communityM.getCommunityNameById(articles[index].community_id);
                        var userName = _userM.getUserById(parseInt(articles[index].written_by));
                        _fileUtils.logger('return Like -- '+got);
                        _fileUtils.logger(_fileUtils.stringifyJSON(articles[index]));
                        _article = new ArticleObject(articles[index].id, articles[index].title, userName, communityName, articles[index].content, articles[index].type, articles[index].date_creation);
                        _article.setLikeCount(likeCount);
                        _article.setCommentCount(commentCount);
                        _article.setLiked(liked);
                        _article.setCommentList(comments);
                        _article.setCommunityId(articles[index].community_id);
                        let communityCanonical = _communityM.getCommunityById(articles[index].community_id);
                        _fileUtils.logger(_fileUtils.stringifyJSON(articles[index]));
                        _fileUtils.logger(_fileUtils.stringifyJSON(communityCanonical));
                        _article.setCommunityCanonical(communityCanonical.canonical);
                        _fileUtils.logger(typeof comments);
                        //fileUtils.logger(fileUtils.stringifyJSON(likeCount));

                        _articleList.push(_article);
                        _fileUtils.logger(''+articles.length +'==='+ _articleList.length);
                        _fileUtils.logger(articles.length === _articleList.length);
                        if (articles.length === _articleList.length) {
                            fn(true, _articleList);
                        }
                    }
                });
            }
        }else{
            fn(false);
        }
    });
};
ArticleManager.prototype.resetTables = function () {
    _articleList = [];
    _tmpTab = [];
};

module.exports = ArticleManager;