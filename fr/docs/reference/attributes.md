# Attributs

Toute la configuration se fait via des attributs HTML définis sur l'élément `<browserux-theme-switcher>`. Aucune API JavaScript n'est requise.

```html
<browserux-theme-switcher
  target="#app"
  lang="fr"
  data-label-light="Passer en mode clair"
  data-label-dark="Passer en mode sombre"
  no-shadow
  style="--bux-switch-bg-color: #3a86ff;"
></browserux-theme-switcher>
```

---

## Référence rapide

| Attribut | Type | Défaut | Description |
|---|---|---|---|
| `target` | `string` | `undefined` | Sélecteur CSS de l'élément qui reçoit `data-theme` |
| `lang` | `string` | `undefined` | Code de langue pour les labels ARIA intégrés |
| `data-label-light` | `string` | *(label i18n)* | Label ARIA personnalisé pour activer le mode clair |
| `data-label-dark` | `string` | *(label i18n)* | Label ARIA personnalisé pour activer le mode sombre |
| `no-shadow` | `boolean` | `false` | Désactiver l'encapsulation Shadow DOM |
| `style` | `string` | — |   Propriétés CSS personnalisées pour la personnalisation visuelle |

---

## `target`

**Type :** `string` (sélecteur CSS) - **Défaut :** `document.documentElement`

Spécifie quel élément reçoit l'attribut `data-theme` quand le thème change. Accepte tout sélecteur CSS valide.

Si l'attribut est absent ou si le sélecteur ne correspond à aucun élément, l'élément `<html>` est utilisé comme fallback.

```html
<!-- Appliquer le thème à un conteneur scopé plutôt qu'à <html> -->
<main id="app">
  <browserux-theme-switcher target="#app"></browserux-theme-switcher>
</main>
```

```html
<!-- Appliquer à un élément personnalisé -->
<browserux-theme-switcher target=".theme-root"></browserux-theme-switcher>
```

Les sélecteurs invalides (CSS mal formé) sont capturés silencieusement. Le composant revient à `<html>` sans déclencher d'erreur.

---

## `lang`

**Type :** `string` - **Défaut :** hérite de `<html lang="">` ou retombe sur `'en'`

Définit la langue pour les labels ARIA intégrés du bouton de bascule. Surcharge tout attribut `lang` présent sur l'élément `<html>`.

```html
<browserux-theme-switcher lang="fr"></browserux-theme-switcher>
```

Codes de langue supportés :

| Code | Langue |
|---|---|
| `en` | Anglais (défaut) |
| `fr` | Français |
| `es` | Espagnol |
| `de` | Allemand |
| `ja` | Japonais |
| `ru` | Russe |
| `pt` | Portugais |
| `it` | Italien |
| `nl` | Néerlandais |

Si un code non supporté est fourni, le composant retombe sur les labels anglais.

Cet attribut est observé. Le modifier après la connexion met à jour le label ARIA immédiatement.

---

## `data-label-light`

**Type :** `string` - **Défaut :** selon la langue (ex. : `"Activer le mode clair"`)

Surcharge le label ARIA affiché sur le bouton quand le thème actuel est sombre (c'est-à-dire quand cliquer basculera en mode clair).

```html
<browserux-theme-switcher
  data-label-light="Passer en mode clair"
></browserux-theme-switcher>
```

Cet attribut est observé. Le modifier après la connexion met à jour l'`aria-label` du bouton immédiatement.

---

## `data-label-dark`

**Type :** `string` - **Défaut :** selon la langue (ex. : `"Activer le mode sombre"`)

Surcharge le label ARIA affiché sur le bouton quand le thème actuel est clair (c'est-à-dire quand cliquer basculera en mode sombre).

```html
<browserux-theme-switcher
  data-label-dark="Passer en mode sombre"
></browserux-theme-switcher>
```

Cet attribut est observé. Le modifier après la connexion met à jour l'`aria-label` du bouton immédiatement.

### Comment les labels sont sélectionnés

Le label actif décrit toujours l'action que le bouton va effectuer, pas l'état actuel :

| Thème actuel | Source du label affiché |
|---|---|
| `light` | `data-label-dark` ou label i18n "dark" |
| `dark` | `data-label-light` ou label i18n "light" |

Le bouton expose également `aria-pressed="true"` en mode sombre et `aria-pressed="false"` en mode clair pour la détection d'état programmatique.

---

## `no-shadow`

**Type :** booléen (présence/absence) - **Défaut :** absent (Shadow DOM utilisé)

Quand présent, désactive l'encapsulation Shadow DOM. Le template du composant est injecté directement dans le light DOM de l'élément.

```html
<browserux-theme-switcher no-shadow></browserux-theme-switcher>
```

**Quand l'utiliser :**

- Vous souhaitez styliser les éléments internes du bouton depuis votre propre feuille de style sans passer par les propriétés CSS personnalisées
- Votre environnement ne supporte pas le Shadow DOM
- Vous avez besoin que les éléments internes du composant participent au flux global du document

**Compromis :**

| | Shadow DOM (défaut) | Sans Shadow DOM (`no-shadow`) |
|---|---|---|
| Isolation des styles | Encapsulation complète | Les styles globaux peuvent affecter les internes |
| Propriétés CSS personnalisées | Supportées | Supportées |
| Support des slots | API slot complète | Les slots peuvent ne pas fonctionner comme attendu |

> Cet attribut est lu une seule fois dans `connectedCallback`. Le modifier après la connexion de l'élément n'a aucun effet.

---

## `style`

L'attribut `style` sur `browserux-theme-switcher` supporte des propriétés CSS personnalisées qui contrôlent l'apparence visuelle du bouton. Ces propriétés sont héritées par la règle `:host` du Shadow DOM.

```html
<browserux-theme-switcher
  style="
    --bux-switch-width: 50px;
    --bux-switch-height: 28px;
    --bux-switch-bg-color: #3a86ff;
    --bux-switch-thumb-color: #ffffff;
    --bux-switch-emoji-size: 1.2rem;
  "
></browserux-theme-switcher>
```

Pour la liste complète des propriétés supportées et leurs valeurs par défaut, voir [Thématisation](../guide/theming.md).
