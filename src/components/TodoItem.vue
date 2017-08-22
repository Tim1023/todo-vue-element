<template>
    <li :class="{complete:todo.completed}" >
        <el-checkbox v-model="todo.completed"></el-checkbox>
        <span v-show="todo.editable == false" @click="handleClick(todo)">{{todo.value}}</span>
        <el-input v-show="todo.editable" :autofocus="todo.editable" style="width: 80%; "
                  :ref="todo.id.toString()" v-model="todo.value" @blur="todo.editable=false"
                  @keyup.enter.native="table.editable=false"
        ></el-input>
        <i class="el-icon-close" @click="removeTodo(index)"></i>
    </li>   
</template>
 <script>
    export default {
        name : 'todo-item',
        props:['todo','todos','index'],
        methods : {
            removeTodo(index){
                this.todos.splice(this.todos.indexOf(this.todo),1)
            },
            handleClick(todo){
                todo.editable=!todo.editable;
                this.$nextTick(() => {
                    this.$refs[todo.id.toString()].$el.querySelector('input').focus()
                })
            }
        }
    }
 </script>
 
 <style lang="sass" scoped>
    span{
        font-size: 22px;
        line-height: 22px;
    }
    i{
        float: right;
        margin-right: 15px;
        line-height: 22px;
        font-size: 12px;
        color: #F7BA2A;
    }
    span{
        margin-left: 10px;
        width: 100%;
    }
    li.complete{
        span{
            text-decoration: line-through;
            color:#ddd;
        }
    }
     li{
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        cursor: pointer;
     }
     i{
         display: none;
         opacity: 0.5;
     }
     i:hover{
         opacity: 1;
     }
    
     li:hover i{
         display: block;
     }

 </style>