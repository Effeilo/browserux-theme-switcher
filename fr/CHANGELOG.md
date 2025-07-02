[EN](../CHANGELOG.md) | **FR**

<div>
  <img src="https://browserux.com/assets/img/logo/logo-browserux-theme-switcher-250.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# 📦 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)  
et ce projet suit les recommandations de versionnage [SemVer](https://semver.org/lang/fr/).

---

<br>

## [1.1.0] – 02-07-2025

### ✨ Ajouté

- Prise en charge du **changement d’images en fonction du thème** dans tous les frameworks (React, Vue, Angular, HTML) :
  - Remplace dynamiquement la source des balises `<img class="has-dark">` selon le thème actif.
  - Fonctionne **automatiquement** en suivant une convention de nom de fichier `-dark` (ex. `logo.webp` → `logo-dark.webp`).
  - Prend également en charge un **contrôle manuel** avec les attributs `data-src-light` et `data-src-dark`.

### 🛠 Amélioré

- Le Web Component prend désormais en charge les images ajoutées dynamiquement (par exemple via JSX, templates Vue ou bindings Angular).
- Les fonctions utilitaires `updateImagesByTheme()` et `updateThemeImages()` fonctionnent désormais ensemble :
  - `updateImagesByTheme()` applique automatiquement la logique basée sur le nom de fichier.
  - `updateThemeImages()` permet un contrôle plus fin via des attributs explicites.

<br>

---

<br>

## [1.0.3] – 25-06-2025

### 🐞 Corrigé

- Compatibilité assurée du switch de thème sur Firefox :
  - Le positionnement du curseur est désormais contrôlé via une variable CSS dynamique (`--toggle-shift`)
    au lieu du sélecteur `:host(.dark)`.
  - Cela contourne les limitations connues du support de Shadow DOM dans Firefox.

<br>

---

<br>

## [1.0.2] – 25-06-2025

### 🐞 Corrigé

- Compatibilité Firefox : ajout d’un fallback pour le sélecteur `:host-context([data-theme="dark"])` non pris en charge.
  - Le composant ajoute désormais aussi une classe `.dark` à `<browserux-theme-switcher>`, permettant de cibler le thème sombre via `:host(.dark)` dans le Shadow DOM.

<br>

---

<br>

## [1.0.1] – 14-06-2025

### ✨ Ajout

- Changelog

<br>

---

<br>

## [1.0.0] – 14-06-2025

### ✨ Ajout

- 💡 Web Component `<browserux-theme-switcher>` pour basculer entre thèmes clair et sombre
- ⚙️ Détection automatique des préférences système (`prefers-color-scheme`)
- 💾 Persistance des préférences utilisateur via `localStorage`
- 🌍 Support multilingue (`lang` auto ou forcé, 9 langues intégrées)
- ♿ Accessibilité : `aria-label` dynamique, personnalisable via `data-label-*`
- 🎨 Personnalisation complète via variables CSS (`--bux-switch-*`)
- 🧩 Shadow DOM optionnel (`no-shadow`)
- 🎯 Ciblage personnalisé via l’attribut `target`
- 🖼 Gestion des images via la classe `.has-dark`
- 🧠 Événement `theme-change` déclenché à chaque bascule
- 🎛 Slots pour personnalisation des icônes (`light-icon`, `dark-icon`)
- 📦 Compatible avec tous les frameworks modernes : React, Vue, Angular, HTML pur
- 🔧 Build avec TypeScript + Rollup (ESM, UMD, types)

<br>

---