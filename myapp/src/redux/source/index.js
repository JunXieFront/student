function createStore(reducer,initState){
    let state = initState;
    let listeners = []
    function getState(){
        return state;
    }
    function subscribe(listener){
        listeners.push(listener);
        return function (){
            const index = listeners.indexOf(listener)
            listeners.splice(index,1)
        }
    }
    function dispatch(action){
        if(!isPlainObject(action)){
            throw new TypeError('action must be a plain object')
        }
        if(typeof action.type === undefined){
            throw new TypeError('action must have a type attribute')
        }
        state = reducer(state,action)
        listeners.forEach(listener => {
            listener()
        })
    }
    dispatch({
        type:"@@redux/init"
    })
    return {
        dispatch,
        subscribe,
        getState,
    }
}
function isPlainObject(obj){
    if(typeof obj !== 'object'){
        return false;
    }
    return Object.getPrototypeOf(obj) === Object.prototype;
}
function bindActionCreators(actionCreators,dispatch){
    if(typeof actionCreators === 'function'){
        return function(payload){
            dispatch(actionCreators(payload))
        }
    }else if(typeof actionCreators === 'object'){
        const bindActions = {}
        let actions = Object.keys(actionCreators)
        for(let action of actions){
            bindActions[action] = function(payload){
                dispatch(actions[action](payload))
            }
        }
        return bindActions;
    }else{
        throw new TypeError('action creators must be a object or a functionS')
    }

}
/**
 * 
 *将多个reducers组成的对象合并成一个新的reducer
 */
function combineReducers(reducers){
    if(!isPlainObject(reducers)){
        throw new TypeError('reducers must be a plain object')
    }
    return function(state = {},action){
        const newState = {}
        const keys = Object.keys(reducers);//获得所有reducer的属性名
        for(let key of keys){
            let reducer = reducers[key]//得到单个独立的reducer
            newState[key] = reducer(state[key],action)
        }
        return newState;
    }
}
function applyMiddleWare(...middleWares){
    return function(createStore){
        return function(reducer,initState){
                var store = createStore(reducer,initState)
                var dispatch = ()=>{
                    throw new Error('dispatch can not be called now')
                }
                var simpleStore = {
                    getState:store.getState,
                    dispatch:store.dispatch
                }
              dispatch = compose(middleWares.map(middleWare => middleWare(simpleStore)))(store.dispatch)
                return {
                    ...store,
                    dispatch
                }
        }
    }
}
// funcs是一组函数，我们需要把参数传给最后一个函数 返回结果传给上一个函数，依此类推直至运行到第一个函数
function compose(...funcs) {
    return function (...args) {
        let lastVal;
        for (let i = funcs.length - 1; i >= 0; i--) {
            let func = funcs[i];
            if(i === funcs.length - 1){
               lastVal =  func(...args)
            }else{
                lastVal = func(lastVal)
            }
        }
        return lastVal;
    }
}
