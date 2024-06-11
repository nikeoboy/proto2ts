@echo off
set project=%~dp0
@REM 生成协议ts文件
node_modules/.bin/pbts -o game/src/proto.ts game/build/proto.js
call pause