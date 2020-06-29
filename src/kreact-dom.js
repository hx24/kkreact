import {initNode} from "./kvdom";

function render(vdom,container) {
    const node=initNode(vdom);
    container.appendChild(node);
}

export default {render}