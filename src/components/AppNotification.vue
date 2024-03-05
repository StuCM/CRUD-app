<script setup>
defineProps({
    message: String
});
</script>

<template>
    <div class="notification">
        <p>{{ message }}</p>
    </div>
</template>

<style lang="scss" scoped>
.notification {
    width: 100%;
    padding: 1rem;
    color: rgb(255, 255, 255);
    background-color: #0ac587;
    border: 2px solid #08aa74;
    border-radius: 20px;
    transition: all 1s;
}
</style>
