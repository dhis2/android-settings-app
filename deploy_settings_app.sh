#!/bin/bash

# this is temporary, once moved to bitrise it will be removed
if [ $# -ne 3 ]; then
    echo "Wrong arguments. Usage: ./deploy_settings_app USERNAME PASSWORD SERVER_URL"
    exit -1
fi

USERNAME_DHIS=$1
PASSWORD_DHIS=$2
SERVER_URL=$3
SERVER_URL_LAST_CHAR=${SERVER_URL: -1}

# check every argument is filled
if [[ -z "$USERNAME_DHIS" || -z "$PASSWORD_DHIS" || -z "$SERVER_URL" ]];
then
  echo "USERNAME_DHIS, PASSWORD_DHIS OR SERVER_URL Missing"
  exit -1
else
  echo "Enviroment variables setup"
  echo "SERVER_URL_LAST_CHAR: $SERVER_URL_LAST_CHAR"
fi

# check if the last url character is / if not it will be added
if  [ "$SERVER_URL_LAST_CHAR" = "/" ]
then
    SERVER_URL=${SERVER_URL::-1}
    echo "Removing last character from SERVER_URL"
    echo "$SERVER_URL"
else
    echo "URL is correct ..."
fi

exit 0

# find zip file
cd build
app_file=$(ls *.zip)

# rename zip removing version numbers
mv $app_file dhis2-android-settings-app.zip

# get list of apps
echo "List of apps /api/apps"
curl -X GET -u $USERNAME_DHIS:$PASSWORD_DHIS $SERVER_URL/api/apps

echo -e "\n"

# upload zip to server
echo "Uploading settings app to the server ..."
upload_app_response="$(curl -X POST -u $USERNAME_DHIS:$PASSWORD_DHIS -F file=@dhis2-android-settings-app.zip $SERVER_URL/api/apps)"

if [ -z "$upload_app_response" ]
then
      echo "The Android Settings App was upload successfully"
      exit 0
else
      echo "There was an error uploading the settings app ..."
      echo $upload_app_response
      exit -1
fi

