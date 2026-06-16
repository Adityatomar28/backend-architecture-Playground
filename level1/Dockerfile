FROM node

WORKDIR /app 


#copy src dest
#Theese lines are called layer and docker cache them once u tun them and run faster than prev

# COPY index.js index.js #we have removed the index.js because  and pasted them in last  because if we change something in index.js after that these aer lines are also excecuted which is useless and also taking  more time.
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

#here we have made some changes in index.js  the above layer kept cached 
COPY index.js index.js
#appke folder me jitne bhi folder hai files hai sbh copy hongi
COPY . .

CMD ["node","index.js"]


#DOCKER FILE IS CREATED NOW NEXT STEP IS TO CREATE A DOCKER FILE FROM THESE IMAGES




#...........
#docker container is isolated  therefore we cannot see on that port 
#PORT MAPPING:local machine p mao krdeta hai whi api chalegi local machien p jo continer p chalegi wrna unable too see
#docker run -it -p 8000:3000
#local machine:container port
