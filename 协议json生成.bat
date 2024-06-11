@echo off
set project=%~dp0
@REM 生成协议json文件
@REM 对于生产环境，建议将所有 .proto 文件捆绑到一个 .json 文件中，这样可以最大限度地减少网络请求数量并避免任何解析器开销（提示：仅适用于 light 库）：
node_modules/.bin/pbjs -t json game-proto/*.proto > game/config/proto.json
call pause