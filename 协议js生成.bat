@echo off
set project=%~dp0
@REM 生成协议js文件
set str=--no-create
set str=%str% --no-encode
set str=%str% --no-decode
set str=%str% --no-convert
set str=%str% --no-delimited
set str=%str% --no-verify
set str=%str% --force-message
set str=%str% --es6
set str=%str% --alternate-comment=true
set str=%str% --force-long

node_modules/.bin/pbjs -t static-module -w commonjs --root game -o game/build/proto.js %str% game-proto/*.proto
call pause
