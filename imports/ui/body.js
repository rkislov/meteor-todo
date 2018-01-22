import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './tasks.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated(){
   this.state = new ReactiveDict(); 
});

Template.body.helpers({
    tasks(){
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        }
        return Tasks.find({}, {sort:{createdAt: -1}});
    },
    incompletedCount() {
        return Tasks.find({ checked: {$ne: true }} ).count();
    }
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

        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    }
});