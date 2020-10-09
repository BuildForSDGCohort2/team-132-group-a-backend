/*Database handler file Created By Henock Bongi [HBI] on December, 22th, 2016 at 11:14 [11:14 AM]*/
/*Version 1.0*/

/*Begin Variables*/
var connection;
var fileUtils;
var instance;
var _config = require('../database/config.js').mysqlConfig;
/*End Variables*/

/*Constructor Class*/
function AsyncDb (mySQL, FileUtils) {
	// body...
  
	connection = mySQL.createConnection(_config);
    connection.connect(function(error) {
      if (error) {
         
        FileUtils.logger('CONNECTION error: ' + error);
        
        setTimeout( AsyncDb, 2000);
      }
      FileUtils.logger('connection successful !!!! from class AsyncDb');
      
  	});
  	fileUtils = FileUtils;
    instance = this;
    keepAlive();
}

AsyncDb.prototype.addArticle = function(user_id, title, community_id, content, type, fn) {
  // body...
  var data = {
    written_by:user_id,
    title:title,
    content:content,
    community_id:community_id,
    type:type,
    date_creation:new Date()
  };
  connection.query('INSERT INTO article SET ?', data, function (err, result){
    if(err){
        fileUtils.logger(err);
      fn(false);
    }else{
      fn(true, result.insertId, data.date_creation);
    }
  });
};

AsyncDb.prototype.addCommunity = function(user_id, name, desc, tags, fn) {
  // body...
  var data = {
    name:name,
    canonical_name: name.toLowerCase().replace(/:/g, '').replace(/ /g, '-').replace('\'', '').replace('’', '').replace(/[^\w\s]/gi, '-'),
    description:desc,
    creator_id:user_id,
    vote:0,
    followers:0,
    nbr_comments:0,
    enabled:1,
    hashtag_ids:tags,
    creation_date:new Date()
  };
  connection.query('INSERT INTO community SET ?', data, function (err, result){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(true, result.insertId, data);
    }
  });
};

AsyncDb.prototype.addLike = function(tag, id_sender, id_article, fn) {
  // body...
  if(tag === 'add'){
    var data = {
      sender_id:id_sender,
      article_id: id_article,
      date_liked:new Date()
    };
    connection.query('INSERT INTO likes SET ?', data, function(err, res){
      if(err){
        fileUtils.logger(err);
        fn(false);
      }else{
        fn(true);
      }
    });
  }else if(tag === 'remove'){
    connection.query('DELETE FROM likes WHERE article_id ="'+id_article+'" AND sender_id = "'+id_sender+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
  }
};

AsyncDb.prototype.addComment = function(sender_id, content, id_article, fn) {
  // body...
  var data = {
    sender_id:sender_id,
    article_id: id_article,
    content:content,
    date_added:new Date()
  };
  connection.query('INSERT INTO commentaire SET ?', data, function(err, res){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(true, data);
    }
  });
};

AsyncDb.prototype.addTags = function(tag, fn) {
  // body...
  var data = {
    hashtag:tag,
    date_added:new Date()
  };
  checkTag(tag, function(exists){
    if(exists){
      fileUtils.logger('tag -> '+tag+' -> '+exists);
      connection.query('SELECT id FROM hashtag WHERE hashtag = "'+tag+'"', function(error, result){
        if (error) {
          fn(false);
          fileUtils.logger(error);
        }else{
          fileUtils.logger(fileUtils.stringifyJSON(result));
          fn(result.length > 0, result[0].id);
        }
      });
    }else{
      connection.query('INSERT INTO hashtag SET ?', data, function (err, result){
        if(err){
          fileUtils.logger(err);
          fn(false);
        }else{
          fileUtils.logger(fileUtils.stringifyJSON(result));
          fn(true, result.insertId);
        }
      });
    }
  });
};

AsyncDb.prototype.addFollower = function(user_id, id, admin, fn) {
  // body...
  var data = {
    id_follower:user_id,
    id_community:id,
    enabled:admin,
    date_following:new Date()
  };
  connection.query('INSERT INTO following SET ?', data, function (err, result){
    if(err){
        fileUtils.logger(err);
      fn(false);
    }else{
      //fn(true);
      updateCommunityFollower(true, id, fn);
    }
  });
};

AsyncDb.prototype.addMember = function(data, fn) {
  // body...
  connection.query('INSERT INTO member SET ?', data, function (err, result){
    if(err){
        fileUtils.logger(err);
      fn(false);
    }else{
      fn(true);
    }
  });
};

AsyncDb.prototype.addProject = function(data, fn) {
  // body...
  connection.query('INSERT INTO project SET ?', data, function (err, result){
    if(err){
        fileUtils.logger(err);
      fn(false);
    }else{
      getLastIdPrj(function(idProject) {
        fn(true, idProject);
      });
    }
  });
};

AsyncDb.prototype.addInvitation = function(json, fn) {
  // body...
  var mise  = {
    id: '', 
    sender_id: json.senderID, 
    receiver_id: json.receiverID, 
    group_id: json.groupID,
    status: json.status, 
    day_delay: json.delay, 
    date_sent: fileUtils.newDate()
  };

  connection.query('INSERT INTO invitation SET ?', mise, function (err, result){
    if(err){
        fileUtils.logger(err);
      fn(false);
    }else{
      fn(true);
    }
  });
};

