<script setup>
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
    <nav>
        <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li>
                <RouterLink to="/add">
                    <FontAwesomeIcon class="icon" :icon="faPlus" />
                    Add Customer
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

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
                    color: #888888;
                }
            }
        }
    }
}

.icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
}
</style>
