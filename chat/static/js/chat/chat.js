// Generated by CoffeeScript 1.6.3
(function() {
  var MessageObject, MessageStore, StateModel, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MessageObject = (function(_super) {
    __extends(MessageObject, _super);

    function MessageObject() {
      _ref = MessageObject.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MessageObject.prototype.urlRoot = window.message_backend;

    MessageObject.prototype.defaults = {
      message: ''
    };

    return MessageObject;

  })(Backbone.Model);

  MessageStore = (function(_super) {
    __extends(MessageStore, _super);

    function MessageStore() {
      _ref1 = MessageStore.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    MessageStore.prototype.url = window.message_backend;

    MessageStore.prototype.urlRoot = window.message_backend;

    MessageStore.prototype.model = MessageObject;

    return MessageStore;

  })(Backbone.Collection);

  StateModel = (function(_super) {
    __extends(StateModel, _super);

    function StateModel() {
      _ref2 = StateModel.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    StateModel.prototype.url = window.message_backend;

    StateModel.prototype.initialize = function() {
      return this.messages = new MessageStore();
    };

    StateModel.prototype.defaults = {
      count: 0
    };

    StateModel.prototype.pare = function(response) {
      if (_.has(response, 'messages')) {
        if (this.messages) {
          this.messages.reset(response.messages);
        } else {
          this.messages = new MessageStore(response.messages);
        }
        delete response.messages;
      }
      return response;
    };

    return StateModel;

  })(Backbone.Model);

  window.username = "jochen";

  window.state = new StateModel();

  window.state.fetch();

  window.message_obj = MessageObject;

  window.message_store = window.state.messages;

}).call(this);
