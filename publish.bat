rem @echo off
setlocal

set PUBLISH_DIR=%TEMP%\publish

call git checkout master

rd /s /q %PUBLISH_DIR%
mkdir %PUBLISH_DIR%
mkdir %PUBLISH_DIR%\css
mkdir %PUBLISH_DIR%\img
mkdir %PUBLISH_DIR%\js
copy index.html %PUBLISH_DIR%
xcopy /s css\* %PUBLISH_DIR%\css
xcopy /s img\* %PUBLISH_DIR%\img
xcopy /s js\* %PUBLISH_DIR%\js

call git checkout gh-pages

xcopy /s /y %PUBLISH_DIR%\* .

call git add .
call git commit -m "Updated site"
call git push origin gh-pages

call git checkout master

endlocal