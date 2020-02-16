const initialState = 0

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'increment':
        return state + 1
    case 'decrement':
        return state - 1;
    case 'set':
        return payload
    default:
        return state
    }
}
