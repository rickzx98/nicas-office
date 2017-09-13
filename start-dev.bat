cd server
start "nica-server" cmd /k nf start dev
cd ..
cd app
start "nica-app" cmd /k npm start -s
cd ..