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