var Message = React.createClass({

    render:function(){

        return <p>[{this.props.message.get('id')}]<b>{this.props.message.get('user')}: </b>{this.props.message.get('message')}</p>
    }


})
var ChatInput = React.createClass({


    handleInput:function(e){
        if(e.keyCode == 13){
            val = e.target.value
            a = new message_obj({message:val, user:window.username})
            a.save()
            //message_store.push(a)
            e.target.value = ""
        }

    },


    render:function(){
        return (<div className="row message-input" >
                <div className="col-xs-12">
                <input placeholder="schreib was" className="col-xs-12" type="txt" onKeyDown={this.handleInput}/>
                </div>
                </div>
                )
    }



});

var ChatApp = React.createClass({
    componentDidMount:function(){
        this.props.store.on('change', function(){
            this.forceUpdate()

        },this);
    },

    render:function(){

        var messages;

        messages = this.props.store.models.map(function(message){
            return <Message message={message}/>
        })


        return (<div>
                <div className="well chat-messages">{messages}</div>
                <ChatInput />
                </div>
                )
    }

})


React.render(<ChatApp store={window.message_store }/>, document.getElementById('chat'));
