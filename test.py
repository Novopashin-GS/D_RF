import requests
from pprint import pprint

username = 'kek'
password = 'fastdjango'
#url = 'http://127.0.0.1:7000/api-token-auth/'
params = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                        'Chrome/98.0.4758.82 Safari/537.36'}
# response = requests.post(url, params=params, data={'username': username, 'password': password})
# print(response.json())
# 4f7fb00c78d9bc940c3531d8fa3a60e08a386431
url = 'http://127.0.0.1:7000/api/users'
params.update({'Authorization': 'Token 4f7fb00c78d9bc940c3531d8fa3a60e08a386431'})
print(params)
response = requests.get(url, headers=params)
pprint(response.json()['results'])
