/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.game || ($protobuf.roots.game = {});

export const message = $root.message = (() => {

    /**
     * Namespace message.
     * @exports message
     * @namespace
     */
    const message = {};

    message.TestRequest = (function() {

        /**
         * Properties of a TestRequest.
         * @memberof message
         * @interface ITestRequest
         * @property {number|null} [userId] 账号
         */

        /**
         * Constructs a new TestRequest.
         * @memberof message
         * @classdesc Represents a TestRequest.
         * @implements ITestRequest
         * @constructor
         * @param {message.ITestRequest=} [properties] Properties to set
         */
        function TestRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 账号
         * @member {number} userId
         * @memberof message.TestRequest
         * @instance
         */
        TestRequest.prototype.userId = 0;

        return TestRequest;
    })();

    message.TestReply = (function() {

        /**
         * Properties of a TestReply.
         * @memberof message
         * @interface ITestReply
         * @property {Array.<string>|null} [infos] 账号信息
         */

        /**
         * Constructs a new TestReply.
         * @memberof message
         * @classdesc Represents a TestReply.
         * @implements ITestReply
         * @constructor
         * @param {message.ITestReply=} [properties] Properties to set
         */
        function TestReply(properties) {
            this.infos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 账号信息
         * @member {Array.<string>} infos
         * @memberof message.TestReply
         * @instance
         */
        TestReply.prototype.infos = $util.emptyArray;

        return TestReply;
    })();

    return message;
})();

export { $root as default };
