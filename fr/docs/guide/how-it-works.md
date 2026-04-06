# Fonctionnement

`browserux-theme-switcher` est un Custom Element natif qui gère son propre cycle de vie, son rendu et son état. Comprendre le fonctionnement de chaque partie vous permet de configurer le composant correctement et d'anticiper son comportement.

---

## Vue d'ensemble du cycle de vie

```
<browserux-theme-switcher> connecté au DOM
│
├── connectedCallback      → déterminer la racine Shadow DOM ou light DOM
├── clone du template      → injecter la structure HTML et les styles scopés
├── liaison d'événement    → attacher le listener de clic au bouton de bascule
├── initializeTheme()      → détecter et appliquer le thème initial
│
│   [L'utilisateur clique sur le bouton]
│
├── toggleTheme()          → calculer le prochain thème, sauvegarder dans localStorage
└── applyTheme()           → définir data-theme, mettre à jour ARIA, échanger les images, dispatcher l'événement
```

---

## Initialisation

### Détection du Shadow DOM

Quand l'élément se connecte, le composant vérifie la présence de l'attribut `no-shadow`. S'il est absent, une racine Shadow DOM est créée (`mode: 'open'`) et le template y est injecté. Si `no-shadow` est présent, le template est injecté directement dans l'élément en light DOM.

Cette décision est prise une seule fois dans `connectedCallback` et ne peut pas changer après la connexion.

### Injection du template

Un élément `<template>` statique contient la structure HTML et les styles scopés du composant. À chaque connexion, le contenu du template est cloné avec `cloneNode(true)` et ajouté à la racine active. Cela évite de re-parser le markup à chaque instance.

---

## Initialisation du thème

`initializeTheme()` s'exécute une fois lorsque l'élément se connecte. Il détermine le thème de départ selon cet ordre de priorité :

1. **Préférence enregistrée** : lit `localStorage.getItem('theme')`. Si une valeur existe et vaut `'light'` ou `'dark'`, elle est utilisée immédiatement.
2. **Préférence système** : si rien n'est enregistré, lit `window.matchMedia('(prefers-color-scheme: dark)').matches` pour détecter la préférence au niveau du système d'exploitation.
3. **Valeur par défaut** : si ni l'un ni l'autre n'est disponible, utilise `'light'` par défaut.

Si le composant démarre depuis la préférence système (sans valeur sauvegardée), il enregistre également un listener `change` sur `prefers-color-scheme`. Ce listener est retiré implicitement quand l'utilisateur fait un choix manuel, car les écritures ultérieures dans `localStorage` prennent le relais au prochain chargement.

---

## Application du thème

`applyTheme(theme)` est la méthode centrale qui s'exécute à la fois lors de l'initialisation et après chaque bascule utilisateur. Elle effectue quatre opérations dans l'ordre :

### 1. Définir `data-theme` sur l'élément cible

```js
target.setAttribute('data-theme', theme);
```

La cible est par défaut `document.documentElement` (`<html>`). Un élément personnalisé peut être spécifié via l'attribut `target`.

### 2. Mettre à jour la position du bouton de bascule

Au lieu de s'appuyer sur les sélecteurs d'état `:host` (qui ont un comportement incohérent dans Firefox), le composant définit directement une variable CSS sur lui-même :

```js
this.style.setProperty('--toggle-shift', theme === 'dark'
    ? 'translateX(calc(var(--bux-switch-width) - var(--bux-switch-height)))'
    : 'translateX(0)');
```

Cette approche fonctionne de manière identique dans tous les navigateurs.

### 3. Mettre à jour les labels ARIA

L'`aria-label` du bouton de bascule est mis à jour pour décrire la prochaine action disponible (pas l'état actuel). Le label est issu de :

- Les attributs `data-label-light` / `data-label-dark` (s'ils sont définis)
- La table `I18N_LABELS` intégrée pour la langue active
- Le fallback anglais si la langue n'est pas supportée

Le bouton reçoit également `aria-pressed="true"` en mode sombre et `aria-pressed="false"` en mode clair.

### 4. Échanger les images et dispatcher l'événement

Les sources d'images sont mises à jour via `updateImagesByTheme()` et `updateThemeImages()`. Un événement personnalisé `theme-change` est ensuite dispatché avec `bubbles: true` et `composed: true` pour qu'il traverse les frontières Shadow DOM.

Voir [Utilitaires](../reference/utils.md) et [Événements](../reference/events.md) pour les détails.

---

## Résolution de la langue

La langue active est résolue par `getLang()` dans cet ordre :

1. L'attribut `lang` sur le composant lui-même
2. L'attribut `lang` sur `<html>`
3. Fallback vers `'en'`

Codes de langue supportés : `en`, `fr`, `es`, `de`, `ja`, `ru`, `pt`, `it`, `nl`.

---

## Résolution de la cible

`getThemeTarget()` résout l'élément qui reçoit l'attribut `data-theme` :

- Si aucun attribut `target` n'est défini → `document.documentElement`
- Si `target` est défini → `document.querySelector(target)`, avec fallback vers `document.documentElement` si le sélecteur est invalide ou introuvable

Les sélecteurs CSS invalides sont capturés silencieusement et provoquent un retour vers `<html>`.

---

## Sécurité localStorage

Tous les accès à `localStorage` sont enveloppés dans un `try/catch`. Cela protège le composant dans les environnements où l'accès au stockage est restreint : navigation privée sous Safari ou Firefox, iframes cross-origin, ou Content Security Policies strictes.

Quand `localStorage` est indisponible, le composant fonctionne tout de même. La préférence de thème n'est pas persistée, mais le bouton fonctionne normalement dans la session.

---

## Fallbacks des slots

Après l'injection du template, `handleSlotFallbacks()` s'exécute dans un callback `requestAnimationFrame` pour vérifier si les slots `light-icon` et `dark-icon` ont été remplis par le consommateur.

Si un slot est vide, le composant le remplace par un emoji par défaut (☀️ pour le mode clair, 🌙 pour le mode sombre). Ce remplacement est permanent pour cette instance, l'élément slot est supprimé du DOM.

Si un slot reçoit du contenu via `slotchange`, la vérification est différée et respecte le contenu final du slot avant de le remplacer.
