@echo off

NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
	echo This setup needs admin permissions. Please run this file as admin.
	pause
	exit
)

echo INSTALLING packages ...
call npm install epicgames-client --save
call npm install epicgames-fortnite-client --save  
call npm install loadsh --save
cd %SETUP_DIR%
echo DONE!