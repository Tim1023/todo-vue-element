<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">

            <el-menu-item :index="index.toString()" v-for="(table,index) in todos"
                          @click="handleTableClick(table,index)">
                <i :class="table.icon"></i>
                <el-input v-show="table.editable" style="width: 80%" slot="title" :autofocus="table.editable"
                          :ref="table.id.toString()" v-model="table.title" @blur="table.editable=false"
                          @keyup.enter.native="table.editable=false"
                ></el-input>
                <span slot="title" v-show="!table.editable" >

                    {{!!table.title? table.title:"❗️❗️❗️"}}
                    <i v-show="!isCollapse" class="el-icon-close" style="float: right; padding-top: 13%"
                       @click="handleDelete(index)"></i>
                </span>

            </el-menu-item>
            <el-menu-item index="1" @click="addNewTable ">
                <i class="el-icon-plus"></i>

                <span slot="title">Add new table</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleCollapse ">
                <i class="el-icon-setting" v-show="isCollapse"></i>
                <i class="el-icon-close" v-show="!isCollapse"></i>

                <span slot="title" v-show="!isCollapse">Close</span>
                <span slot="title" v-show="isCollapse">Open</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    import {eventHub} from './EventHub.js';

    export default {
        name: 'todo-input',
        props: ['todos'],

        data() {
            return {
                isCollapse: true
            };
        },

        methods: {

            handleCollapse() {
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    this.todos.forEach((eachTable) => eachTable.editable = false);

                }
            },
            addNewTable() {
                let tableAmount = this.todos.length;
                let newId = Math.round(Math.random() * 10000);
                this.isCollapse = false;
                this.todos.forEach((eachTable) => eachTable.editable = false);
                this.todos.push(
                    {id: newId, title: 'New Table', icon: 'el-icon-date', editable: true, toDos: []}
                )

                this.$nextTick(() => {

                    if (!!this.$refs[newId]) {
                        let lastKey = Object.keys(this.$refs[newId]).length - 1

                        console.log(this.$refs[newId])
                        this.$refs[newId][lastKey].$el.querySelector('input').focus()
                    }
                })
                eventHub.$emit('change-table', tableAmount);

            },
            handleTableClick(table, index = 0) {
                eventHub.$emit('change-table', index);

                if (this.isCollapse == false) {
                    table.editable = true;
                    this.$nextTick(() => {
                        this.$refs[table.id.toString()][Object.keys(this.$refs[table.id.toString()]).length - 1].$el.querySelector('input').focus()
                    })

                }


            },

            handleDelete(index) {
                eventHub.$emit('delete-table', index);


            }
        },

    }
</script>

<style lang="sass">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px; }
</style>