const body = document.getElementsByTagName('body')
import { funcNames, varNames } from "./strings"


const funcDec = (call, ...args) =>{
    return `const ${call} = ${args} => {`
}

class CodeBlock {
    constructor(id, text, type) {
        this.children = []
    }
}

let currentBlock = new CodeBlock ('body', '', )

const codeBlocks = []

const randomType = (types) =>{
    return types[Math.floor(Math.random() * types.length)].type
}

const types = [
    { type: 'function', block: true}
]

