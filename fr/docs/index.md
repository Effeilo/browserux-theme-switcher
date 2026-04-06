# Documentation `browserux-theme-switcher`

## Le projet

Le changement de thème est une fonctionnalité standard sur les sites web modernes. Mais l'implémenter correctement implique de gérer les préférences système, de persister le choix de l'utilisateur, de mettre à jour les labels ARIA, d'échanger les images, et de rester accessible, dans chaque framework et chaque navigateur.

`browserux-theme-switcher` fait tout cela dans un seul Web Component. Ajoutez `<browserux-theme-switcher>` dans n'importe quelle page HTML et vous obtenez un bouton de bascule light/dark entièrement fonctionnel, sans framework requis.

Un seul composant. Zéro dépendance. Aucune configuration requise pour démarrer.

---

## Table des matières

### Guide

- [Introduction](guide/introduction.md) : ce que c'est, pourquoi ça existe, ce que ça gère automatiquement
- [Démarrage rapide](guide/getting-started.md) : installation via npm ou CDN, usage basique
- [Fonctionnement](guide/how-it-works.md) : logique d'initialisation, persistance, détection système, mises à jour DOM
- [Utilisation avec les frameworks](guide/framework-usage.md) : React, Vue, Angular et intégration vanilla JS
- [Thématisation](guide/theming.md) : variables CSS, styles personnalisés, stratégies d'échange d'images

### Référence

- [Attributs](reference/attributes.md) : `target`, `lang`, `data-label-*`, `no-shadow`, `style`
- [Événements](reference/events.md) : événement personnalisé `theme-change` avec détails du payload
- [Slots](reference/slots.md) : slots nommés `light-icon`, `dark-icon`
- [Utilitaires](reference/utils.md) : `updateImagesByTheme`, `updateThemeImages`

### Référence complémentaire

- [Compatibilité](compatibility.md) : support navigateur, compatibilité frameworks, formats de build
- [Contribuer](contributing.md) : signaler un bug, suggérer une amélioration, soumettre une PR
