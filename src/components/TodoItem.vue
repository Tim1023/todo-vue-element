<template>
    <li :class="{complete:todo.completed}">
        <el-checkbox v-model="todo.completed"></el-checkbox>
        <span v-show="todo.editable == false" @click="handleClick(todo)">{{todo.value}}</span>

        <el-form :model="todo" :rules="rules" @submit.native.prevent ref="todo" class="demo-ruleForm"
                 style="display: inline-block">
            <el-form-item prop="value">

                <el-input v-show="todo.editable" :autofocus="todo.editable" style="width: 80%; "
                          :ref="todo.id.toString()" v-model="todo.value" @blur="submitForm('todo')"
                          @keyup.enter.native="submitForm('todo')"
                ></el-input>
            </el-form-item>

        </el-form>
        <i class="el-icon-close" @click="removeTodo(index)"></i>

    </li>
</template>
<script>
    export default {
        name: 'todo-item',
        props: ['todo', 'todos', 'index'],
        data() {
            return {
                rules: {
                    value: [
                        {required: true, message: 'Please type your todo', trigger: 'blur'},
                        {min: 3, message: 'Length at least 3 characters', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            removeTodo(index) {
                this.todos.splice(this.todos.indexOf(this.todo), 1)
            },
            handleClick(todo) {
                todo.editable = !todo.editable;
                this.$nextTick(() => {
                    this.$refs[todo.id.toString()].$el.querySelector('input').focus()
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("123")
                        this.todo.editable = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="sass" scoped>
    span {
        font-size: 22px;
        line-height: 22px; }
        i {
            float:right;
            margin-right: 15px;
            line-height: 22px;
            font-size: 12px;
            color: #F7BA2A;
    }
        span {
            margin-left: 10px;
            width: 100%;
    }
        li.complete{
            span {
                text-decoration:line-through;
                color:#ddd;
    } }
        li {
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;
            cursor:pointer;
    }
        i {
            display:none;
            opacity: 0.5;
    }
        i:hover{
            opacity: 1;
    }

        li:hover i {
            display:block;
    }

</style>