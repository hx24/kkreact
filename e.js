// Component
setState(nextState,callback){
// 添加异步队列 不是每次都更新
    this.$updater.addCallback(callback);
    this.$updater.addState(nextState);
}
// updater
addState(nextState){
    if (nextState) {
// 放入更新队列
        this.pendingStates.push(nextState)
// 如果当前队列没有工作则直接更新
        if (!this.isPending) {
            this.emitUpdate()
        }
    }
}
emitUpdate(nextProps, nextContext){
    this.nextProps = nextProps
    this.nextContext = nextContext
    // receive nextProps!! should update immediately
    nextProps || !updateQueue.isPending
        ? this.updateComponent()
        : updateQueue.add(this)
}
// updateQueue
add(updater){
    this.updaters.push(updater)
}
batchUpdate(){
    if (this.isPending) {
        return;
    }
    this.isPending = true
    let {updaters} = this
    let updater
    while (updater = updaters.pop()) {
        updater.updateComponent()
    }
    this.isPending = false
}
//updater
updateComponent(){
    let {instance, pendingStates, nextProps, nextContext} = this
    if (nextProps || pendingStates.length > 0) {
// ...
// getState 合并所有的state的数据，一次更新
        shouldUpdate(instance, nextProps, this.getState(), nextContext,
            this.clearCallbacks)
    }
}

function shouldUpdate(component, nextProps, nextState, nextContext, callback) {

// 是否应该更新 判断shouldComponentUpdate生命周期
// ...
    component.forceUpdate(callback)
}

// // Component
// // 跳过所有生命周期执行强制更新
forceUpdate(callback){
// 实际更新组件的函数
    let {$updater, $cache, props, state, context} = this
//...
// 下面才是重点 diff
    let newVnode = renderComponent(this)
    let newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext))
// ...
}