@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d D:\Programming\MZ_Project\portfolio
call "C:\Program Files\nodejs\npm.cmd" run build
call "C:\Program Files\nodejs\npm.cmd" run preview -- --host 0.0.0.0 --port 4173