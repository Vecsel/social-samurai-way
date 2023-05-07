import {create} from "react-test-renderer";
import {ProfileStatus} from "components/Profile/ProfileInfo/ProfileStatus";

describe('ProfileStatus component',()=>{
    test('status from should be in the state',()=>{
        const component = create(<ProfileStatus status='it' updateProfileStatus={()=>{}} />)
        const instance = component.getInstance()
        expect(instance?.props.status).toBe('it')
    })
    test('should be render span',async ()=>{
        const component = create(<ProfileStatus status='it' updateProfileStatus={()=>{}} />)
        const root = component.root
        let span = await root.findAllByType('span')
        expect(span.length).not.toBe(0)
    })
/*    test('should be span correct status',async ()=>{
        const component = create(<ProfileStatus status='it' updateProfileStatus={()=>{}} />)
        const root = component.root
        let span = await root.find()
        expect(span.children[0]).toBe('it')
    })*/
    test('should be render input',async ()=>{
        const component = create(<ProfileStatus status='it' updateProfileStatus={()=>{}} />)
        const root = component.root
        let input = await root.findAllByType('input')
        expect(input.length).toBe(0)
    })
    test('input should be displayed in editMode',async ()=>{
        const component = create(<ProfileStatus status='it' updateProfileStatus={()=>{}} />)
        const root = component.root
        let span = await root.findByType('span')
        span.props.onDoubelClick()
        let input = await root.findByType('input')
        expect(input.props.value).toBe('it')
    })
    test('callback should be called',async ()=>{
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='it' updateProfileStatus={mockCallback} />)
        const instance = component.getInstance()
        // @ts-ignore
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})
