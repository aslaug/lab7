var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var title = form_data.project_title;
  var date = new Date();
  var summary = form_data.summary;
  var imageurl = form_data.image_url;

  var newProject = new models.Project({
  "title": title,
  "date": Date,
  "summary": summary,
  "image": imageurl
  });

  newProject.save(afterSaving);

  function afterSaving(err){
    if(err){
      console.log(err);
      res.send(500);
    }
    res.redirect('/');
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
  .find({"_id": projectID})
    .remove()
    .exec(afterRemoving);

  function afterRemoving(err) {
    if(err) {
      console.log(err);
      res.send(500);
    }
  }
}