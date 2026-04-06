# Contribuer

Les contributions sont les bienvenues. Que vous souhaitiez signaler un bug, suggérer une amélioration, ajouter une fonctionnalité ou corriger une faute de frappe, n'hésitez pas à participer.

---

## Signaler un problème

Ouvrez une issue sur le dépôt GitHub pour :

- Signaler un bug ou un comportement inattendu.
- Suggérer une amélioration ou une nouvelle fonctionnalité.
- Discuter d'une idée avant de soumettre une pull request.

Lors du signalement d'un bug, précisez :

- Votre navigateur et sa version
- Votre version de Node.js (`node -v`) si applicable
- Le framework ou l'environnement utilisé (React, Vue, HTML vanilla, etc.)
- Le message d'erreur et la stack trace si applicable
- Une reproduction minimale (CodePen, StackBlitz ou un fichier HTML minimal)

---

## Soumettre une pull request

1. Forkez le dépôt.
2. Créez une branche dédiée :

```bash
git checkout -b ma-proposition
```

3. Effectuez vos modifications.
4. Compilez le package pour vérifier la sortie :

```bash
npm run build
```

5. Committez avec un message clair :

```bash
git commit -m "Fix: description de la modification"
```

6. Poussez la branche :

```bash
git push origin ma-proposition
```

7. Ouvrez une pull request sur GitHub.

---

## Exécuter en local

```bash
# Installer les dépendances
npm install

# Compiler tous les formats de sortie (ESM, UMD, minifié, .d.ts)
npm run build
```

Pour tester les modifications dans un navigateur, ouvrez `demo/index.html` directement dans votre navigateur ou servez le répertoire du projet avec n'importe quel serveur de fichiers statiques.

---

## Bonnes pratiques

- Restez fidèle au périmètre focalisé du composant : le changement de thème via un Web Component.
- Ne modifiez que ce qui est nécessaire. Les changements ciblés sont plus faciles à relire.
- Testez vos modifications dans au minimum Chrome et Firefox. Les corrections liées à Safari doivent être vérifiées dans Safari.
- Vérifiez que les labels ARIA se mettent toujours à jour correctement après les changements d'attributs.
- Assurez-vous que le mode `no-shadow` continue de fonctionner après tout changement de template ou de cycle de vie.
- Consultez le [changelog](../../CHANGELOG.md) pour comprendre l'historique des décisions.

---

## Structure du projet

```
├── dist/                  sortie compilée (générée par rollup)
│   ├── browserux-theme-switcher.esm.js
│   ├── browserux-theme-switcher.umd.js
│   ├── browserux-theme-switcher.min.js
│   └── browserux-theme-switcher.d.ts
├── src/
│   ├── index.ts                         point d'entrée du package
│   ├── components/
│   │   └── browserux-theme-switcher.ts  Web Component principal
│   ├── utils/
│   │   ├── theme-utils.ts               updateImagesByTheme()
│   │   └── theme-image.ts               updateThemeImages()
│   └── types/
│       └── theme.types.ts               type ThemeMode
├── demo/                  fichiers de démo navigateur
├── docs/                  documentation en anglais
├── fr/docs/               documentation en français
├── rollup.config.mjs
├── tsconfig.json
└── package.json
```

---

## Remerciements

`browserux-theme-switcher` est construit avec :

- [Rollup](https://rollupjs.org/) - bundler de modules
- [TypeScript](https://www.typescriptlang.org/) - langage typé et compilateur
- Le standard [Web Components](https://developer.mozilla.org/fr/docs/Web/API/Web_components) - Custom Elements, Shadow DOM et slots