AsyncDb.prototype.addNotification = function(json, fn) {
  // body...
  var mise  = {
    id: '', 
    id_from: json.fromID,
    id_to: json.toID,
    tag: json.tag,
    status: json.status,
    date_sent: fileUtils.newDate()
  };

  connection.query('INSERT INTO notification SET ?', mise, function (err, result){
    if(err){
        fileUtils.logger(err);
      fn(false);
    }else{
      fn(true);
    }
  });
};

AsyncDb.prototype.addUser = function(json, fn) {
  // body...
  var mise  = {
    id: '', 
    first_name: json.name, 
    last_name: json.lastname, 
    email: json.email, 
    date_birth: json.dateBirth, 
    place_birth: json.placeBirth, 
    country: json.country,
    user_skills: 0,
    date_creation: fileUtils.newDate()
  };

  var login = {
    id:'',
    email: json.email,
    password: json.hash,
    hash: json.salt,
    last_login: fileUtils.newDate()
  };

  addLogin(login, function (saved){
    if(saved){
      connection.query('INSERT INTO user SET ?', mise, function (err, result){
        if(err){
        fileUtils.logger(err);
          fn(false);
        }else{
          fn(true);
        }
      });
    }else{
      fn(false);
    };
  });
};

AsyncDb.prototype.assignNewAdmin = function(newId, groupNumber, fn) {
  // body...
  var update = {
    is_admin:1,
    is_creator:1
  };

  connection.query('UPDATE member SET ? WHERE num_group = "'+groupNumber+'" AND user_id = "'+newId+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false);
    }else{
        fileUtils.logger(newId+' a été mis à jour avec succès !');
        fn(true);
    }
  });
};

AsyncDb.prototype.checkUser = function(email, password, hash, bcrypt, fn) {
  // body...
  connection.query('SELECT * FROM login WHERE email = "'+email+'"', function(error, result){
    if (!error) {
      fileUtils.logger(result.length)
      if(result.length > 0){
        var lop = result[0];
        fileUtils.compareHash(bcrypt, password, lop['password'], function (is){
          /*if(is){

          }*/
          fn(is);
          //fileUtils.logger(is)
        });
      }else{
        fn(false);
      }
      //fn(result.length > 0);
    }else{
      fn(false);
      fileUtils.logger(error)
    }
  });
};

AsyncDb.prototype.checkUserAccount = function(email, fn) {
  // body...
  connection.query('SELECT * FROM user WHERE email = "'+email+'"', function(error, result){
    if (!error) {
      fileUtils.logger(result.length)
      fn(result.length > 0);
    }else{
      fn(false);
      fileUtils.logger(error)
    }
  });
};

AsyncDb.prototype.checkFollower = function(user, id, fn) {
  // body...
  connection.query('SELECT * FROM following WHERE id_follower = "'+ user +'" AND id_community ="'+id+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fileUtils.logger(fileUtils.stringifyJSON(resultts));
      fn(resultts.length > 0, resultts);
    }
  });
};

AsyncDb.prototype.checkGroupAdmin = function(groupNumber, usernumber, fn) {
  // body...
  connection.query('SELECT * FROM member WHERE num_group = "'+ groupNumber +'" AND user_id ="'+usernumber+'" AND is_admin ='+1, function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(resultts.length > 0);
    }
  });
};

AsyncDb.prototype.checkInvitation = function(json, fn) {
  // body...

  connection.query('SELECT * FROM invitation WHERE sender_id = "'+json.senderID+'" AND receiver_id = "'+json.receiverID+'" AND group_id = "'+json.groupID+'" AND status = "rejected" OR status = "canceled"', function (error, itiz){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      //fileUtils.logger(itiz);
      fileUtils.logger(itiz.length > 0);
      fn(itiz.length > 0, itiz);
    }
  });
};

AsyncDb.prototype.checkMemberExist = function(groupNumber, usernumber, fn) {
  // body...
  connection.query('SELECT * FROM member WHERE num_group = "'+ groupNumber +'" AND user_id ="'+usernumber+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(resultts.length > 0);
    }
  });
};

AsyncDb.prototype.createGroup = function(data, fn) {
  // body...
  connection.query('INSERT INTO groupe SET ?', data, function (err, result){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
};

AsyncDb.prototype.deleteAccount = function(email, fn) {
  // body...
  connection.query('SELECT * FROM user WHERE email = "'+email+'"', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        deleteUserInfo(valu['id'], function (is){
          if(is){
            deleteUserLogin(email, function (ok){
              fn(ok);
            });
          }
        });
      }
    }
  });
};

AsyncDb.prototype.deleteCommunity = function(id, valeur, fn) {
  // body...
  var update = {enabled:valeur};
  connection.query('UPDATE community SET ? WHERE id = "'+id+'"', update, function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        deleteCommunityFollowers(id, valeur, function (is){
          fn(is);
          /*if(is){
            deleteCommunityActivities(id, function (ok){
              fn(ok);
            });
          }*/
        });
      }
    }
  });
};

AsyncDb.prototype.deleteFollowerCommunity = function(user, id, fn) {
  // body...
  connection.query('DELETE FROM following WHERE id_follower = "'+user+'" AND id_community = "'+id+'"', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      //fn(true);
      updateCommunityFollower(false, id, fn);
    }
  });
};

