# Test technique — SPA dynamique pilotée par le serveur

## Lancer le projet

Assurez-vous d'utiliser Node.js version 22.

```bash
yarn install
yarn run dev
```

Accédez ensuite à `http://localhost:5173/screen/page-a` ou `/screen/page-b` pour tester.

---

## Enoncé

Nous souhaitons implémenter une application web dont l'interface est entièrement pilotée par le serveur. L'application interroge une API `GET /intents/:screenId` pour déterminer dynamiquement quels composants afficher et avec quelles données.

Par exemple, pour `GET /intents/page-a`, l’API renverrait :

```json
{
  "address-form": { "default": "16 RUE DE LA VILLE LEVEQUE 75008 PARIS" },
  "button": { "label": "Envoyer" }
}
```

Chaque clé représente un composant à afficher, et chaque valeur correspond à ses props.

Dans ce test, l’API n’existe pas encore. Elle est simulée via la fonction `fetchIntents` disponible dans `/src/mock/intents.ts`.

---

## Intents actuellement supportés

| Nom de l’intent | Composant associé |
| --------------- | ----------------- |
| `address-form`  | `<AddressForm />` |
| `accept-cgu`    | `<AcceptCGU />`   |
| `button`        | `<Button />`      |

Les composants sont déjà codés et importables depuis `src/components/`. Nous prévoyons de supporter à terme entre 80 et 100 intents.

---

## Objectifs

1. Appeler `fetchIntents(screenId)` pour simuler un appel à l’API.
2. Pour chaque intent, afficher dynamiquement le composant correspondant avec les bonnes props.
3. Respecter l’ordre dans lequel les intents sont retournés.

Vous devez écrire cette logique dans le fichier `ScreenRenderer.tsx`.

Vous pouvez centraliser toute la logique dans ce fichier. La clarté et la fonctionnalité priment sur la structure.

---

## Bonus : `visible-if`

Certains intents peuvent inclure une condition d'affichage :

```json
{
  "address-form": {
    "visible-if": { "accept-cgu": true },
    "default": "16 RUE DE LA VILLE LEVEQUE 75008 PARIS"
  }
}
```

Cela signifie que `address-form` ne doit s’afficher que si la case du composant `AcceptCGU` est cochée.

Idéalement, on voudrait pouvoir supporter des conditions plus complexes, par exemple `{ form-is-valid: "name of form" }`, `{ localization-is-valid: true }`, `{ age-is-over-18: true }`, etc.
Ces conditions supplémentaires ne sont pas à implémenter. Elles sont données uniquement en exemple pour vous donner une idée sur comment le produit devrait évoluer.

---

## Correction

### Éliminatoire

- Le rendu des composants de base ne fonctionne pas
- Les règles fondamentales de React ne sont pas respectées

### Acceptable

- Le rendu dynamique fonctionne même si tout est dans `ScreenRenderer.tsx`
- La partie `visible-if` n’est pas gérée

### Valorisé

- Le rendu conditionnel fonctionne (`visible-if`)
- Code clair, logique, bien découpé

---

## Temps estimé

30 à 45 minutes

# Notes de Gauthier

### L'application est déployée ici :

https://free.proj9ct.com

### Vidéo pour présenter rapidement le projet :

https://www.loom.com/share/39a972c1046f4c35b85c476c23279235

## Fonctionnalités

- <u>L'ensemble des fonctionnalités</u>, y compris la fonctionnalité optionnelle, a été développé
- <u>Une gestion des erreurs</u> a été implémentée aussi bien dans le mock serveur que la partie frontend
- La homepage de **Vite** a été remplacée par <u>une page pour accéder directement à 3 routes</u> _(2 bonnes et 1 mauvaise)_ afin d'éviter d'entrer des URLs à la main.

## Contribution

