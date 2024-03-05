<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/add">Add User</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import {RouterLink} from 'vue-router'
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  background-color: #464646;
  position: fixed;
  top: 0;
  left: 0;
  ul {
    display: flex;
    justify-content: flex-start;
    padding: 1rem;
    margin: 0;
    list-style: none;
    li {
      a {
        color: white;
        text-decoration: none;
        margin-left: 1.5rem;
        font-size: 1rem;
        &:hover {
          color: #f1f1f1;
        }
      }
    }
  }
}
</style>
