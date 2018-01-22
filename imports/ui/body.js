import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';


import './body.html';

Template.body.helpers({
    tasks(){
        return Tasks.find({}, {sort:{createdAt:-1}});
    },
});
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY HH:mm');
  });
Template.body.events({
    'submit .new-task'(event){
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;


        Tasks.insert({
            text,
            createdAt: new Date(),
        })

        text.target.value = '';
    },
});