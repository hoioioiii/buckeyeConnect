Activate Virtual environemnt:
-> source venv/Scripts/activate


Running Docker:
cd into docker folder 
run -> docker compose -f 'backend\docker\docker-compose.yml' up -d --build
then :docker-compose up -d

check docker is running:
run -> docker ps

Some helpful docker commands:
See running containers:
-> docker ps

See all containers:
-> docker ps -a


Stopping a specific container:
-> docker stop <container_name>

Removing a container after stopping it:
- > docker rm <container_id>

Start an existing container:
- > docker start <container_id>

# Stop and remove containers including volumes (fresh start)
docker compose down -v
-------------------------------------

connect to MySQL Workbench

Click '+' to add new connection
Fill in these details:

Connection Name: BuckeyeConnect (or any name)
Hostname: localhost or 127.0.0.1
Port: 3307
Username: user
Password: userpassword


Click "Test Connection" to verify
Click "OK" to save

** iF YOU cant see newly added data, go to server status and click refresh


If You Need to Update Database
bashCopy# Stop containers and remove volumes
docker compose down -v

# Start containers again
docker compose up -d

---------------------------------------------
Elastic search:

May need to run your own certification and connect to it:
docker cp docker-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt ./ca.crt



//------------------------------------------------

How to run:

Open a seperate terminal from the frontend

1. Run docker:

cd into docker folder 
run -> docker compose -f 'backend\docker\docker-compose.yml' up -d --build
then :docker-compose up -d

2. Check Docker is up and running
run -> docker ps


3. Start virtual environment
cd into /backend
run -> source venv/Scripts/activate

4. Install packages
run -> pip install -r requirements.txt

5. Create Elastic search certification (ca.crt)
run -> docker cp docker-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt ./ca.crt
(If getting errors, good chance the path is wrong. Make sure the path is correct in config.py)

6. Run the backend
run -> python run.py
