import { HostRoot } from "./ReactWorkTags";
import { NoFlags } from './ReactFiberFlags';

export function createHostRootFiber(){
    return createFiber(HostRoot)
}

/**
 * 创建fiber节点
 * tag fiber的标签
 * pendingProps 等待生效的属性对象
*/
function createFiber(tag, pendingProps, key){
    return new FiberNode(tag, pendingProps, key)
}

function FiberNode(tag, pendingProps, key){
    this.tag = tag
    this.pendingProps = pendingProps
    this.key = key
}

export function createWorkInProgress(current, pendingProps){
    let workInProgress = current.alternate
    if(!workInProgress){
        workInProgress = createFiber(current.tag, pendingProps, current.key)
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode
        workInProgress.alternate = current
        current.alternate = workInProgress
    } else {
        workInProgress.pendingProps = pendingProps
    }
    workInProgress.flags = NoFlags
    workInProgress.child = null
    workInProgress.sibling = null
    workInProgress.updateQueue = current.updateQueue
    // 在dom diff过程总会给fiber添加副作用
    workInProgress.firstEffect = workInProgress.lastEffect = workInProgress.nextEffect = null
    return workInProgress
}