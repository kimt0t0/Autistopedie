<template>
    <section class="classic-container about-container">
        <HeroTitle color="success">A Propos</HeroTitle>
        <article class="introduction">
            <div class="contents">
                <p>Bonjour ! Je m'appelle Kim, j'ai 31 ans et je suis autiste et non-binaire.</p>
                <p>J'ai réalisé ce prototype "from scratch" en deux semaines afin de candidater à une offre d'emploi pour des recherches sur les représentations genrées de l'autisme. Il n'est donc pas abouti, mais vise à donner une idée de son fonctionnement possible et démontrer mes compétences en développement web.</p>
                <p>Ainsi, même si ma candidature n'est finalement pas retenue, je pense continuer à améliorer ce projet régulièrement et lui donner une vraie vie avec de vrais contenus - éventuellement en prenant une direction un peu différente de celle prévue initialement pour ne pas concurrencer le projet de recherche auquel je souhaite me joindre.</p>
            </div>
            <img src="@images/me.jpg" alt="Photographie de l'auteur.ice du site, vue de torse" class="picture" loading="lazy" />
        </article>

        <article class="technic">
            <h3 class="success">Technique informatique</h3>
            <p>Pour réaliser ce projet, j'ai utilisé:</p>
            <ul>
                <li><strong class="success">Base de données:</strong> MongoDB (permet de faire évoluer le projet facilement, hébergement de base gratuit).</li>
                <li><strong class="success">API REST:</strong> Nest.js (framework Node.js).</li>
                <li><strong class="success">Interface graphique:</strong> Vue.js (version 3) et Sass.</li>
                <li><strong class="alert">Vos données si vous vous inscrivez:</strong>Le site reccueil le minimum de données possible (uniquement un email pour pouvoir échanger avec vous si vous perdez vos identifiants par exemple). Ces données sont stockées sur la base de données MongoDB, seul partenaire à y avoir accès. Elles ne sont en aucun cas partagées avec des tiers. S'agissant d'une plateforme non-commerciale et d'un prototype, je n'ai pas jugé utile de reccueillir des données permettant d'identifier les utilisateurs plus précisément.</li>
            </ul>
            <p>Les composants et styles sont réalisés de façon personnalisée, mis à part le champ permettant de gérer l'ajout de contenus par un utilisateur pour une page. Ce champ qui fournit une grande liberté (formattage du texte, collage d'images et de liens dans le contenu directement...) est mis en place avec la librairie <a href="https://vueup.github.io/vue-quill/guide/" title="Visiter le site officiel" target="_blank">@Quill.</a></p>
        </article>

        <article class="training">
            <h3 class="shadows">Ma formation</h3>
            <ul>
                <li><strong class="shadows">Master recherche anglais / histoire:</strong> Réalisé à l'Université de Paris 8 entre 2015 et 2017 sous la direction de <a href="https://transcrit.univ-paris8.fr/-BETHMONT-Remy-PR-" title="Visiter la page universitaire de Rémy Bethmont" target="_blank">@Rémy Bethmont</a> au sein de l'UFR Histoire et Langues, avec un cursus mêlant les deux disciplines.</li>
                <li><strong class="shadows">Titre Concepteur Développeur d'Applications (bac +3/4):</strong> Réalisé à <a href="https://www.mydigitalschool.com/bachelor-developpeur-digital-web" title="Visiter le site officiel de MyDigitalSchool" target="_blank">@MyDigitalSchool</a> en 2022-2023.</li>
            </ul>
        </article>

        <article class="hobbies">
            <h3 class="secondary">Mes centres d'intérêt</h3>
            <ul>
                <li><strong class="secondary">Genre et études de genre:</strong> Master 2 réalisé sur un sujet autour des transidentités, projet de thèse future toujours en lien avec ce sujet. Engagement quotidien pour l'égalité et l'inclusion des femmes et minorités de genre.</li>
                <li><strong class="secondary">Neuro-atypies:</strong> Diversité des neuro-atypies, représentations fictionnelles ou réelles "feel-good" ou pouvant fournir des modèles positifs, parcours de soins et care entre pairs.</li>
                <li><strong class="secondary">Fiction:</strong> Romans fantastiques et science-fiction, films, séries, jeux vidéo.</li>
                <li><strong class="secondary">Histoire et sociologie:</strong> Lecture d'essais en loisir selon envies et humeurs, plusieurs lectures chaque année.</li>
                <li><strong class="secondary">Informatique:</strong> Développement web sur-mesure, accessibilité du web, culture du libre, utilisations éthiques et raisonnées d'IA.</li>
                <li><strong class="secondary">Sport:</strong> Karaté, réflexions autour d'une utilisation en autodéfense individuelle et collective pour les femmes et minorités de genre.</li>
            </ul>
        </article>

    </section>
</template>

<style lang="scss" scoped>
    .success {
        color: $success;
    }

    .shadows {
        color: $shadows;
    }

    .secondary {
        color: $secondary;
    }

    .about-container {
        display: flex;
        flex-direction: column;
        gap: $space-l;
    }

    .introduction {
        display: flex;
        flex-wrap: wrap;
        gap: $space-xxl;
        @media (max-width: $bp-l) {
            gap: $space-l;
        }
        @media (max-width: $bp-m) {
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: center;
        }
        > .picture {
            width: 200px;
            border-radius: $radius-l;
            filter: grayscale(100%) blur(4px);
            cursor: pointer;
            @include classicShadow();
            @include transition();
            &:hover, &:focus {
                filter: none;
            }
            @media (max-width: $bp-s) {
                width: auto;
                max-height: 300px;
            }
        }
        > .contents {
            max-width: 700px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: $space-xl;
            text-align: justify;
            color: $grey;
            > p {
                font-weight: 500;
            }
        }
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: $space-s;
        > li {
            @include listItemStyle();
        }
    }

</style>
