//Models

var Contact = Backbone.Model.extend({
  urlRoot: "http://tiny-starburst.herokuapp.com/collections/contactsjase",

    defaults: {
      "email": "",
      "name": "",
      "phoneNumber": "",
      "twitter": "",
      "linkedin": ""
    }
})

var Contacts = Backbone.Collection.extend({
  url: "http://tiny-starburst.herokuapp.com/collections/contactsjase"
})

///////////////////////////////////////////////////////////////////////

var homeView = Backbone.View.extend({
  template: _.template($('#homeTemplate').html()),

  render: function(){
    this.$el.html(this.template());
  }
});

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

///////////////////////////////////////////////////////////////////////

var contactsList = Backbone.View.extend({
  template: _.template($('#contactListTemplate').html()),
  events: {
    // 'click #expand': 'expand'
  },

  render: function(){
    this.$el.html(this.template({
      contacts: this.collection.toJSON()
    }));
    return this;
  },

  // expand: function(event){
  //   $(event.target).parent().siblings().removeClass('expanded');
  //   $(event.target).parent().toggleClass('expanded');
  //
  //   if(!$(event.target).closest('ul').children().hasClass('expanded')){
  //     event.preventDefault();
  //     router.navigate('contactDetails', {trigger: true});
  //   }
  // }
});

///////////////////////////////////////////////////////////////////////

var contactDetailsView = Backbone.View.extend({
  template: _.template($('#contactDetailTemplate').html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

///////////////////////////////////////////////////////////////////////

var contactsRouter = Backbone.Router.extend({

  routes: {
    "": "home",
    "contacts": "contacts",
    "contacts/:id" : "contactDetails"
  },

  home: function(){
    var view = new homeView();
    view.render();
    $('#mainArea').html(view.$el);
  },

  contacts: function(){
    var view = new contactInputView();
    view.render();
    $('#mainArea').html(view.$el);
  },

  contactDetails: function(id) {

    var view = new contactDetailsView({
      model: new Contact({
        id: id
      })
    });
    view.model.fetch().then(function(){
      view.render();
      $('#mainArea').html(view.$el);
    });
  }
});

///////////////////////////////////////////////////////////////////////
function buildSidebar(){
  var collection = new Contacts();
  var sidebarView = new contactsList({
    collection: collection
  });

  collection.fetch({
    success: function(){
      sidebarView.render();
      $('#sideBar').html(sidebarView.el);
    }
  });
}


buildSidebar();

var router = new contactsRouter();
Backbone.history.start();
