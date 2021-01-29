<template>
    <div class="check-button">
        <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}" alt="">
    </div>
</template>

<script>
export default {
    name: "CheckButton",
    props: {
        isChecked: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
    .check-button {
        border: 1px solid var(--color-tint);
    }

    .checked {
        border-color: var(--color-tint);
        background-color: var(--color-tint);
    }
</style>