# Hall of Fame WikiMasters

Adresse prévue : https://topwikimasters.netlify.app/

## Contenu
- `public/` : le site (`index.html` et les animations dans `public/gif/`).
- `netlify/functions/votes.mjs` : enregistre les votes dans Netlify Blobs (gratuit, rien à configurer).
- `netlify.toml` et `package.json` : la configuration.

## Mise en ligne
Le glisser-déposer sur app.netlify.com/drop ne déploie pas la fonction de vote. Passe par GitHub :
1. Crée un dépôt GitHub (par exemple `hall-of-fame-wikimasters`) et envoie-y tout le contenu de ce dossier, en gardant les sous-dossiers.
2. Sur Netlify : Add new project → Import an existing project → GitHub → choisis le dépôt. Ne change aucun réglage, ils sont lus dans `netlify.toml`.
3. Renomme le projet en `topwikimasters` pour obtenir l'adresse topwikimasters.netlify.app.

## Votes
Chaque visiteur a un identifiant anonyme gardé dans son navigateur : un vote par navigateur, modifiable à tout moment. Les votes faits sur la version Claude ne sont pas repris.
