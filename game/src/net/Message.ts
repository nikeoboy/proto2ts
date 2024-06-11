/**
 * Protobuf 协议接口
 */
export class Message {
    /**
     * 协议号
     */
    PROTO_ENUM?: (string | null);

    /**
     * 返回码，标记命令是否成功，失败原因等 成功
     */
    RESULT_CODE?: number;

    /**
     * 设置属性
     * @param target
     * @param properties
     */
    static setProperties(target: any, properties?: any): any {
        if (properties) {
            for (let keys: string[] = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) {
                    target[keys[i]] = properties[keys[i]];
                }
            }
        }
        return target;
    }
}

export class EmptyMessage {
    constructor() {
        throw new Error("EmptyMessage cannot be construction!");
    }
}