AsyncDb.prototype.deleteGroupMember = function(groupNumber, user_id, fn) {
  // body...
  connection.query('SELECT * FROM member WHERE num_group = "'+ groupNumber +'" AND user_id = "'+user_id+'"', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        deleteMember(valu['id'], function (is){
          fn(is);
        });
      }else{
        fn(false);
      }
    }
  });
};

AsyncDb.prototype.deleteProject = deleteProject;

AsyncDb.prototype.leaveGroup = function(groupNumber, fn) {
  // body...
  //connection.query()
  connection.query('DELETE FROM groupe WHERE numero = "'+groupNumber+'"', function(err, result){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(true);
    }
  });
};

AsyncDb.prototype.getCommunity = function(id, fn) {
  // body...
  var timer;
  var tab = [];
  connection.query('SELECT * FROM community WHERE id = "'+ id +'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        var community = resultts[0];
        var tmp = community.hashtag_ids;
        if(~tmp.indexOf(',')){
          var tempTab = tmp.split(',');
          if(tempTab.length > 0){
            for (var i = 0; i < tempTab.length; i++) {
              fileUtils.logger(tempTab[i]);
              getCommunityTags(tempTab[i], function(state, tag){
                if(state){
                  tab.push(tag);
                  fileUtils.logger('-> '+tag);
                }
              });
            }
          }
          timer = setInterval(function(){
            if(tab.length === tempTab.length){
              clearInterval(timer);
              fileUtils.logger(fileUtils.stringifyJSON(tab));
              fn(resultts.length > 0, resultts[0], tab);
            }
          }, 500);
        }else{
          getCommunityTags(tmp, function(state, tag){
            if(state){
              tab.push(tag);
              fileUtils.logger('-> '+tag);
              fn(resultts.length > 0, resultts[0], tab);
            }
          });
        }
      }
    }
  });
};

AsyncDb.prototype.getAutocompleteTags = function(key, fn) {
  // body...
  connection.query('SELECT hashtag FROM hashtag WHERE hashtag LIKE "%'+key+'%"', function(err, rows, fields) {
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(true, rows);
    }
  });
};

AsyncDb.prototype.getBestCommunities = function(fn) {
  // body...
  connection.query('SELECT * FROM community WHERE vote > 1000 ORDER BY vote desc', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        fileUtils.logger(fileUtils.stringifyJSON(resultts));
        fn(resultts.length > 0, resultts);
      }
    }
  });
};

