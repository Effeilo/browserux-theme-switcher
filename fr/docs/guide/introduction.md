# Introduction

## Qu'est-ce que `browserux-theme-switcher` ?

`browserux-theme-switcher` est un Web Component qui fournit un bouton de bascule light/dark entièrement fonctionnel. Il est construit comme un Custom Element natif, fonctionne dans tout navigateur supportant les Web Components, et s'intègre sans modification dans React, Vue, Angular ou des pages HTML simples.

Il détecte le thème système au premier chargement, persiste le choix de l'utilisateur dans `localStorage`, applique le thème via un attribut `data-theme`, met à jour les labels ARIA pour l'accessibilité, échange les images automatiquement, et dispatche un événement `theme-change` pour que le reste de votre application puisse réagir.

Tout cela avec une seule balise HTML.

---

## Pourquoi ce composant ?

Implémenter un sélecteur de thème de zéro implique de résoudre plusieurs problèmes distincts :

- **État initial** : quel thème doit être actif avant toute interaction utilisateur ?
- **Persistance** : comment mémoriser le choix de l'utilisateur entre les rechargements de page ?
- **Accessibilité** : comment communiquer l'état actuel aux lecteurs d'écran ?
- **Internationalisation** : comment libeller le bouton pour les utilisateurs non anglophones ?
- **Images** : comment échanger les ressources images quand le thème change ?
- **Compatibilité frameworks** : comment le faire fonctionner dans React, Vue et Angular sans réécriture ?

`browserux-theme-switcher` gère chacune de ces problématiques nativement, sans configuration supplémentaire.

---

## La logique en trois étapes

Le composant exécute la même logique à chaque fois qu'il est connecté au DOM :

### Étape 1 - Détecter le thème initial

Au chargement, le composant vérifie `localStorage` pour une préférence enregistrée précédemment. Si aucune n'est trouvée, il lit le thème système via `prefers-color-scheme`. Si ni l'un ni l'autre n'est disponible, il utilise `light` par défaut.

### Étape 2 - Persister la préférence de l'utilisateur

Quand l'utilisateur clique sur le bouton, le thème choisi est enregistré dans `localStorage` sous la clé `theme`. Au prochain chargement de page, cette valeur est lue en premier et a la priorité sur la préférence système.

### Étape 3 - Appliquer le thème dans le DOM

Le thème sélectionné est écrit comme attribut `data-theme` (`"light"` ou `"dark"`) sur l'élément `<html>`, ou sur un élément personnalisé défini via l'attribut `target`. Votre CSS lit cet attribut pour appliquer les styles appropriés.

---

## Positionnement

`browserux-theme-switcher` est délibérément focalisé :

- Il ne gère pas les propriétés CSS personnalisées à votre place
- Il ne génère pas de thèmes ni de tokens de design
- Il ne dépend d'aucun framework CSS
- Il ne nécessite pas d'étape de build pour être utilisé

Il fait une seule chose : donner aux utilisateurs un moyen fiable et accessible de changer de thème, et informer le reste de votre application quand ce changement se produit.

---

## Ce que `browserux-theme-switcher` ne fait pas

- Pas de génération de variables CSS ni de gestion de tokens
- Pas d'intégration server-side rendering (voir [Démarrage rapide](getting-started.md) pour les notes SSR)
- Pas de détection automatique de `prefers-contrast` ou `prefers-reduced-motion`
- Pas de support pour plus de deux thèmes (light et dark uniquement)
