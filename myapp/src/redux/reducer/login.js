const initialState = {
    name:'',
    password:null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'modify':
        return { ...state, ...payload }
    default:
        return state
    }
}
