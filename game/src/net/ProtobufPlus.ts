/**
 * Protobuf 扩展
 */
import {EmptyMessage, Message} from "./Message";
import {NetManager} from "./NetManager";

protobuf.Type.generateConstructor = function (mtype) {
    return function () {
        return EmptyMessage;
    }
};
let _protoType: any = protobuf.Type.prototype;
_protoType.create = function (properties?: { [k: string]: any }) {
    let obj = NetManager.getMsgInst(this.fullName);
    let fields: protobuf.Field[] = this.fieldsArray;
    for (let field of fields) {
        field.resolve();
        obj[field.name] = field.defaultValue;
    }
    obj.$type = this;
    Message.setProperties(obj, properties);
    return obj;
};
_protoType.encode = function (m: (protobuf.Message<{}> | { [k: string]: any }), w?: protobuf.Writer): protobuf.Writer {
    let types = [];
    for (let i = 0; i < /* initializes */ this.fieldsArray.length; ++i) {
        types.push(this._fieldsArray[i].resolve().resolvedType);
    }

    if (w == null) {
        w = protobuf.Writer.create();
    }
    let mtype: protobuf.Type = this;
    let fields: protobuf.Field[] = mtype.fieldsArray.slice().sort(protobuf.util.compareFieldsById);
    let ref;
    for (let j = 0; j < fields.length; j++) {
        let field = fields[j].resolve(),
            index = mtype['_fieldsArray'].indexOf(field),
            type = field.resolvedType instanceof protobuf.Enum ? "int32" : field.type,
            wireType = protobuf.types.basic[type];
        ref = m[field.name];
        //Map fields
        if (field.map) {
            if (ref != null && m.hasOwnProperty(field.name)) {
                for (let ks = Object.keys(ref), i = 0; i < ks.length; ++i) {
                    let keyType = field['keyType'];
                    if (wireType === undefined) {
                        w.uint32((field.id << 3 | 2) >>> 0).fork()
                            .uint32(8 | protobuf.types.mapKey[keyType])[keyType](ks[i]);
                        types[index].encode(ref[ks[i]], w.uint32(18).fork()).ldelim().ldelim();
                    } else {
                        w.uint32((field.id << 3 | 2) >>> 0).fork()
                            .uint32(8 | protobuf.types.mapKey[keyType])[keyType](ks[i])
                            .uint32(16 | wireType)[type](ref[ks[i]]).ldelim();
                    }
                }
            }
        }
        //Repeated fields
        else if (field.repeated) {
            if (ref != null && ref.length) {
                if (field.packed && protobuf.types.packed[type] !== undefined) {
                    let v1 = (field.id << 3 | 2) >>> 0;
                    w.uint32(v1).fork();
                    for (let i = 0; i < ref.length; ++i)//", ref)
                        w[type](ref[i])
                    w.ldelim()
                } else {
                    for (let i = 0; i < ref.length; ++i) {
                        if (wireType === undefined) {
                            if (field.resolvedType['group']) {
                                let v1 = (field.id << 3 | 3) >>> 0;
                                let v2 = (field.id << 3 | 4) >>> 0;
                                types[index].encode(ref[i], w.uint32(v1)).uint32(v2)//", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
                            } else {
                                let v1 = (field.id << 3 | 2) >>> 0;
                                types[index].encode(ref[i], w.uint32(v1).fork()).ldelim()//", fieldIndex, ref, (field.id << 3 | 2) >>> 0
                            }
                        } else {
                            let v1 = (field.id << 3 | wireType) >>> 0;
                            w.uint32(v1)[type](ref[i]);
                        }
                    }
                }
            }
        } else {
            if (field.optional) {
                if (ref != null && m.hasOwnProperty(field.name)) {
                    if (wireType === undefined) {
                        if (field.resolvedType['group']) {
                            let v1 = (field.id << 3 | 3) >>> 0;
                            let v2 = (field.id << 3 | 4) >>> 0;
                            types[index].encode(ref, w.uint32(v1)).uint32(v2);
                        } else {
                            let v1 = (field.id << 3 | 2) >>> 0;
                            types[index].encode(ref, w.uint32(v1).fork()).ldelim();
                        }
                    } else {
                        let v1 = (field.id << 3 | wireType) >>> 0;
                        w.uint32(v1)[type](ref);
                    }
                }
            }
        }
    }
    return w;
};

