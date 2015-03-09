#from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import json
import redis
# Create your views here.


messages = []
counter = 0


class SimpleMessageChat(APIView):
    channel_key = "channel:4711"

    def __init__(self, *args, **kwarg):
        self.redis = redis.StrictRedis(host='localhost')
        super(SimpleMessageChat, self).__init__(*args, **kwarg)

    def get(self, request, *args, **kwargs):
        foo = self.redis.lrange(self.channel_key, -10, -1)
        baa = []

        for i in foo:
            baa.append(json.loads(i))
        return Response(baa)

    def post(self, request, *args, **kwargs):
        global counter
        counter += 1
        request.data.update({'id': counter})
        self.redis.rpush(self.channel_key, json.dumps(request.data))

        return Response(messages)
