<template>
    <footer>
        <p>Site créé et complété par <a href="https://www.linkedin.com/in/krobert44/" title="Visiter la page LinkedIn" target="_blank">@Kim Robert</a></p>
        <div class="separator"></div>
        <p>Code sous license  GNU-LGPL accessible sur <a href="https://github.com/kimt0t0/Autistopedie" title="Voir le dépôt GitHub" target="_blank">@GitHub</a></p>
        <div class="separator"></div>
        <p>Contenus protégés par le droit d'auteur français.</p>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    box-sizing: border-box;
    background-color: $grey;
    color: $light;
    border-top: 2px solid $dark;
    display: flex;
    flex-direction: column;
    gap: $space-s;
    align-items: center;
    padding: $space-s $space-xl;
    font-size: $font-xxs;
    font-weight: 600;
    > p {
        margin: 0;
    }
    > .separator {
        cursor: pointer;
        width: 8px;
        height: 8px;
        border-radius: $circle 0 $circle;
        background-color: $primary;
        @include transition;
        &:hover {
            transform: rotate(190deg);
            background-color: $success;
        }
    }
}

a {
    color: $primary;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    padding: 0 $space-s 0 $space-xxs;
    &:hover {
        border-color: $primary;
    }
}
</style>