_protoType.toObject = function toObject(message, options) {
    let obj: any = {};
    let fields: protobuf.Field[] = this.fieldsArray;
    for (let field of fields) {
        if (message[field.name]) {
            obj[field.name] = message[field.name];
        }
    }
    return obj;
};

_protoType.decode = function (r: (protobuf.Reader | Uint8Array), l?: number): protobuf.Message<{}> {
    let mtype: any = this;
    let types = {};
    let ids = {};
    let fields: protobuf.Field[] = mtype.fieldsArray.slice().sort(protobuf.util.compareFieldsById);
    let i: number = 0;
    for (i = 0; i < fields.length; ++i) {
        types[fields[i].id] = fields[i].resolve().resolvedType;
        ids[fields[i].id] = fields[i];
    }
    if (!(r instanceof protobuf.Reader)) {
        r = protobuf.Reader.create(r);
    }

    var c = l === undefined ? r.len : r.pos + l, m = this.create();
    let k: any;
    while (r.pos < c) {
        let t = r.uint32();
        if (mtype.group) {
            if ((t & 7) === 4)
                break;
        }

        let id = t >>> 3;
        let field: any = ids[id];
        if (field) {
            field = field.resolve();
            let type = field.resolvedType instanceof protobuf.Enum ? "int32" : field.type;
            let ref = m[field.name];
            //map
            if (field.map) {
                r.skip().pos++;//assumes id 1 + key wireType
                if (ref === protobuf.util.emptyObject) {
                    ref = {};
                }
                k = r[field.keyType]();
                r.pos++;//assumes id 2 + value wireType
                if (protobuf.types.long[field.keyType] !== undefined) {
                    if (protobuf.types.basic[type] === undefined)
                        ref[typeof k === "object" ? protobuf.util.longToHash(k) : k] = types[id].decode(r, r.uint32());
                    else
                        ref[typeof k === "object" ? protobuf.util.longToHash(k) : k] = r[type]();
                } else {
                    if (protobuf.types.basic[type] === undefined)
                        ref[k] = types[id].decode(r, r.uint32()); // can't be groups
                    else
                        ref[k] = r[type]();
                }
            }
            //Array
            else if (field.repeated) {
                if (!(ref && ref.length))
                    ref = [];

                // Packable (always check for forward and backward compatiblity)
                if (protobuf.types.packed[type] !== undefined) {
                    if ((t & 7) === 2) {
                        var c2 = r.uint32() + r.pos;
                        while (r.pos < c2)
                            ref.push(r[type]());
                    }
                } else {
                    // Non-packed
                    if (protobuf.types.basic[type] === undefined) {
                        if (field.resolvedType.group) {
                            ref.push(types[id].decode(r));
                        } else {
                            ref.push(types[id].decode(r, r.uint32()));
                        }
                    } else
                        ref.push(r[type]());
                }
            } else if (protobuf.types.basic[type] === undefined) {
                if (field.resolvedType.group) {
                    ref = types[id].decode(r);
                } else {
                    ref = types[id].decode(r, r.uint32())
                }
            } else {
                ref = r[type]();
            }

            m[field.name] = ref;
        } else {
            try {
                r.skipType(t & 7);
            } catch (e) {
                console.error("协议解析失败，" + mtype.name + " 协议定义版本前后端不一致！");
            }
            break;
        }
    }

    // Field presence
    for (var rfield of mtype._fieldsArray) {
        if (rfield.required && !m.hasOwnProperty(rfield.name)) {
            let str = "missing required \'" + rfield.name + "\'";
            throw new protobuf.util.ProtocolError(str, {instance: m});
        }
    }
    return m;
};
