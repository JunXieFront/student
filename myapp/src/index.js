import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./redux/index"
function createStore(reducer, initState) {
    let state = initState;
    let listeners = []
    function getState() {
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    function dispatch(action) {
        if (!isPlainObject(action)) {
            throw new TypeError('action must be a plain object')
        }
        if (typeof action.type === undefined) {
            throw new TypeError('action must have a type attribute')
        }
        state = reducer(state, action)
        listeners.forEach(listener => {
            listener()
        })
    }
    dispatch({type: "@@redux/init"})
    return {dispatch, subscribe, getState}
}
function isPlainObject(obj) {
    if (typeof obj !== 'object') {
        return false;
    }
    return Object.getPrototypeOf(obj) === Object.prototype;
}
function applyMiddleWare(...middleWares) {
    return function (createStore) {
        return function (reducer, initState) {
            var store = createStore(reducer, initState)
            var dispatch = () => {
                throw new Error('dispatch can not be called now')
            }
            var simpleStore = {
                getState: store.getState,
                dispatch: store.dispatch
            }
            let dispatchCreators = middleWares.map(middleWare => middleWare(simpleStore))
            console.log(dispatchCreators)
            dispatch = compose(...dispatchCreators)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
// funcs是一组函数，我们需要把参数传给最后一个函数 返回结果传给上一个函数，依此类推直至运行到第一个函数
function compose(...funcs) {
    console.log(funcs)
    return function (...args) {
        let lastVal;
        for (let i = funcs.length - 1; i >= 0; i--) {
            let func = funcs[i];
            if (i === funcs.length - 1) {
                lastVal = func(...args)
            } else {
                lastVal = func(lastVal)
            }
        }
        return lastVal;
    }
}
var log1 = store => next => action => {
    console.log('log1',new Date().getUTCMilliseconds())
    next(action)
    console.log('log1,end')
}
var log2 = store => next => action => {
    console.log('log2',new Date().getUTCMilliseconds())
    next(action)
    console.log('log2,end')
}
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            return state
    }
}
var store = applyMiddleWare(log1, log2)(createStore)(reducer, 10)
store.getState()
store.dispatch({
    type:'increment'
})
store.getState()

ReactDOM.render (<App/>, document.getElementById('root'));
