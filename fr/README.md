[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-theme-switcher-300.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# BrowserUX Theme Switcher

**Une solution moderne pour proposer un sélecteur de thème clair/sombre et améliorer l'expérience utilisateur sur toutes vos interfaces web.**

BrowserUX Theme Switcher est un Web Component léger, accessible et personnalisable conçu pour ajouter facilement un bouton de changement de thème à n'importe quel site ou application. Il détecte automatiquement le thème système, mémorise la préférence de l'utilisateur et applique le bon thème.

[![npm version](https://img.shields.io/npm/v/browserux-theme-switcher.svg)](https://www.npmjs.com/package/browserux-theme-switcher)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js)

- [Site du projet](https://browserux.com/fr/theme-switcher/)
- [Démo](https://browserux.com/fr/theme-switcher/demo/)
- [Documentation](./docs/index.md)
- [Changelog](./CHANGELOG.md)

<br>

## Fonctionnalités

- 🎚 Bascule `data-theme="light"` / `"dark"` sur `<html>` ou un élément cible personnalisé
- 💾 Persiste la préférence utilisateur dans `localStorage`
- 🕶 Détecte la préférence système via `prefers-color-scheme` au premier chargement
- 📢 Dispatche un événement personnalisé `theme-change` à chaque changement de thème
- 🧠 Labels ARIA dynamiques, multilingues, auto-détectés ou personnalisables
- 🌐 i18n intégré pour 9 langues (`en`, `fr`, `es`, `de`, `ja`, `ru`, `pt`, `it`, `nl`)
- 🖼 Échange automatique d'images via convention de nommage ou attributs `data-src-*` explicites
- 🎨 Entièrement personnalisable via propriétés CSS (`--bux-switch-*`)
- 🧩 Shadow DOM optionnel, désactivable avec `no-shadow`

## Installation

```bash
npm install browserux-theme-switcher
```

Ou via CDN :

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.esm.js"></script>
```

## Utilisation

```js
import 'browserux-theme-switcher';
```

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

## Paramètres

| Paramètre | Type | Description |
|---|---|---|
| `target` | Attribut | Sélecteur CSS de l'élément qui reçoit `data-theme` |
| `lang` | Attribut | Code de langue pour les labels ARIA intégrés |
| `data-label-light` | Attribut | Label ARIA personnalisé pour activer le mode clair |
| `data-label-dark` | Attribut | Label ARIA personnalisé pour activer le mode sombre |
| `no-shadow` | Attribut | Désactiver l'encapsulation Shadow DOM |
| `style` | Attribut | Propriétés CSS personnalisées pour la personnalisation visuelle |
| `theme-change` | Événement | Déclenché à chaque changement, `e.detail.theme` vaut `"light"` ou `"dark"` |
| `light-icon` | Slot | Icône affichée côté clair du bouton de bascule |
| `dark-icon` | Slot | Icône affichée côté sombre du bouton de bascule |

## Documentation

Pour la documentation complète, voir [docs/index.md](docs/index.md).

### Guide

- [Introduction](docs/guide/introduction.md) : présentation, pourquoi ce composant, la logique en trois étapes
- [Démarrage rapide](docs/guide/getting-started.md) : installation via npm ou CDN, ajout du CSS
- [Fonctionnement](docs/guide/how-it-works.md) : cycle de vie, persistance, Shadow DOM, ARIA
- [Utilisation avec les frameworks](docs/guide/framework-usage.md) : React, Vue, Angular, vanilla JS
- [Thématisation](docs/guide/theming.md) : variables CSS, stratégies d'échange d'images

### Référence

- [Attributs](docs/reference/attributes.md) : `target`, `lang`, `data-label-*`, `no-shadow`, `style`
- [Événements](docs/reference/events.md) : événement `theme-change` avec payload et cas d'usage
- [Slots](docs/reference/slots.md) : slots nommés `light-icon`, `dark-icon`
- [Utilitaires](docs/reference/utils.md) : `updateImagesByTheme`, `updateThemeImages`

### Référence complémentaire

- [Compatibilité](docs/compatibility.md) : support navigateur, compatibilité frameworks, formats de build
- [Contribuer](docs/contributing.md) : signaler un bug, suggérer une amélioration, soumettre une PR

## Licence

MIT © 2026 [Effeilo](https://github.com/Effeilo)
