
class MessageObject extends Backbone.Model
    urlRoot: window.message_backend
    defaults:
        message:''


class MessageStore extends Backbone.Collection
    url: window.message_backend
    urlRoot: window.message_backend

    model: MessageObject


class StateModel extends Backbone.Model
    url: window.message_backend
    initialize:->
        @messages = new MessageStore()

    defaults:
        count : 0

    pare: (response)->
        if _.has(response, 'messages')
            if @messages
                @messages.reset(response.messages)
            else
                @messages = new MessageStore(response.messages)

            delete response.messages

        return response




window.username = "jochen"#prompt("Wie ist dein Name?");
window.state = new StateModel()
window.state.fetch()
window.message_obj = MessageObject
window.message_store = window.state.messages


