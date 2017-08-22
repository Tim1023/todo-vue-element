<template>
    <div class="footer">
        <el-radio-group v-model="filter">

        <el-radio class="radio" @click.native="setFilter('all')"  label="all">All</el-radio>
        <el-radio class="radio" @click.native="setFilter('active')"  label="active">Active</el-radio>
        <el-radio class="radio" @click.native="setFilter('completed')" label="completed">Completed</el-radio>
        </el-radio-group>

    </div>
</template>
<script>
    import {eventHub} from './EventHub.js'
    export default {
        name : 'todo-footer',
        props : ['filter'],
        methods : {
            setFilter(filter){
                eventHub.$emit('set-filter',filter)
            }
        }
    }
</script>
<style>
    ul li{
        list-style-type: none
    }
    .footer{
        border-top:1px solid #eee;
        padding-top: 10px;
    }
</style>