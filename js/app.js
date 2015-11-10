//Models

var Contact = Backbone.Model.extend({
  url: "http://tiny-starburst.herokuapp.com/collections/contactsjase"
})

var Contacts = Backbone.Collection.extend({
  url: "http://tiny-starburst.herokuapp.com/collections/contactsjase"
})

///////////////////////////////////////////////////////////////////////

var contactInputView = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('#contactInputTemplate').html()),

  events: {
    'click #submitBtn': 'handlerSubmitBtn'
  },

  send: function(){
    var submit = this.$('#submitBtn').val();
      console.log('click');

    var email = this.$('#email').val();
    var name = this.$('#name').val();
    var phoneNumber = this.$('#phoneNumber').val();
    var twitter = this.$('#twitterUsername').val();
    var linkedin = this.$('#linkedin').val();

    var newContact = new Contact ({
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      twitter: twitter,
      linkedin: linkedin
    })
    
    newContact.save();

  },

  render: function(){
    this.$el.html(this.template());
  },

  handlerSubmitBtn: function(event){
    event.preventDefault;
    this.send();
    console.log('testing');
  }

});

var contactsRouter = Backbone.Router.extend({

  routes: {
    "": "contacts"
  },

  contacts: function(){
    var view = new contactInputView();
    view.render();
    $('#mainArea').html(view.$el);
  }
});

var router = new contactsRouter();
Backbone.history.start();
