# Unreal Union Frontend

## Deployment Docker
cd [Project Folder]

create .env file with the following variable:
VITE_APP_ROOT_API=http://127.0.0.1/api/unreal-union/v1
docker build . -t
docker run -d -p 8080:80 my-app