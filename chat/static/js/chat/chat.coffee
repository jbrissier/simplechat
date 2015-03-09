
class MessageObject extends Backbone.Model
    urlRoot: window.message_backend
    defaults:
        message:''


class MessageStore extends Backbone.Collection
    url: window.message_backend
    urlRoot: window.message_backend

    model: MessageObject


class StateModel extends Backbone.Model
    url: ->
        window.message_backend+"?count="+@.get 'count'
    initialize:->
        @messages = new MessageStore()

    defaults:
        count : 0

    parse: (response)->
        if _.has(response, 'messages')
            if @messages
                @messages.push(response.messages)
                if response.messages.length > 0
                    @messages.trigger('change')

            delete response.messages

        return response




window.username = "jochen"#prompt("Wie ist dein Name?");
window.state = new StateModel()
window.state.fetch()
window.message_obj = MessageObject
window.message_store = window.state.messages

window.setInterval(=>

        window.state.fetch()
    ,1000)

