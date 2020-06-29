// import React from 'react';
// import ReactDom from 'react-dom';

import React,{Component} from './kreact';
import ReactDom from './kreact-dom';

function Comp(props) {
    return <h2>hi {props.name}</h2>;
}

class Comp2 extends Component{
    render(){
        return (
            <div>
                comp2
            </div>
        )
    }
}
const foo='bar';

const user=[
    {name:'sofiya'},
    {name:'tom'},
]
const jsx=(
    <div id='demo' className={foo}>
        <span>hi</span>
        <Comp name='函数组件'></Comp>
        <Comp2 name='类组件'></Comp2>
        {user.map(u=>(<div>{u.name}</div>))}
    </div>
);
//jsx -> React.createElement -> vdom

console.log(jsx);

ReactDom.render(jsx,document.querySelector('#root'));


