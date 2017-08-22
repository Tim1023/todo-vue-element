
<template>
    <div class="km-todolist">

        <ul id="todoList">
            <transition-group
                    name="staggered-fade"
                    tag="ul"
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
            >
            <todo-item v-for="(todo,index) in filterTodos" :todos="todos" :todo="todo" :index="index" :key="index"></todo-item>
            </transition-group>
        </ul>

    </div>
</template>
<script>
    import TodoItem from './TodoItem.vue'
    let filter = {
        all:function(todos){
            return todos;
        },
        active:function(todos){
            return todos.filter(function(todo){
                return !todo.completed
            })
        },
        completed:function(todos){
             return todos.filter(function(todo){
                return todo.completed
            })
        },
    }
    export default {
        name : 'todo-list',
        props : ['todos','filter'],
        computed : {
            filterTodos(){
                return filter[this.filter](this.todos)
            }
        },
        components : {
            TodoItem
        },
        methods: {
            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 1, height: '1.6em' },
                        { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 0, height: 0 },
                        { complete: done }
                    )
                }, delay)
            }
        }
    }
</script>

<style lang="sass">

    #todoList{
        max-height: 350px;
        position: relative;
        padding: 0 20px 0 5px;
    }
        .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #20A0FF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
</style>