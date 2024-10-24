<template>
    <div class="loader-container">
        <p>LOADING</p>
        <div class="loader"></div>
    </div>
</template>

<style lang="scss" scoped>
.loader-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: $space-s;
    justify-content: center;
    align-items: center;
    padding: $space-xl $space-xs;
}

p {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 42px;
    font-weight: 1000;
    color: $secondary;
}

.loader {
    width: 15px;
    aspect-ratio: 1;
    position: relative;
}
.loader::before,
.loader::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: $secondary;
}
.loader::before {
    box-shadow: -25px 0 $secondary;
    animation: d8-1 1s infinite linear;
}
.loader::after {
    transform: rotate(0deg) translateX(25px);
    animation: d8-2 1s infinite linear;
}

@keyframes d8-1 {
    100% {
        transform: translateX(25px);
    }
}
@keyframes d8-2 {
    100% {
        transform: rotate(-180deg) translateX(25px);
    }
}
</style>
