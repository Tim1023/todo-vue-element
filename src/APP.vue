<template>
    <div id="app">
        <el-row :gutter="20">
            <el-col :span="6">
                <todo-menu :todos="todos"/>
            </el-col>
            <el-col :span="14">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div class="h1">
                            {{!!todos[currentTable] ? !!todos[currentTable].title?todos[currentTable].title:" ⬅️ ⬅️ ⬅️PLease type your table name❗️❗️❗" : "Please add new TODO table"}}
                        </div>
                        <todo-input v-if="!!todos[currentTable]"></todo-input>
                    </div>

                    <todo-list :todos="!!todos[currentTable]?todos[currentTable].toDos:[] "
                               :filter="filter"></todo-list>

                    <todo-footer :filter="filter"></todo-footer>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import TodoInput from './components/Input.vue';
    import TodoList from './components/TodoList.vue';
    import TodoFooter from './components/TodoFooter.vue';
    import {eventHub} from './components/EventHub.js';
    import Storage from './Storage.js';
    import TodoMenu from './components/Menu.vue';

    export default {
        name: 'app',
        data() {
            return {
                todos: Storage.fetch(),
                filter: 'all',
                currentTable: 0,
                msg: 'Vue2.x+Element   TodoMVC'
            }
        },
        watch: {
            todos: {
                deep: true,
                handler: Storage.store
            }
        },
        created() {
            eventHub.$on('add-todo', this.addTodo)
            eventHub.$on('set-filter', this.setFilter)
            eventHub.$on('change-table', this.changeTable)
            eventHub.$on('delete-table', this.deleteTable)
            if (!!this.todos[this.currentTable]) {
                this.todos.forEach(table => {
                    table.editable = false
                })
                this.todos.forEach(table => {
                    table.toDos.forEach(eachToDo => {
                        eachToDo.editable = false
                    })
                })
            }
        },
        methods: {
            addTodo(newTodo) {
                if (!newTodo) {
                    return;
                }
                this.todos[this.currentTable].toDos.push({
                    id: Math.round(Math.random() * 10000),
                    value: newTodo,
                    completed: false,
                    editable: false
                })
            },
            setFilter(newfilter) {
                this.filter = newfilter
            },
            changeTable(index) {
                this.currentTable = index;
                this.filter = 'all';
            },
            deleteTable(index) {
                this.todos.splice(index, 1)
                this.currentTable = 0

            }
        },


        components: {
            TodoInput,
            TodoList,
            TodoFooter,
            TodoMenu
        }
    }
</script>

<style lang="sass">
    body {
        background-color: #F9FAFC; }
        #app{
            margin: 0 auto;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
        .h1{
            color: #5e6d82;
            font-size: 20px;
            text-align:center;
            padding: 20px 0;
    }

</style>