AsyncDb.prototype.getCommunityArticles = function(id, fn) {
  // body...
  tmpUsernames = [];
  tmpLikeNo = [];
  tmpCommentNo = [];
  tmpCommentsList = [];
  connection.query('SELECT * FROM article WHERE community_id ="'+id+'" ORDER BY id DESC', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        //fn(resultts.length > 0, resultts);
        for(var i = 0; i < resultts.length; i++){
          instance.getUserInfoById(resultts[i].written_by, function(found, userInfo){
            if(found){
              //fileUtils.logger(tmpUsernames.length +'==='+ resultts.length);
              tmpUsernames.push(userInfo['last_name']+' '+userInfo['first_name']);
              /*if(tmpUsernames.length === resultts.length){
                fn(true, resultts, tmpUsernames);
              }*/
            }
          });
          instance.getLikes(resultts[i].id, function(found, count){
            if(found){
              //fileUtils.logger('likes -> '+count);
              tmpLikeNo.push(count);
            }
          });
          instance.getCommentsCount(resultts[i].id, function(found, count){
            if(found){
              //fileUtils.logger('Comments No -> '+count);
              tmpCommentNo.push(count);
              if(tmpUsernames.length === resultts.length && tmpLikeNo.length === resultts.length && tmpCommentNo.length === resultts.length){
                fn(true, resultts, tmpUsernames, tmpLikeNo, tmpCommentNo);
              }
            }
          });
          /*instance.getComments(resultts[i].id, function(found, comments){
            if(found){
              fileUtils.logger('Comments -> '+count);
              tmpCommentsList.push(comments);
              if(tmpUsernames.length === resultts.length 
                && tmpLikeNo.length === resultts.length 
                && tmpCommentNo.length === resultts.length 
                && tmpCommentsList.length === resultts.length){
                fn(true, resultts, tmpUsernames, tmpLikeNo, tmpCommentNo, tmpCommentsList);
              }
            }
          });*/
        }
      }else{
        fn(false);
      }
    }
  });
};
AsyncDb.prototype.getFollowedCommunityArticlesV2 = function (user_id, fn) {
    var _inst = this;
    var tmpUsernames = [];
    var tmpLikeNo = [];
    var tmpCommentNo = [];
    var tmpCommentsList = [];
    connection.query('SELECT art.title as titre, art.id as id, art.content as content, art.community_id as id_comm, art.written_by as publisher, art.type as type, art.date_creation as date, (SELECT name FROM community WHERE id = f.id_community) as community, (SELECT first_name FROM user WHERE id = art.written_by) as first_name, (SELECT last_name FROM user WHERE id = art.written_by) as last_name FROM article art inner join following f on f.id_follower = '+user_id, function (err, results) {
        if(err){
          fileUtils.logger(err);
        }else{
          fileUtils.logger(fileUtils.stringifyJSON(results));
        }
    });
    /*connection.query('SELECT * FROM article ORDER BY id DESC LIMIT 10', function (err, resultts){
        if(err){
            fileUtils.logger(err);
            fn(false);
        }else{
            if(resultts.length > 0){
                for (var i = 0; i < resultts.length; i++){
                    instance.getUserInfoById(resultts[i].written_by, function(found, userInfo){
                        if(found){
                            //fileUtils.logger(tmpUsernames.length +'==='+ resultts.length);
                            tmpUsernames.push(userInfo['last_name']+' '+userInfo['first_name']);
                            /*if(tmpUsernames.length === resultts.length){
                              fn(true, resultts, tmpUsernames);
                            }*
                        }
                    });
                    instance.getLikes(resultts[i].id, function(found, count){
                        if(found){
                            //fileUtils.logger('likes -> '+count);
                            tmpLikeNo.push(count);
                        }
                    });
                    instance.getCommentsCount(resultts[i].id, function(found, count){
                        if(found){
                            //fileUtils.logger('Comments No -> '+count);
                            tmpCommentNo.push(count);
                            /*if(tmpUsernames.length === resultts.length && tmpLikeNo.length === resultts.length && tmpCommentNo.length === resultts.length){
                                fn(true, resultts, tmpUsernames, tmpLikeNo, tmpCommentNo, index, communityName);
                            }*
                        }
                    });
                    connection.query('SELECT * FROM following WHERE id_follower = "'+user_id+'" AND id_community = "'+resultts[i].community_id+'"', function (error, res) {
                        if(error){
                          fileUtils.logger(error);
                        }else{
                          if(res.length > 0){

                          }
                        }
                    });
                }
            }
        }
    });*/
    /*_inst.getFollowedCommunity(user_id, function(found, communities){
        if(found){
            //fn(true, communities);

        }else{
            fn(false);
        }
    });*/
};
AsyncDb.prototype.getFollowedCommunityArticlesFinal = function (community_id, fn) {
  var oldQuery = 'SELECT art.title as titre, ' +
      'art.id as id, ' +
      'art.content as content, ' +
      'art.community_id as id_comm, ' +
      'art.written_by as publisher, ' +
      'art.type as type, ' +
      'art.date_creation as date, ' +
      '(SELECT name FROM community WHERE id = art.community_id) as community, ' +
      '(SELECT first_name FROM user WHERE id = art.written_by) as first_name, ' +
      '(SELECT last_name FROM user WHERE id = art.written_by) as last_name, ' +
      '(SELECT COUNT (*) as count FROM likes WHERE article_id = art.id) as likeCount, ' +
      '(SELECT COUNT (*) as count FROM commentaire WHERE article_id = art.id) as commentCount FROM article art inner join community f on f.id = '+community_id;

    connection.query('SELECT * FROM article WHERE community_id ="'+community_id+'"ORDER BY id DESC LIMIT 10', function (err, results) {
        if(err){
            fileUtils.logger(err);
            fn(false);
        }else{
            fileUtils.logger(fileUtils.stringifyJSON(results));
            if(results.length > 0) {
                var _returnedData = {
                    id_community: community_id,
                    data:results
                };
                /*for (var i = 0; i < results.length; i++){
                    connection.query('SELECT (SELECT name FROM community WHERE id = '+results[i].community_id+') as community, ' +
                        '(SELECT first_name FROM user WHERE id = '+results[i].written_by+') as first_name, ' +
                        '(SELECT last_name FROM user WHERE id = '+results[i].written_by+') as last_name, ' +
                        '(SELECT COUNT (*) as count FROM likes WHERE article_id = '+results[i].id+') as likeCount, ' +
                        '(SELECT COUNT (*) as count FROM commentaire WHERE article_id = '+results[i].id+') as commentCount FROM user art inner join community f on f.id = '+results[i].community_id, function (error, received) {
                        if(error){
                            fileUtils.logger(error);
                            fn(false);
                        }else{
                            if(received.length > 0){
                                fileUtils.logger('-- return -- '+ community_id+' -- length -- '+ received.length);
                                fileUtils.logger(fileUtils.stringifyJSON(received));
                            }
                        }
                    });
                }*/
                fn(true, _returnedData);
            }else{
              fn(false);
            }
        }
    });
};
AsyncDb.prototype.getFollowedCommunityArticles = function(id, index, communityName, fn) {
  // body...
  tmpUsernames = [];
  tmpLikeNo = [];
  tmpCommentNo = [];
  tmpCommentsList = [];
  connection.query('SELECT * FROM article WHERE community_id ="'+id+'" ORDER BY id DESC LIMIT 10', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
          fileUtils.logger('taille du tableau = '+resultts.length);
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        //fn(resultts.length > 0, resultts);
        for(var i = 0; i < resultts.length; i++){
          instance.getUserInfoById(resultts[i].written_by, function(found, userInfo){
            if(found){
              //fileUtils.logger(tmpUsernames.length +'==='+ resultts.length);
              tmpUsernames.push(userInfo['last_name']+' '+userInfo['first_name']);
              /*if(tmpUsernames.length === resultts.length){
                fn(true, resultts, tmpUsernames);
              }*/
            }
          });
          instance.getLikes(resultts[i].id, function(found, count){
            if(found){
              //fileUtils.logger('likes -> '+count);
              tmpLikeNo.push(count);
            }
          });
          instance.getCommentsCount(resultts[i].id, function(found, count){
            if(found){
              //fileUtils.logger('Comments No -> '+count);
              tmpCommentNo.push(count);
              if(tmpUsernames.length === resultts.length && tmpLikeNo.length === resultts.length && tmpCommentNo.length === resultts.length){
                fn(true, resultts, tmpUsernames, tmpLikeNo, tmpCommentNo, index, communityName);
              }
            }
          });
          /*instance.getComments(resultts[i].id, function(found, comments){
            if(found){
              fileUtils.logger('Comments -> '+count);
              tmpCommentsList.push(comments);
              if(tmpUsernames.length === resultts.length 
                && tmpLikeNo.length === resultts.length 
                && tmpCommentNo.length === resultts.length 
                && tmpCommentsList.length === resultts.length){
                fn(true, resultts, tmpUsernames, tmpLikeNo, tmpCommentNo, tmpCommentsList);
              }
            }
          });*/
        }
      }else{
        fn(false);
      }
    }
  });
};

