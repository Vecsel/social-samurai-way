

export let updateObjectInArray=(items:any,itemId:any,objPropName:any, newObjProps:any)=> {
    items.users.map((u:any) => {
        if (u[objPropName] === itemId.userid) {
            return {...u, ...newObjProps}
        }
        return u
    })
}