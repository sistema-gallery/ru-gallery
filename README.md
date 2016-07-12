# Change from scratch

## Prepare
```
git clone git@github.com:sistema-gallery/ru-gallery.git
cd ru-gallery/
npm install
npm install grunt-cli bower
export PATH=$PATH:$PWD/node_modules/.bin
bower install
```

_Make some changes._

```
grunt
```

## Check It
```
pushd dist
python3 -m http.server -b 127.1
popd
```

## Upload
```
pyvenv venv
. venv/bin/activate
pip install ghp-import
ghp-import -p dist
deactivate
```


## Commit changes
```
git commit -am 'Add some changes'
git push
```