AsyncDb.prototype.getLatestNews = function (fn) {
    connection.query('SELECT * FROM article ORDER BY id DESC LIMIT 25', function (err, results) {
        if(err){
            fileUtils.logger(err);
            fn(false);
        }else{
            fileUtils.logger(fileUtils.stringifyJSON(results));
            if(results.length > 0) {
                fn(true, results);
            }else{
                fn(false);
            }
        }
    });
};

AsyncDb.prototype.getLikes = function(id_article, fn) {
  // body...
  connection.query('SELECT COUNT (*) as count FROM likes WHERE article_id ="'+id_article+'"', function(err, res){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      //fileUtils.logger(fileUtils.stringifyJSON(res));
      fn(res.length > 0, res[0].count);
    }
  });
};

AsyncDb.prototype.getCommunityTag = function (community_id, values, fn) {
    connection.query('SELECT * FROM hashtag WHERE id = "'+id+'"', function(error, result){
        if (error) {
            fn(false);
            fileUtils.logger(error);
        }else{
            fileUtils.logger(result.length);
            fn(result.length > 0, result[0].hashtag);
        }
    });
};

AsyncDb.prototype.getCommentsCount = function(id_article, fn) {
  // body...
  connection.query('SELECT COUNT (*) as count FROM commentaire WHERE article_id ="'+id_article+'"', function(err, res){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      //fileUtils.logger(fileUtils.stringifyJSON(res));
      fn(res.length > 0, res[0].count);
    }
  });
};

AsyncDb.prototype.checkLikeStatus = function(id, index, user_id, fn) {
  // body...
    instance.getLikes(id, function(f, likes){
        instance.getComments(id, index, function(found, comments, jindex){
            if(found){
                fileUtils.logger('Comments -> '+fileUtils.stringifyJSON(comments));
                connection.query('SELECT COUNT (*) as count FROM likes WHERE article_id ="'+id+'" AND sender_id ="'+user_id+'"', function(err, res){
                    if(err){
                        fileUtils.logger(err);
                        fn(false);
                    }else{
                        //fileUtils.logger(fileUtils.stringifyJSON(res));
                        fn(true, index, res[0].count > 0, comments, likes, comments.length);
                    }
                });
            }
        });
    });
};

AsyncDb.prototype.getComments = function(id_article, index, fn) {
  // body...
  tempTab = [];
  //var q = 'SELECT comment.sender_id AS sender FROM commentaire JOIN user ON commentaire.sender_id ="'+commentaire+'"';
  connection.query('SELECT * FROM commentaire WHERE article_id ="'+id_article+'"', function(err, res){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      //fileUtils.logger(fileUtils.stringifyJSON(res));
      fn(true, res, index);
      /*if (res.length > 0) {
        for (var i = 0; i < res.length; i++) {
          instance.getUserInfoByIdIndex(res[i].sender_id, i, function(found, userInfo, index){
            if(found){
              //fileUtils.logger(tmpUsernames.length +'==='+ resultts.length);
              json = {
                id:res[index].id,
                sender_id:res[index].sender_id,
                content:res[index].content,
                sender:userInfo['last_name']+' '+userInfo['first_name'],
                date:res[index].date_added
              };
              tempTab.push(json);
              if(tempTab.length === res.length){
                fn(true, tempTab);
              }
            }
          });
        }
      } else {fn(true, res)}*/
    }
  });
};

AsyncDb.prototype.getCommunityList = function(fn) {
  // body...
  connection.query('SELECT * FROM community', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        fn(resultts.length > 0, resultts);
      }
    }
  });
};

AsyncDb.prototype.getFollowedCommunity = function(user_id, fn) {
  // body...
  connection.query('SELECT * FROM following WHERE id_follower = "'+user_id+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        fn(resultts.length > 0, resultts);
      }
    }
  });
};

AsyncDb.prototype.getUserCommunities = function(user, fn) {
  // body...
  connection.query('SELECT * FROM community WHERE creator_id ="'+user+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        fn(resultts.length > 0, resultts);
      }
    }
  });
};

AsyncDb.prototype.getSuggestCommunities = function(user, fn) {
  // body...
  connection.query('SELECT * FROM community WHERE creator_id <> "'+user+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        fn(resultts.length > 0, resultts);
      }
    }
  });
};

AsyncDb.prototype.getTagList = function(fn) {
  // body...
  connection.query('SELECT * FROM hashtag', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(resultts.length > 0, resultts);
    }
  });
};