- <u>Le projet contient un historique **Git** propre</u> _(idéal pour suivre chaque étape du développement)_, et se base sur les bonnes pratiques de ces projets :

  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - [commit-message-emoji](https://github.com/dannyfritz/commit-message-emoji?tab=readme-ov-file#which-emoji-to-use-) par défaut, et [Gitmoji](https://gitmoji.dev/) en complément

- Comme le projet ne comportait pas de <u>formateur</u>, [Biome](https://biomejs.dev) a été ajouté :

  - c'est le nouveau standard pour linter et formater des projets en **TypeScript** _(c'est nettement plus performant que le duo **Prettier** x **ESLint**)_.
  - la configuration **Biome** ajoutée au projet permet, au passage, de bénéficier de règles de lint supplémentaires _(à la configuration **ESLint**)_.
  - l'ensemble des fichiers du projet a été formaté automatiquement _(dans un commit dédié)_, à la fois pour uniformiser la codebase et éviter des diffs de formatage dans des commits d'ajout de fonctionnalité.

- Comme rien ne faisait mention de la possibilité de changer <u>la configuration initiale du projet, rien n'a été modifié à ce niveau, volontairement</u> :

  - les fichiers `package.json`, `yarn.lock`, `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, `eslint.config.js` sont donc identiques aux fichiers initiaux.
  - **ESLint** fonctionne donc en parallèle de **Biome** _(via les extensions d'IDE respectives)_. Ceci dit, l'idéal aurait été de supprimer tout ce qui est relatif à **ESLint** pour des soucis de performance, d'autant qu'il n'y a aucune valeur ajoutée à utiliser **ESLint** dans ce cas de figure.
  - **Biome** a été ajouté via [mise-en-place](https://mise.jdx.dev), d'où le fichier `mise.toml`. Cela évite d'ajouter **Biome** dans les dépendances du projet _(n'obligeant donc personne à utliser **Biome** et le toochain associé)_, bien qu'il aurait été préférable de le faire dans un projet standard, notamment pour définir un script de formatage dans `package.json`.
  - comme le fichier `.gitignore` initial exclut `.vscode/*`, l'ajout de `.vscode/settings.json` n'est donc pas tracké.
  - le projet commence par un commit d'installation de **Vite** avec le template `react-ts`. Les fichiers initiaux du projet _(Cf. l'archive ZIP fournie)_ ont ensuite été ajoutés _(en écrasant donc les fichiers générés par le CLI de **Vite**)_ afin de voir le diff **Git** aussi bien en terme de configuration _(Cf. le 2e commit)_ que de fichiers applicatifs _(Cf. le 3e commit)_. Etant plutôt familier à **Next.js**, j'avais besoin d'un référentiel _(pour ne pas me poser de questions longtemps concernant les fichiers spécifiques au projet)_.
  - l'option TypeScript `erasableSyntaxOnly` ayant été activée par défaut, aucun Enum n'a été utilisé dans le projet, le but étant de ne pas ajouter des `@ts-expect-error` dans la codebase. Ceci dit, il aurait été bienvenu de pouvoir en utiliser 1 ou 2, notamment au lieu des chaînes de caractères associées au type `Step` afin d'avoir :

    ```ts
    enum Step {
      Initial,
      Loading,
      Fetched,
    }
    ```

## Conventions

- <u>Les conventions de nommage</u> ont été respectées concernant tout code ajouté. Par contre, aucun code présent dans les fichiers initiaux n'a été modifié, volontairement _(pour rester neutre)_, sauf en cas de nécessité :

  - la règle `useNamingConvention` de **Biome** ayant été activée _(en warning)_ et `AcceptCGU` ne respectant pas les conventions — Cf. l'erreur :

    > "Two consecutive uppercase characters are not allowed in PascalCase because strictCase is set to `true`.biomelint/style/useNamingConvention"

    on retrouve donc une petite divergence avec des noms de variable comme `isCguAccepted` _(avec `Cgu` et non `CGU` — c'est un détail, mais c'est mentionné pour que ce ne soit pas perçu comme un manque de rigueur)_. Dans une projet standard, tout aurait été uniformisé.

    _REMARQUE : `isCguAccepted` était initialement nommée `checked`. Avec un verbe modal au début pour rappeler le type booléen et un nom plus proche du "domaine", le code devient plus conventionnel._

- <u>les bonnes pratiques de typage</u> ont été appliquées :

  - Aucun `any`, aucun non-null assertion et aucun casting abusif n'a été ajouté.
  - L'exploitation optimale de l'inférence et du narrowing, l'utilisation de type guards et la définition de types stricts ont été privilégiés.

- <u>les bonnes pratiques en JavaScript</u> ont également été appliquées :

  - lisibilité
  - indentation peu profonde
  - complexité raisonnable _(ni trop basse ni trop grande)_
  - early returns
  - utilisation d'aucun `let`, sauf dans `VisibilityWrapper` pour que l'implémentation reste simple à comprendre. Si le projet mettait à disposition [ts-pattern](https://github.com/gvergnaud/ts-pattern), un pattern matching aurait pu être implémenté, permettant ainsi d'avoir à la fois un `const` _(donc aucune mutation)_ et un code lisible, car avoir ceci n'est pas idéal :

    ```ts
    const isVisible =
      visibleIf && isConditionCguAccepted(visibleIf)
        ? visibleIf["accept-cgu"]
          ? isCguAccepted
          : !isCguAccepted
        : true;
    ```

  - throw early pour des cas qui ne sont pas censés arriver mais que TypeScript et le bundler ne peuvent pas catcher, afin de ne pas avoir d'erreurs silencieuses.

## Implémentation

- le fichier `intents.ts` a finalement été <u>considéré comme une base de données</u> _(c'est-à-dire un ESModule avec juste des données)_, donc la fonction `fetchIntents` a été supprimée en fusionnant avec le code de la fonction `simulatedFetch` créée via un ESModule dédié. Au passage, une fonction `wait` a été extraite dans `helpers.ts` _(en utilisant des constantes pour éviter les magic numbers pour les durées)_ pour améliorer la lisibilité de `simulatedFetch`, au même titre que l'utilisation de `async/await` _(au lieu de la syntaxe classique des promesses)_.

- la fonction `simulatedFetch` <u>prend en compte 2 erreurs différentes</u> _(le cas d'une route qui ne correspond pas au pattern et le cas où la "base de données" n'a pas de `screen_id` correspondant à la route)_, d'autres cas d'erreurs auraient pu être implémentés _(comme par exemple le mock d'une erreur réseau via un throw qui s'exécuterait 10% du temps via une fonction aléatoire juste après le `await wait()`)_. Ceci dit, l'idée était d'<u>implémenter une réponse avec 2 types d'objets différents</u> _(Cf. les types `ResponseValid` et `ResponseError`)_ pour ne pas retourner seulement l'objet des intents, sans pour autant aller jusqu'à générer une réponse HTTP plus complète avec status code et autre.

- <u>la visibilité des composants</u> _(via la fonctionnalité bonus à développer)_ a été <u>gérée avec des mounts/unmounts de composant</u>, ce qui fait que l'état du composant est réinitialisé à chaque fois qu'on accepte les CGU. L'ajout d'un DIV avec jeu au niveau du style _(Cf. `display: none`)_ aurait pu être fait, mais le but était de faire simple. Si le projet comprenait la version 19.2 _(et non 19.1)_, l'utilisation du composant `<Activity>` aurait fait sens.

- <u>des commentaires</u> ont été mis :

  - pour expliquer les choix d'implémentation _(avec `//`)_
  - pour documenter des constantes ou type particuliers _(Cf. des JSDoc avec `/** */`)_
  - pour aérer et "chapitrer" le code _(Cf. les gros blocs avec `/* ******* */`)_

- au lieu de <u>cette structure de données</u> :

  ```js
  "page-b": {
    "accept-cgu": { label: "J’accepte les CGU" },
    "address-form": {
      default: "16 RUE DE LA VILLE LEVEQUE 75008 PARIS",
      "visible-if": { "accept-cgu": true },
    },
    button: { label: "Envoyer" },
  },
  ```

  il aurait sans doute été préférable d'avoir quelque chose comme cela :

  ```js
  "page-b": [
    {
      name: "accept-cgu",
      props: { label: "J’accepte les CGU" },
    },
    {
      name: "address-form",
      props: { default: "16 RUE DE LA VILLE LEVEQUE 75008 PARIS" },
      conditions: { "visible-if": { "accept-cgu": true } },
    },
    {
      name: 'button',
      props: { label: "Envoyer" },
    },
  ],
  ```

  dans le but de :

  - faciliter les traitements côté frontend, en séparant notamment les props des conditions et avec une gestion de la profondeur plus naturelle _(ceci dit, le but de l'exercice était certainement d'imposer quelques contraintes pour voir comment on manipule des structures de données différentes)_.

    _REMARQUE : La question s'est posée de savoir si, dans le mock "serveur" _(dans `simulatedFetch`)_, il ne valait pas mieux faire un traitement pour retourner un objet idéal pour `ScreenRenderer`, mais comme le principal de l'implémentation devait se retrouver dans `ScreenRenderer`, la décision a finalement été de considérer `simulatedFetch` comme un simple sélecteur._

  - garantir l'ordre des composants via un tableau (c'est plus adapté qu'un objet — Cf. [cet article par exemple](https://medium.com/@blue___gene/why-javascript-objects-dont-always-preserve-key-order-and-how-orderedobject-solves-it-ee69b4bc7345))
  - améliorer la lisibilité _(via les propriétés `name`, `props` et `conditions`)_ au détriment du nombre de caractères.

  Si le nombre de caractères est un problème, cette structure _(avec des tuples)_ aurait été bien également :

  ```js
  "page-b": [
    [
      "accept-cgu",
      { label: "J’accepte les CGU" },
      {}, // avec ou sans cet objet vide, mais c'est mieux avec, si on suit les bonnes pratiques
    ],
    [
      "address-form",
      { default: "16 RUE DE LA VILLE LEVEQUE 75008 PARIS" },
      { "visible-if": { "accept-cgu": true } },
    ],
    [
      'button',
      { label: "Envoyer" },
      {},
    ],
  ],
  ```
