#from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import json
import redis
# Create your views here.


messages = []
counter = 0


class SimpleMessageChat(APIView):
    channel_key = "channel:list:4711"
    channel_counter = "channel:counter:4711"

    def __init__(self, *args, **kwarg):
        self.redis = redis.StrictRedis(host='localhost')
        super(SimpleMessageChat, self).__init__(*args, **kwarg)

    def get(self, request, *args, **kwargs):

        raw_messages = self.redis.lrange(self.channel_key, -10, -1)
        last_massages = []

        for i in raw_messages:
            last_massages.append(json.loads(i))
        count = self.redis.get(self.channel_counter)
        return Response({'messages':last_massages, 'count': count})

    def post(self, request, *args, **kwargs):

        last_id = self.redis.incrby(self.channel_counter, 1)
        request.data.update({'id': (last_id)})
        self.redis.rpush(self.channel_key, json.dumps(request.data))

        return Response(messages)



