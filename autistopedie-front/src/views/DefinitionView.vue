<template>
    <section class="classic-container definition-container">
        <HeroTitle>Une définition rapide de l'autisme</HeroTitle>
        <p class="small-text alert">Cette page est en attente d'ajout de contenus du fait du focus sur le développement technique du site. Objectif complétion pour le mardi 22/10 au plus tard.</p>
        
        <div class="official-definition">
            <h3>Définitions officielles - un résumé:</h3>
            <p>Pour résumer, l'état actuel des recherches et des normes de santé indiquent que l'autisme est un trouble neuro-développemental dont les symptômes (ou divergences) sont visibles dès très jeune, avant l'âge de 3 ans.</p>
            <p>Se manifestant de façons différentes chez chaque personne, et parfois de façons différentes chez une même personne (périodes de vie, contexte), il est aujourd'hui présenté comme un spectre plutôt que comme deux catégories tranchées entre avec / sans déficience mentale.</p>
            <p>En fait, il consisterait surtout en un fonctionnement et une structure du cerveau différents de la norme, avec des conséquences quotidiennes plus ou moins handicapantes que l'on regroupe dans ce que les professionnel.le.s de santé nomment la "dyade autistique":</p>
            <ul class="definition-items">
                <li><strong>Communication et interactions sociales:</strong> Par exemple difficultés à regarder dans les yeux, à parler (constantes ou temporaires), à interpréter les émotions des autres, à identifer ou parler de ses propres émotions, à comprendre l'implicite ou le second degré, à se faire des ami.e.s ou à les garder sur une longue durée...</li>
                <li><strong>Comportements répétés et/ou centres d'intérêts dits "restreints":</strong> Par exemple tapping avec les mains ou les pieds, balancements, dermatillomanie, passion pour un / des sujets parfois inhabituels avec souvent le plaisir de lister, catégoriser ou simplement comprendre des informations dessus; regarder ou écouter le même film, série ou musique en boucle, ou encore ne pas supporter les changements ou les imprévus.</li>
            </ul>
            <p>Dyade qui se transforme selon les définitions en "triade" en ajoutant le point suivant selon les définitions:</p>
            <ul class="definition-items">
                <li><strong>Sensibilité sensorielle (hypo- et/ou hyper-):</strong> Une sensibilité inférieure ou supérieure à la moyenne à un ou plusieurs sens, qui peut parfois varier au cours de la vie chez une même personne, et être accentuée dans certains contextes (fatigue, anxiété...). L'on retrouve souvent une sensibilité au toucher de certaines matières et/ou aux contacts physiques avec autrui, un épuisement lié aux bruits environnants, ou encore le fait d'apprécier une autostimulation que l'on contrôle (trampoline, tourner en rond, se serrer dans les bras, se balancer...).</li>
            </ul>
            <p><strong>Toutes les personnes autistes ne présentent donc pas les mêmes signes, ni à une même intensité.</strong> Des autistes sans difficultés pour parler ou lire apprennent aussi à "masquer" leurs difficultés pour s'adapter socialement, ce qui aboutit parfois à des diagnostics tardifs et/ou erronnés (tels que des diagnostics de bipolarité, de trouble borderline, de TDAH ou de schizophrénie - qui sont parfois confondus, parfois présents aussi).</p>
            <p>De plus, <strong>si certains chercheurs et la culture populaire ont eu tendance à présenter l'autisme comme une pathologie quasi-exclusivement masculine en suivant la théorie posée par Hans Asperger</strong> (qui travaillait alors au service des nazis en faisant des expériences sur ses patients handicapés exclusivement hommes cisgenres), <strong>cette vision est aujourd'hui dépassée.</strong> De plus en plus de travaux démontrent que l'autisme est en fait aussi très présent chez les femmes, et mon expérience personnelle dans les espaces LGBT+ indique que les personnes trans sont aussi concernées. A tel point que plusieurs chercheur·euse·s ont récemment décidé de redéfinir les critères de diagnostic afin de mieux prendre en compte le genre dans leur compréhension de l'autisme.</p>
            <div class="official-resources">
                <h4>Quelques ressources officielles:</h4>
                <ul class="resources-list">
                    <li><a href="https://www.ameli.fr/assure/sante/themes/autisme/comprendre-l-autisme" title="Lire l'article Mieux comprendre l'autisme" target="_blank">Site Ameli (Sécurité sociale française)</a></li>
                    ·
                    <li><a href="https://www.autismeinfoservice.fr/informer/autisme/definition" title="Lire l'article Définition: autisme et trouble du spectre de l'autisme" target="_blank">Site Autisme Info Service (dispositif national gratuit)</a></li>
                    <li><a href="https://www.has-sante.fr/upload/docs/application/pdf/2018-02/trouble_du_spectre_de_lautisme_de_lenfant_et_ladolescent__recommandations.pdf" title="Lire le guide de recommandations de la HAS " target="_blank">Guide HAS (Critères du DSM-V en page 27)</a></li>
                    <li><a href="https://www.msdmanuals.com/fr/accueil/les-faits-en-bref-probl%C3%A8mes-de-sant%C3%A9-infantiles/troubles-de-l%E2%80%99apprentissage-et-du-d%C3%A9veloppement/autisme?query=autisme#Quels-sont-les-sympt%C3%B4mes-de-l%E2%80%99autisme-?_v32207710_fr" title="Lire l'article sur les symptôes de l'autisme du MDS" target="_blank">L'Autisme - Manuel MSD</a></li>
                    <li><a href="https://www.lemonde.fr/sciences/article/2018/10/02/asperger-et-les-nazis-un-cas-plus-qu-embarrassant_5363064_1650684.html" title="Lire l'article Asperger et les nazis, sur le site du journal Le Monde" target="_blank">"Asperger et les nazis" - Le Monde</a></li>
                    <!-- Structure to use if you need to add a new link: 
                     <li><a href="" title="Lire l'article " target="_blank"></a></li> -->
                </ul>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.alert {
    color: $alert;
}

.definition-items {
        display: flex;
        flex-direction: column;
        gap: $space-s;
        padding: $space-m 0;
        > li {
            @include listItemStyle();
        }
    }

.official-resources {
    box-sizing: border-box;
    border: 2px solid $grey;
    background-color: $grey;
    border-radius: $radius-xs;
    @include classicPadding();
    > h4 {
        color: $light;
        padding-bottom: $space-m;
    }
}
.resources-list {
    display: flex;
    flex-wrap: wrap;
    gap: $space-m $space-l;
    margin: 0;
    padding: $space-s 0;
    > li {
        list-style-type: none;
    }
}
</style>
