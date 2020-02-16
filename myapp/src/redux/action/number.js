export function getIncreAction(){
    return {
        type:'increment'
    }
}
export function getDecreAction(){
    return {
        type:'decrement'
    }
}
export function getSetAction(payload){
    return {
        type:'set',
        payload
    }
}