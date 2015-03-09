
class MessageObject extends Backbone.Model
    urlRoot: window.message_backend
    defaults:
        message:''


class MessageStore extends Backbone.Collection
    url: window.message_backend
    urlRoot: window.message_backend

    model: MessageObject



window.username = prompt("Wie ist dein Name?");

window.message_obj = MessageObject
window.message_store = new MessageStore()
window.message_store.fetch()

window.setInterval(->
        window.message_store.fetch()
    ,1000)