AsyncDb.prototype.getGroupCreator = function(groupNumber, fn) {
  // body...
  connection.query('SELECT * FROM member WHERE num_group = "'+ groupNumber +'" AND is_creator ='+1, function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        fn(resultts.length > 0, resultts[0]);
      }
    }
  });
};

AsyncDb.prototype.getGroupInfos = function(groupNumber, lang, fn) {
  // body...
  var q;
  if(lang == 'fr')
    q = 'SELECT id, DATE_FORMAT(date_creation, \'le %d/%m/%Y à %H:%i\') as date FROM groupe WHERE numero = "'+groupNumber+'"';
  else if(lang == 'en')
    q = 'SELECT id, DATE_FORMAT(date_creation, \'on %Y-%m-%d at %H:%i\') as date FROM groupe WHERE numero = "'+groupNumber+'"';
  connection.query(q, function (error, resultat){
    if(error){
        console.log(error);
        fn(false);
    }else{
      if(resultat.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultat));
        fn(true, resultat[0]);
      }else{
        fn(false);
      }
    }
  });
};

AsyncDb.prototype.getGroupInfosById = function(id, fn) {
  // body...
  var q = 'SELECT * FROM groupe WHERE id = "'+id+'"';
  connection.query(q, function (error, resultat){
    if(error){
        console.log(error);
        fn(false);
    }else{
      if(resultat.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultat));
        fn(true, resultat[0]);
      }else{
        fn(false);
      }
    }
  });
};

AsyncDb.prototype.getGroupMembers = function(groupNumber, user_id, fn) {
  // body...
  var tmpMembers = [];
  connection.query('SELECT * FROM member WHERE num_group = "'+ groupNumber +'" AND user_id <> "'+user_id+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      if(resultts.length > 0){
        //fileUtils.logger(fileUtils.stringifyJSON(resultts));
        for (var i = 0; i < Object.keys(resultts).length; i++) {
          //fileUtils.logger(resultat[i]);
          instance.getUserInfoById(resultts[i].user_id, function(found, userInfo){
            if(found){
              //fileUtils.logger(userInfo['last_name']+' '+userInfo['first_name']);
              tmpMembers.push(userInfo['last_name']+' '+userInfo['first_name']+','+userInfo['email']+','+userInfo['id']+','+groupNumber);
            }
          });
        }
        setTimeout(function() {
          fn(true, tmpMembers, resultts)
        }, 3000);
      }else{
        fn(false);
      }
    }
  });
};

AsyncDb.prototype.getUserInvitation = function(id, fn) {
  // body...
  connection.query('SELECT * FROM invitation WHERE receiver_id = "'+id+'" AND status <> "rejected" ORDER BY id desc', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        //fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, result);
      }else{
        fn(false, 0);
      }
    }
  });
};

AsyncDb.prototype.getUserNotification = function(id, fn) {
  // body...
  connection.query('SELECT * FROM notification WHERE id_to = "'+id+'" ORDER BY id desc', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, result);
      }else{
        fn(false, 0);
      }
    }
  });
};

AsyncDb.prototype.getUserGroups = function(usernumber, fn) {
  // body...
  var groups = [];
  var countMemb = [];
  var tmpCount = 0;
  var timer;
  getUserInfo(usernumber, function (value){
    getGroupsNumber(value['id'], function (found, tabLength, numGroup){
      /*fileUtils.logger(numGroup);
      fileUtils.logger(found);*/
      if(found){
        for (var i = 0; i < numGroup.length; i++) {
          //fileUtils.logger(numGroup[i].num_group);
          tmpCount++;
          connection.query('SELECT * FROM groupe WHERE numero = "'+numGroup[i].num_group+'"', function (error, resultat){
            if(error){
                console.log(error)
            }else{
              if(resultat.length > 0){
                console.log(fileUtils.stringifyJSON(resultat));
                  for (var i = 0; i < resultat.length; i++) {
                  groups.push(resultat[i]);
                }
                //if(numGroup.length == resultat.length)
                //fn(true, groups)
              }
            }
          });
          //break;
          getGroupMembersLength(numGroup[i].num_group, value['id'], function(isZong, nombre){
            if(isZong){
              countMemb.push(nombre);
            }
          });
        }
        setTimeout(function() {
          //fn(true, groups)
          if(tmpCount == tabLength){
            fileUtils.logger(tmpCount+' == '+tabLength);
            fileUtils.logger(fileUtils.stringifyJSON(groups));
            fileUtils.logger(fileUtils.stringifyJSON(countMemb));
            clearInterval(timer);
            fn(true, groups, countMemb);
          }else{
            timer = setInterval(function(){
              if(tmpCount == tabLength){
                fileUtils.logger(tmpCount+' == '+tabLength);
                fileUtils.logger(fileUtils.stringifyJSON(groups));
                fileUtils.logger(fileUtils.stringifyJSON(countMemb));
                clearInterval(timer);
                fn(true, groups, countMemb);
              }
            },5000)
          }
        }, 3000);
      }else{
        fn(false);
      }
    })
  });

};

AsyncDb.prototype.getUserInfo = getUserInfo;

AsyncDb.prototype.getUserInfoById = function(id, fn) {
  // body...
  connection.query('SELECT * FROM user WHERE id = "'+id+'"', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        //fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, valu);
      }
    }
  });
};

