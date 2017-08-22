export default {
    fetch(){
        return JSON.parse(localStorage.getItem('todo-vue2.x') || `[ {"id":1,"title": "Work", "icon": "el-icon-message", "editable": "false","toDos":[]},
                        {"id":2,"title": "Home", "icon": "el-icon-menu", "editable": "false","toDos":[]}]`)
    },
    store(todos){
        localStorage.setItem('todo-vue2.x',JSON.stringify(todos))
    }
}