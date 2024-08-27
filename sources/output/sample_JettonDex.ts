import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type SwapRequest = {
    $$type: 'SwapRequest';
    amount: bigint;
    fromJetton: Address;
}

export function storeSwapRequest(src: SwapRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(579702569, 32);
        b_0.storeUint(src.amount, 32);
        b_0.storeAddress(src.fromJetton);
    };
}

export function loadSwapRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 579702569) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    let _fromJetton = sc_0.loadAddress();
    return { $$type: 'SwapRequest' as const, amount: _amount, fromJetton: _fromJetton };
}

function loadTupleSwapRequest(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _fromJetton = source.readAddress();
    return { $$type: 'SwapRequest' as const, amount: _amount, fromJetton: _fromJetton };
}

function loadGetterTupleSwapRequest(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _fromJetton = source.readAddress();
    return { $$type: 'SwapRequest' as const, amount: _amount, fromJetton: _fromJetton };
}

function storeTupleSwapRequest(source: SwapRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.fromJetton);
    return builder.build();
}

function dictValueParserSwapRequest(): DictionaryValue<SwapRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapRequest(src)).endCell());
        },
        parse: (src) => {
            return loadSwapRequest(src.loadRef().beginParse());
        }
    }
}

export type AddJetton = {
    $$type: 'AddJetton';
    amount: bigint;
}

export function storeAddJetton(src: AddJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3034418276, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadAddJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3034418276) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'AddJetton' as const, amount: _amount };
}

function loadTupleAddJetton(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddJetton' as const, amount: _amount };
}

function loadGetterTupleAddJetton(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddJetton' as const, amount: _amount };
}

function storeTupleAddJetton(source: AddJetton) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAddJetton(): DictionaryValue<AddJetton> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddJetton(src)).endCell());
        },
        parse: (src) => {
            return loadAddJetton(src.loadRef().beginParse());
        }
    }
}

export type JettonDex$Data = {
    $$type: 'JettonDex$Data';
    owner: Address;
    jettonABalance: bigint;
    jettonBBalance: bigint;
    jettonAAddress: Address;
    jettonBAddress: Address;
}

export function storeJettonDex$Data(src: JettonDex$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.jettonABalance, 32);
        b_0.storeUint(src.jettonBBalance, 32);
        b_0.storeAddress(src.jettonAAddress);
        b_0.storeAddress(src.jettonBAddress);
    };
}

export function loadJettonDex$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _jettonABalance = sc_0.loadUintBig(32);
    let _jettonBBalance = sc_0.loadUintBig(32);
    let _jettonAAddress = sc_0.loadAddress();
    let _jettonBAddress = sc_0.loadAddress();
    return { $$type: 'JettonDex$Data' as const, owner: _owner, jettonABalance: _jettonABalance, jettonBBalance: _jettonBBalance, jettonAAddress: _jettonAAddress, jettonBAddress: _jettonBAddress };
}

function loadTupleJettonDex$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _jettonABalance = source.readBigNumber();
    let _jettonBBalance = source.readBigNumber();
    let _jettonAAddress = source.readAddress();
    let _jettonBAddress = source.readAddress();
    return { $$type: 'JettonDex$Data' as const, owner: _owner, jettonABalance: _jettonABalance, jettonBBalance: _jettonBBalance, jettonAAddress: _jettonAAddress, jettonBAddress: _jettonBAddress };
}

function loadGetterTupleJettonDex$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _jettonABalance = source.readBigNumber();
    let _jettonBBalance = source.readBigNumber();
    let _jettonAAddress = source.readAddress();
    let _jettonBAddress = source.readAddress();
    return { $$type: 'JettonDex$Data' as const, owner: _owner, jettonABalance: _jettonABalance, jettonBBalance: _jettonBBalance, jettonAAddress: _jettonAAddress, jettonBAddress: _jettonBAddress };
}

function storeTupleJettonDex$Data(source: JettonDex$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.jettonABalance);
    builder.writeNumber(source.jettonBBalance);
    builder.writeAddress(source.jettonAAddress);
    builder.writeAddress(source.jettonBAddress);
    return builder.build();
}

function dictValueParserJettonDex$Data(): DictionaryValue<JettonDex$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonDex$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonDex$Data(src.loadRef().beginParse());
        }
    }
}

 type JettonDex_init_args = {
    $$type: 'JettonDex_init_args';
    owner: Address;
    jettonAAddress: Address;
    jettonBAddress: Address;
}

function initJettonDex_init_args(src: JettonDex_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonAAddress);
        b_0.storeAddress(src.jettonBAddress);
    };
}