AsyncDb.prototype.getUserInfoByIdIndex = function(id, index, fn) {
  // body...
  connection.query('SELECT * FROM user WHERE id = "'+id+'"', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        //fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, valu, index);
      }
    }
  });
};

AsyncDb.prototype.getUserList = function(fn) {
    // body...
    connection.query('SELECT * FROM user', function (err, resultts){
        if(err){
            fileUtils.logger(err);
            fn(false);
        }else{
          fn(resultts.length > 0, resultts);
        }
    });
};

AsyncDb.prototype.getGroupProjects = function(id, fn) {
  // body...
  connection.query('SELECT id, name, type, category, group_id, description, range_project, user_id, DATE_FORMAT(date_creation, \' %d-%m-%Y, %H:%i\') as date FROM project WHERE group_id = "'+id+'" ORDER BY id desc', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, result);
      }else{
        fn(false, 0);
      }
    }
  });
};

AsyncDb.prototype.getLastFiveUserProjects = function(id, five, fn) {
  // body...
  var q;
  if(five){
    q = 'SELECT id, name, type, category, group_id, description, range_project, user_id, DATE_FORMAT(date_creation, \' %d-%m-%Y, %H:%i\') as date FROM project WHERE user_id = "'+id+'" ORDER BY id desc LIMIT 5';
  }else{
    q = 'SELECT id, name, type, category, group_id, description, range_project, user_id, DATE_FORMAT(date_creation, \' %d-%m-%Y, %H:%i\') as date FROM project WHERE user_id = "'+id+'" ORDER BY id desc';
  }
  fileUtils.logger(q);
  connection.query(q, function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, result);
      }else{
        fn(false, 0);
      }
    }
  });
};

AsyncDb.prototype.getHomePublicProjects = function(fn) {
  // body...
  connection.query('SELECT * FROM project WHERE range_project = "public" ORDER BY id desc LIMIT 3', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, result);
      }else{
        fn(false, 0);
      }
    }
  });
};

AsyncDb.prototype.getPublicProjects = function(fn) {
  // body...
  connection.query('SELECT * FROM project WHERE range_project = "public" ORDER BY id desc', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn(false);
    }else{
      if(result.length > 0){
        var valu = result[0];
        fileUtils.logger(fileUtils.stringifyJSON(result[0]));
        fn(true, result);
      }else{
        fn(false, 0);
      }
    }
  });
};

AsyncDb.prototype.updatePassword = function(email, newPassword, newHash, fn) {
  // body...
  var update = {password: newPassword, hash:newHash}
  connection.query('UPDATE login SET ? WHERE email = "'+email+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false)
    }else{
        fileUtils.logger('dernier login a été mis à jour avec succès !');
        fn(true)
    }
  });
};

AsyncDb.prototype.updateGroupInfos = function(newName, groupNumber, fn) {
  // body...
  var update = {
    name:newName
  };

  connection.query('UPDATE groupe SET ? WHERE numero = "'+groupNumber+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false);
    }else{
        fileUtils.logger(groupNumber+' a été mis à jour avec succès !');
        fn(true);
    }
  });
};

AsyncDb.prototype.updateInvitationStatus = function(uid, statusText, fn) {
  // body...
var update = {};
if(statusText == 'rejected'){
  update.date_rejected = fileUtils.newDate();
}else if(statusText == 'canceled'){
  update.date_canceled = fileUtils.newDate();
}else if(statusText == 'agreed'){
  update.date_agreed = fileUtils.newDate();
}else if(statusText == 'received'){
  update.date_received = fileUtils.newDate();
}else{
  update.date_sent = fileUtils.newDate();
}
update.status = statusText;

  connection.query('UPDATE invitation SET ? WHERE id = "'+uid+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false);
    }else{
        fileUtils.logger(uid+' a été mis à jour avec succès !');
        fn(true);
    }
  });
};

AsyncDb.prototype.updateNotificationStatus = function(uid, statusText, fn) {
  // body...
  var update = {};
  if(statusText == 'read'){
    update.date_read = fileUtils.newDate();
  }else if(statusText == 'received'){
    update.date_received = fileUtils.newDate();
  }else{
    update.date_sent = fileUtils.newDate();
  }
  update.status = statusText;

  connection.query('UPDATE notification SET ? WHERE id = "'+uid+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false);
    }else{
        fileUtils.logger(uid+' a été mis à jour avec succès !');
        fn(true);
    }
  });
};

AsyncDb.prototype.updateUserInfo = function(json, fn) {
  // body...
  var mise  = {
    first_name: json.name,
    last_name: json.lastname,
    date_birth: json.dateBirth,
    place_birth: json.placeBirth,
    country: json.country,
    user_skills: json.skills
  };

  connection.query('UPDATE user SET ? WHERE email = "'+json.email+'"', mise, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false)
    }else{
        fileUtils.logger(json.email+' a été mis à jour avec succès !');
        fn(true)
    }
  });
};

AsyncDb.prototype.userChecker = function(email, fn) {
  // body...
  connection.query('SELECT * FROM login WHERE email = "'+email+'"', function(error, result){
    if (!error) {
      fileUtils.logger(result.length)
      fn(result.length > 0);
    }else{
      fn(false);
      fileUtils.logger(error)
    }
  });
};

/*End*/

