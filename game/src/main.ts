import {TestMessageReply} from "./proto";

/**
 * Protobuf 协议接口
 */
export class Main {
    static mesa()
    {
        let testMessageReply = new TestMessageReply();
        testMessageReply.content = "";
    }
}