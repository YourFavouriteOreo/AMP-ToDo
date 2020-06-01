REQUIRED_PKG="npm"
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG|grep "install ok installed")
echo Checking for $REQUIRED_PKG: $PKG_OK
if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
  sudo apt-get --yes install $REQUIRED_PKG 
fi
echo Node version: `node -v`
echo NPM version: `npm -v`

wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
npm install
cd client
npm install
cd ..
npm run dev