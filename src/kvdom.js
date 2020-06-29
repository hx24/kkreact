//执行和vdom相关的操作
export function initNode(vnode){
    let {vtype}=vnode;
    if(!vtype) {
        //文本节点
        return document.createTextNode(vnode);
    }

    if(vtype===1) {
        //原生标签：div
        return createNativeElement(vnode);
    }else if(vtype==2) {
        //函数组件
        return createFuncComp(vnode);
    }else {
        return createClassComp(vnode);
    }
}

function createNativeElement(vnode){
    const {type,props}=vnode;
    //创建dom
    const node=document.createElement(type);
    //过滤特殊属性
    const {key,children,...rest}=props;
    Object.keys(rest).forEach(k=>{
        //需要特殊处理的htmlFor，className
        if(k==='className') {
            node.setAttribute('class',rest[k]);
        }else if(k==='htmlFor') {
            node.setAttribute('for',rest[k]);
        }else {
            node.setAttribute(k,rest[k]);
        }
    })
    //递归
    children.forEach(c=>{
        if(Array.isArray(c)) {
           c.forEach(n=>node.appendChild(initNode(n)));
        }else {
            node.appendChild(initNode(c));
        }
    })

    return node;
}
function createFuncComp(vnode){
    //此处的type是一个函数
    const {type,props}=vnode;
    const vdom=type(props);
    return initNode(vdom);
}
function createClassComp(vnode){
    //此处的type是一个class
    const {type,props}=vnode;
    const component=new type(props);
    const vdom=component.render();
    return initNode(vdom);
}