async function JettonDex_init(owner: Address, jettonAAddress: Address, jettonBAddress: Address) {
    const __code = Cell.fromBase64('te6ccgECFQEABAIAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCEQQFAgEgDA0D9AGSMH/gcCHXScIflTAg1wsf3iCCELTdjGS6jp0w0x8BghC03YxkuvLggdMfATH4QW8kECNfA9s8f+AgghAijY8puo61MNMfAYIQIo2PKbry4IHTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH/gBgcIAOLI+EMBzH8BygBVQFBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssfyx9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVABe+EFvJBAjXwMngRFNAscF8vRTMMcFkzAUoI4SUiDHBZIToJcwgXkD8vAC4kAT4gMArFMwxwWOHjCBeLVTFbvy9FMwqCWpBIIA1G9TFbvy9FBVoVA0oI4uUiDHBY4dgVo9UxS78vRTQKgkqQSCANEMUxa78vRQRKFQQ6CXMIElofLwA+JDE+ICAWaCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAJATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAoByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsACwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRvFq+2ebZ42KMEQ4CA5oYDxAAAiMAD6L7tRNDSAAGAg+gi2zzbPGxRhESAfbtRNDUAfhj0gABjmn6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf0x/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgVFEMwbBXg+CjXCwoTAAIiAdiDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwA9FY2zwUAAhwUgIT');
    const __system = Cell.fromBase64('te6cckECFwEABAwAAQHAAQEFoHy7AgEU/wD0pBP0vPLICwMCAWIEDQN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLgghMFDAP0AZIwf+BwIddJwh+VMCDXCx/eIIIQtN2MZLqOnTDTHwGCELTdjGS68uCB0x8BMfhBbyQQI18D2zx/4CCCECKNjym6jrUw0x8BghAijY8puvLggdMf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+AGBwgAXvhBbyQQI18DJ4ERTQLHBfL0UzDHBZMwFKCOElIgxwWSE6CXMIF5A/LwAuJAE+IDAKxTMMcFjh4wgXi1UxW78vRTMKglqQSCANRvUxW78vRQVaFQNKCOLlIgxwWOHYFaPVMUu/L0U0CoJKkEggDRDFMWu/L0UEShUEOglzCBJaHy8APiQxPiAgFmghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwCQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwKAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwA4sj4QwHMfwHKAFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSyx/LH1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UAgEgDhACEbxavtnm2eNijBMPAAIjAgOaGBESAA+i+7UTQ0gABgIPoIts82zxsUYTFgH27UTQ1AH4Y9IAAY5p+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9Mf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFRRDMGwV4Pgo1wsKFAHYgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMAPRWNs8FQAIcFICEwACIm9s0lQ=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initJettonDex_init_args({ $$type: 'JettonDex_init_args', owner, jettonAAddress, jettonBAddress })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const JettonDex_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    9633: { message: `Unsupported jetton address for swap` },
    23101: { message: `Insufficient Jetton B balance` },
    30901: { message: `Insufficient Jetton A balance` },
    30979: { message: `Unsupported jetton address` },
    53516: { message: `Insufficient Jetton A for swap` },
    54383: { message: `Insufficient Jetton B for swap` },
}

const JettonDex_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SwapRequest","header":579702569,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"fromJetton","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddJetton","header":3034418276,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"JettonDex$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonABalance","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"jettonBBalance","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"jettonAAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonBAddress","type":{"kind":"simple","type":"address","optional":false}}]},
]

const JettonDex_getters: ABIGetter[] = [
    {"name":"getJettonABalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getJettonBBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const JettonDex_getterMapping: { [key: string]: string } = {
    'getJettonABalance': 'getGetJettonABalance',
    'getJettonBBalance': 'getGetJettonBBalance',
}

const JettonDex_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"AddJetton"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SwapRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class JettonDex implements Contract {
    
    static async init(owner: Address, jettonAAddress: Address, jettonBAddress: Address) {
        return await JettonDex_init(owner, jettonAAddress, jettonBAddress);
    }
    
    static async fromInit(owner: Address, jettonAAddress: Address, jettonBAddress: Address) {
        const init = await JettonDex_init(owner, jettonAAddress, jettonBAddress);
        const address = contractAddress(0, init);
        return new JettonDex(address, init);
    }
    
    static fromAddress(address: Address) {
        return new JettonDex(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  JettonDex_types,
        getters: JettonDex_getters,
        receivers: JettonDex_receivers,
        errors: JettonDex_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: AddJetton | SwapRequest | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddJetton') {
            body = beginCell().store(storeAddJetton(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SwapRequest') {
            body = beginCell().store(storeSwapRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetJettonABalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getJettonABalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetJettonBBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getJettonBBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}