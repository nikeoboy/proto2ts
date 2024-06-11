import { Message } from "./net/Message";
/** Properties of a TestRequest. */
export interface ITestRequest extends Message{

    /** 账号 */
    userId?: (number|null);
}

/** Represents a TestRequest. */
export class TestRequest implements ITestRequest {

    /**
     * Constructs a new TestRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITestRequest){
        Message.setProperties(this,properties);
    }

    /** 账号 */
    public userId: number;
}

/** Properties of a TestReply. */
export interface ITestReply extends Message{

    /** 账号信息 */
    infos?: (string[]|null);
}

/** Represents a TestReply. */
export class TestReply implements ITestReply {

    /**
     * Constructs a new TestReply.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITestReply){
        Message.setProperties(this,properties);
    }

    /** 账号信息 */
    public infos: string[];
}
