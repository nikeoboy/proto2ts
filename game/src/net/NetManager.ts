/**
 * 网络连接管理类（长连接）
 */
export class NetManager {
    private static _msgCls: {} = {};
    static protobufRoot: protobuf.Namespace;

    static init()
    {
        let url: string = "game/config/proto.json";
        protobuf.load(url, (error: any, root: protobuf.Namespace)=>{
            if(error)
            {
                return;
            }

            this.protobufRoot = root;

        });
    }

    static getMsgInst(fullName: string) {
        let n = this;
        if (n._msgCls[fullName]) {
            return new n._msgCls[fullName]();
        }
        let srcName: string = fullName;
        fullName = fullName.charAt(0) == "." ? fullName.substring(1) : fullName;
        let sp: string[] = fullName.split(".");
        let temp: any = window;
        while (sp.length > 0) {
            let k = sp.shift();
            if (temp && temp[k]) {
                temp = temp[k];
            } else {
                temp = null;
                break;
            }
        }
        if (temp === window) {
            temp = null;
        }
        if (temp) {
            n._msgCls[srcName] = temp;
        }
        return temp ? new temp() : {};
    }
}
