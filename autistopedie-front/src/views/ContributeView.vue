<script lang="ts" setup>
import { EnvelopeIcon } from '@heroicons/vue/16/solid';
</script>

<template>
    <section class="classic-container contribute-container">
        <div>
            <HeroTitle color="secondary">Contribuer</HeroTitle>
            <p>Vous souhaitez contribuer à l'Autistopédie ? Vous êtes au bon endroit !</p>
            <p class="small-text alert">
                <strong>Attention:</strong> Ce projet est encore un prototype en vue d'une candidature, pour le moment cette invitation est surtout
                ouverte à Madame Lallet et à son équipe, ainsi qu'à mon entourage si vous souhaitez m'aider ou si vous voulez donner un avenir au
                site.
            </p>
        </div>

        <div>
            <h3>Ce que vous pouvez faire pour contribuer</h3>
            <ul>
                <li>
                    <strong>Informatique / Dev:</strong> Vous pouvez me contacter si vous avez des suggestions ou si vous souhaitez contribuer au code
                    directement pour que je vous ouvre les droits nécessaires sur GitHub.
                </li>
                <li>
                    <strong>Ajouter / compléter des contenus:</strong> Vous pouvez créer un compte sur le site et me contacter pour obtenir les droits
                    nécessaires sur ce compte pour contribuer librement aux contenus du site !
                </li>
                <li>
                    <strong>Administration / modération (en attente):</strong> Vous pourrez bientôt me demander également des droits pour administrer
                    les autres comptes utilisateurs.
                </li>
            </ul>
        </div>

        <div>
            <h3 class="secondary">Informations de contact</h3>
            <p class="small-text">Un formulaire sera ajouté ici prochainement. Le développement de cette fonctionnalité est en attente, en attendant le lien ci-dessous vous redirigera sur votre adresse mail pour m'envoyer un courriel directement:</p>
            <div class="actions-container">
                <a href="mailto:kim.robert.dev44@gmail.com" target="_blank" class="button-styled-link secondary">
                    <EnvelopeIcon /> M'envoyer un e-mail
                </a>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.alert {
    color: $alert;
}

.success {
    color: $success;
}

.secondary {
    color: $secondary;
}

.contribute-container {
    display: flex;
    flex-direction: column;
    gap: $space-l;
}

ul {
    display: flex;
    flex-direction: column;
    gap: $space-s;
    > li {
        @include listItemStyle();
    }
}

.actions-container {
    @include classicPadding();
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.button-styled-link {
    @include buttonStyle();
    &.secondary {
        color: $secondary;
        border-color: $secondary;
        &:hover, &:focus {
            background-color: $secondary;
            color: $light;
        }
    }
}
</style>
