<template>
    <el-form  :model="ruleForm" :rules="rules" @submit.native.prevent  ref="ruleForm" class="demo-ruleForm" >
        <el-form-item prop="todoItem">
            <el-input  placeholder="Type new todo here" v-model="ruleForm.todoItem"  @keyup.enter.native="submitForm('ruleForm' )" ></el-input>
        </el-form-item>

    </el-form>
</template>

<script>
    import {eventHub} from './EventHub.js';

    export default {
        name: 'todo-input',
        data() {
            return {
                ruleForm: {

                    todoItem: ''
                },
                rules: {
                    todoItem: [
                        {required: true, message: 'Please type your todo', trigger: 'submit'},
                        {min: 3,  message: 'Length at least 3 characters', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        eventHub.$emit('add-todo', this.ruleForm.todoItem);
                        this.ruleForm.todoItem = ''
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        },
    }
</script>

<style lang="sass">

</style>