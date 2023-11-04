const Note = require('../models/Notes');
const mongoose = require('mongoose');

exports.dashboard = async (req,res) => {
    let perPage = 12;
    let page = req.query.page || 1
    const locals = {
        title: 'Dashboard',
        description: 'Note Taking App'
    }

    try {
        const notes = await Note.aggregate([
            {
                $sort:  {
                    createdAt: -1,
                }
            },
            { 
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 100] }
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()

        const count = await Note.count();

        res.render('dashboard/index', { 
            locals,
            notes, 
            layout: '../views/layouts/dashboard',
            current: page,
            pages:Math.ceil(count/perPage)
        });
    } catch (error) {
        console.log(error);
    } 
};

exports.dashboardViewNote = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note) {
      res.render("dashboard/view-note", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Something went wrong.");
    }
  };
  

exports.dashboardUpdateNote = async (req, res) => {
    try {
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
};
  
exports.dashboardDeleteNote = async (req, res) => {
    try {
      await Note.deleteOne({ _id: req.params.id });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
};

exports.dashboardAddNote = async (req, res) => {
    res.render("dashboard/add", {
      layout: "../views/layouts/dashboard",
    });
};
  
exports.dashboardAddNoteSubmit = async (req, res) => {
    try {
      await Note.create(req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
};
  