function addLogin (json, fn) {
  // body...
  connection.query('INSERT INTO login SET ?', json, function (err, result){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
};

function checkTag(tag, fn) {
  // body...
  connection.query('SELECT * FROM hashtag WHERE hashtag = "'+tag+'"', function(error, result){
    if (error) {
      fn(false);
      fileUtils.logger(error);
    }else{
      fileUtils.logger(result.length);
      fn(result.length > 0);
    }
  });
};

function getCommunityTags(id, fn) {
  // body...
  connection.query('SELECT * FROM hashtag WHERE id = "'+id+'"', function(error, result){
    if (error) {
      fn(false);
      fileUtils.logger(error);
    }else{
      fileUtils.logger(result.length);
      fn(result.length > 0, result[0].hashtag);
    }
  });
};

function deleteUserInfo (id, fn) {
  // body...
  connection.query('DELETE FROM user WHERE id = "'+id+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
}

function deleteMember (id, fn) {
  // body...
  connection.query('DELETE FROM member WHERE id = "'+id+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
}

function deleteProject (id, fn) {
  // body...
  connection.query('DELETE FROM project WHERE id = "'+id+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
}

function deleteUserGroups (email, fn) {
  // body...
  connection.query('DELETE FROM member WHERE email = "'+email+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
}

function deleteUserLogin (email, fn) {
  // body...
  connection.query('DELETE FROM login WHERE email = "'+email+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
}

function deleteUserProjects (email, fn) {
  // body...
  connection.query('DELETE FROM project WHERE email = "'+email+'"', function(err, resultat){
    if(err){
      fn(false);
    }else{
      fn(true);
    }
  });
}
function getGroupsNumber (number, fn) {
  // body...
  var tmpTab = [];
  connection.query('SELECT * FROM member WHERE user_id = "'+ number +'"', function (err, resultts){
      if(err){
          console.log(err)
      }else{
          if(resultts.length > 0){
            //fileUtils.logger(fileUtils.stringifyJSON(resultts));
            fileUtils.logger('length -> '+resultts.length);
            fn(true, resultts.length, resultts);
            /*for (var i = 0; i < resultts.length; i++) {
              fileUtils.logger(resultts[i].num_groupe);
              tmpTab.push(resultts[i].num_groupe);
            }*/
            //fn(true, tmpTab);
          }else{
            fn(false);
          }
      }
  });
}
function getLastIdPrj (fn) {
  // body...
  var lastIdms = '';
  q = "SELECT * FROM project ORDER BY id DESC LIMIT 1";
  var enVie = connection.query(q ,function(err, isBe){
    var idGet = '';
    if(err){
      fileUtils.logger(err);
    }else{
      if(isBe.length > 0){
        var lastIdTab = isBe[0];
        lastIdms = lastIdTab['id']
        fn(lastIdms)
      }
    }
  });
}
function getGroupMembersLength(groupNumber, user_id, fn) {
  // body...
  var tmpMembers = [];
  connection.query('SELECT * FROM member WHERE num_group = "'+ groupNumber +'" AND user_id <> "'+user_id+'"', function (err, resultts){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(true, resultts.length);
    }
  });
}
function getUserInfo (email, fn) {
  // body...
  connection.query('SELECT * FROM user WHERE email = "'+email+'"', function (error, result){
    if(error){
      fileUtils.logger(error);
      fn('error');
    }else{
      if(result.length > 0){
        var valu = result[0];
        fn(valu);
      }else{
        fileUtils.logger(result.length);
        fn('error');
      }
    }
  });
};

function keepAlive () {
  // body...
  var keeping = connection.query('SELECT * FROM user WHERE id = 1', function (err) {
    // body...
    if(err){
      fileUtils.logger(err);
      throw err;
    }else{
      fileUtils.logger('Keep alive worked !');
    }
  });
  setTimeout(function(){
    keepAlive();
  }, 20000);
}

function updateLastLogin (id) {
  // body...
  var update = {last_login: fileUtils.newDate()}
  connection.query('UPDATE user SET ? WHERE id = "'+id+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
    }else{
        fileUtils.logger('dernier login a été mis à jour avec succès !');
    }
  });
}
function deleteCommunityFollowers (id, value, fn) {
  // body...
  var update = {enabled:value};
  connection.query('UPDATE following SET ? WHERE id_community = "'+id+'"', update, function(err, results){
    if(err){
        fileUtils.logger(err);
        fn(false);
    }else{
        fileUtils.logger(id+' a été mis à jour avec succès !');
        fn(true);
    }
  });
}
function updateCommunityFollower(add, id, fn) {
  // body...
  getOldFollowerNumber(id, function(exists, result){
    if(exists){
      fileUtils.logger(result[0].followers);
      var update = {};
      if(add)
        update.followers = parseInt(result[0].followers)+1;
      else
        update.followers = parseInt(result[0].followers)-1;

      fileUtils.logger('ttt -> '+update.followers);
      connection.query('UPDATE community SET ? WHERE id = "'+id+'"', update, function(err, results){
        if(err){
          fileUtils.logger(err);
          fn(false);
        }else{
          fileUtils.logger(id+' a été mis à jour avec succès !');
          fn(true);
        }
      });
    }
  });
}
function getOldFollowerNumber(id, fn) {
  // body...
  connection.query('SELECT followers FROM community WHERE id = "'+id+'"', function(err, res){
    if(err){
      fileUtils.logger(err);
      fn(false);
    }else{
      fn(res.length > 0, res);
    }
  });
}

module.exports = AsyncDb;