import {
    addPostActionCreator, deletePostActionCreator,

    InitialStateProfileType, PostType, ProfiledType,
    profileReducer,
} from "./profile-reducer";


let initialState: InitialStateProfileType;

beforeEach(() => {
    initialState = {
        posts: [
            {id: '321sx', message: 'Hi, how are you?', likesCount: 12},
            {id: '2131sxa', message: 'Yo', likesCount: 2},
            {id: '312123', message: 'What you doing?', likesCount: 15},
        ] as Array<PostType>,
        profile: {} as ProfiledType,
        status: "",
        myPhoto: '',
        isLoading: false
    }
})

test('new post should be add', () => {

    let action = addPostActionCreator('test_add')

    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[3].message).toBe('test_add')
})

test('after deleting length of messages should decrement', () => {

    let action = deletePostActionCreator('312123')

    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(2)
})