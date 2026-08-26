# État de l'art et audit du portfolio de Rostand Surel

> Audit réalisé le 26 août 2026 à partir du dépôt local `Manda404.github.io`.
> Périmètre : contenu, crédibilité, UX/UI, accessibilité, performance, SEO, qualité du code et proposition d'une version améliorée.

> **Statut : audit de la version initiale.** La refonte réalisée à la suite de cet audit est documentée dans [`refonte-portfolio-2026.md`](refonte-portfolio-2026.md). Les défauts décrits ci-dessous servent de trace de décision et ne décrivent plus nécessairement la version actuelle.

## 1. Synthèse exécutive

Le portfolio présente un positionnement professionnel pertinent — Machine Learning, Data Engineering, MLOps et IA générative — ainsi que plusieurs résultats chiffrés intéressants. En revanche, sa version actuelle ne peut pas encore remplir correctement son rôle principal : convaincre rapidement un recruteur ou un client et lui permettre de vérifier les preuves annoncées.

Les problèmes les plus urgents sont des problèmes de confiance :

1. les témoignages parlent de **Danial**, pas de Rostand ;
2. le formulaire affiche « Message Sent! » sans envoyer aucun message ;
3. les six projets ont des liens `href="#"`, donc aucune démo ni aucun dépôt n'est consultable ;
4. les deux liens « View My Work / View All Projects » mènent vers une page absente ;
5. le bouton de téléchargement du CV vise un fichier absent ;
6. le contenu du site est en retard sur le CV le plus récent présent localement ;
7. un script chargé en production cherche des éléments GitHub inexistants et provoque une erreur JavaScript.

### Score indicatif

| Axe | Score | Diagnostic |
|---|---:|---|
| Positionnement | 6/10 | Domaine clair, mais proposition de valeur trop large et peu différenciante |
| Contenu et preuves | 3/10 | Résultats chiffrés, mais projets invérifiables et incohérences majeures |
| UX et conversion | 4/10 | Structure classique, mais parcours principal cassé et page trop longue |
| UI et cohérence visuelle | 5/10 | Thèmes et composants présents, mais trop d'effets et manque de hiérarchie éditoriale |
| Accessibilité | 3/10 | Plusieurs contrôles non sémantiques, animations non désactivables, navigation clavier incomplète |
| Performance | 4/10 | Site statique léger en médias, mais canvas et animations permanentes coûteuses |
| SEO et partage | 4/10 | Métadonnées de base correctes, mais médias sociaux, favicon et pages cibles absents |
| Maintenabilité | 3/10 | Pas de build obligatoire, mais CSS/JS volumineux, code mort, debug et absence de tests |
| **Score global indicatif** | **40/100** | Bonne matière professionnelle, exécution actuelle insuffisamment fiable |

Ce score n'est pas un résultat Lighthouse. C'est une appréciation argumentée issue de l'audit statique. Les Core Web Vitals, les contrastes réels et le rendu responsive devront être mesurés après correction.

## 2. Ce qu'un portfolio technique de référence doit faire en 2026

Un portfolio performant ne doit pas être une copie animée du CV. Il doit permettre, en moins d'une minute, de répondre à cinq questions :

1. Quel problème cette personne sait-elle résoudre ?
2. Pour quel type d'entreprise ou d'équipe ?
3. Qu'a-t-elle réellement construit ?
4. Quelles preuves permettent de vérifier ses affirmations ?
5. Comment la contacter sans friction ?

### Standards attendus

- Une promesse précise au-dessus de la ligne de flottaison, accompagnée d'un CTA principal fonctionnel.
- Deux ou trois études de cas profondes, plutôt que six cartes superficielles.
- Des preuves : dépôt, démo, captures, architecture, métriques, tests, limites et rôle exact.
- Une lecture « recruteur » rapide et une lecture « pair technique » plus détaillée.
- Une interface calme : la motion soutient la compréhension et respecte `prefers-reduced-motion`.
- Un socle accessible au niveau WCAG 2.2 AA : navigation clavier, focus visible, contrôles sémantiques, contenu animé contrôlable.
- Une bonne expérience terrain visant LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1 au 75e percentile.
- Des titres, descriptions, données structurées et images sociales cohérents avec le contenu visible.

Références : [WCAG 2.2 et ses nouveaux critères](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), [animation et préférences utilisateur](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions), [seuils Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds), [bonnes pratiques des titres Google](https://developers.google.com/search/docs/appearance/title-link).

## 3. Inventaire factuel du projet

- Une seule page HTML : `index.html`, 1 046 lignes, environ 48 Ko.
- Trois feuilles CSS : 3 563 lignes, environ 76 Ko.
- Neuf scripts JavaScript : 1 669 lignes, environ 76 Ko.
- Deux PDF de CV présents localement, dont un non suivi par Git.
- Deux témoignages et deux portraits.
- Aucun dossier `pages/`, aucune image Open Graph, aucun favicon et aucun manifeste dans le dépôt.
- Aucun `README` racine, test automatisé, configuration Lighthouse, linter ou workflow CI visible.
- Le dépôt suit par erreur un fichier `.DS_Store`.

## 4. Points négatifs, classés par priorité

### P0 — À corriger avant toute diffusion

#### 4.1 Témoignages attribués à une autre personne

`assets/testimonials.json` contient deux longues recommandations qui nomment explicitement « Danial » et décrivent son travail chez Samsung. Le site les affiche pourtant dans le portfolio de Rostand.

**Impact :** perte immédiate de crédibilité, risque réputationnel et possible problème de consentement/droit à l'image.

**Action :** retirer entièrement la section jusqu'à réception de témoignages authentiques, vérifiés et autorisés. Ne jamais simplement remplacer le prénom dans le texte d'un tiers.

#### 4.2 Faux formulaire de contact

Le gestionnaire de formulaire dans `js/main.js` intercepte la soumission, attend deux secondes, affiche « Message Sent! », puis efface les champs. Aucun réseau, service de formulaire ou envoi d'e-mail n'est effectué.

**Impact :** les opportunités sont perdues et l'utilisateur est induit en erreur.

**Action :** connecter un vrai endpoint (service de formulaire, fonction serverless ou API), gérer erreurs et anti-spam, ou supprimer le formulaire et conserver un lien e-mail explicite. Le message de succès ne doit apparaître qu'après confirmation serveur.

#### 4.3 Parcours projets cassé

- `pages/projects.html` n'existe pas ;
- « View My Work » et « View All Projects » conduisent donc à une 404 ;
- les sept icônes de démo/GitHub utilisent `href="#"` ;
- aucune capture, dépôt, démonstration, étude de cas ou documentation ne prouve que les six projets existent.

**Impact :** le CTA principal échoue et la compétence technique ne peut pas être vérifiée.

**Action :** ne publier que deux ou trois projets réels. Pour chacun : URL valide, rôle, contexte, architecture, décisions, résultat mesuré, limites, captures et instructions de reproduction. Si un projet est confidentiel, le dire et présenter un cas anonymisé honnête.

#### 4.4 Téléchargement du CV cassé

Le HTML pointe vers `/assets/cv/Rostand_Surel_CV.pdf`, mais ce fichier n'existe pas. Les fichiers présents sont `Rostand_Surel.pdf` et `ML_Engineer_Rostand_Surel___LLM.pdf`.

**Impact :** échec d'une action de conversion essentielle.

**Action :** choisir une version canonique, lui donner un nom stable (`Rostand-Surel-CV.pdf`), corriger le lien et tester la réponse HTTP. Le PDF récent n'est actuellement pas suivi par Git et ne serait donc pas déployé.

#### 4.5 Données professionnelles incohérentes ou obsolètes

Le site indique 4 ans d'expérience, Versailles, et AXA « Jan 2025 – Present ». Le PDF local le plus récent indique 5 ans, Paris, une fin AXA en janvier 2026 et une nouvelle mission Bulls depuis février 2026. Les certifications diffèrent également.

**Impact :** doute sur la fraîcheur et la véracité du profil.

**Action :** créer une source de vérité unique pour les dates, postes, localisation, certifications et métriques. Mettre à jour simultanément HTML, JSON-LD, description SEO et CV.

### P1 — Fort impact sur la confiance et la conversion

#### 4.6 Positionnement trop large

Le hero empile Data Engineering, Machine Learning, MLOps, Generative AI et Agentic Workflows. Cette largeur montre de la polyvalence mais ne dit pas clairement quel poste est recherché, quel problème prioritaire est résolu ni pourquoi choisir Rostand plutôt qu'un autre profil.

**Action :** choisir une phrase centrale, par exemple :

> ML Engineer spécialisé Databricks — je transforme des données métier en modèles déployés, suivis et utilisables en production.

L'IA générative peut rester un axe secondaire démontré par un projet concret.

#### 4.7 Hero trop long et redondant

Deux paragraphes détaillés, cinq mots tournants, quatre statistiques, deux CTA et un réseau animé se disputent l'attention. « 4+ », « 5M+ » et les quatre secteurs sont ensuite répétés dans la section About.

**Action :** une promesse, une phrase de preuve, un CTA principal, un CTA secondaire et trois preuves maximales.

#### 4.8 Projets décrits comme des concepts, pas comme des réalisations

Les descriptions utilisent surtout « assistant that… », « workflow for… », « pipeline that… ». Elles ne donnent ni statut, ni période, ni taille des données, ni rôle personnel, ni métriques techniques, ni résultat observé.

**Action :** distinguer clairement : projet livré, prototype, projet personnel, concept ou travail confidentiel. Utiliser le format Problème → Contraintes → Décisions → Résultat → Preuves.

#### 4.9 Résultats chiffrés insuffisamment contextualisés

`+18%`, `65%`, `+24%`, `40%` et `5M+` attirent l'œil, mais l'unité, la base de comparaison, la méthode de mesure et la responsabilité exacte ne sont pas expliquées.

**Action :** préciser « +18 % de précision par rapport au modèle de référence », « temps médian d'analyse réduit de X à Y », ou rester qualitatif si la mesure n'est pas publiable.

#### 4.10 Timeline imposée et dupliquée

Les quatre expériences sont dupliquées dans le HTML pour produire un défilement infini. La timeline se déplace automatiquement pendant 30 secondes et ne se met en pause qu'au survol, comportement indisponible sur tactile et peu évident au clavier.

**Impact :** lecture difficile, contenu dupliqué pour les technologies d'assistance et impression de gadget.

**Action :** remplacer par une timeline verticale statique, récente vers ancienne, avec détails dépliables facultatifs.

#### 4.11 Architecture de contenu trop longue

Le site additionne Hero, About, Skills, Education, Certifications, Experience, six Projects, Testimonials, Contact et Footer. Les sections About/Skills/Experience répètent une grande partie du CV avant d'arriver aux preuves.

**Action :** priorité à Hero → preuves → études de cas → expérience courte → à propos → contact. Les compétences doivent être démontrées dans les projets, pas seulement listées.

#### 4.12 Certifications non vérifiables

Les certifications apparaissent comme des badges textuels « DBX », « DL », « NLP », « AZ », « PY », sans organisme complet, date, identifiant ou lien de vérification.

**Action :** ne garder que les certifications importantes et ajouter les liens officiels de validation.

### P1 — Accessibilité et inclusion

#### 4.13 Menu mobile non sémantique

Le hamburger est un `<div>`, sans rôle de bouton, nom accessible, `aria-controls` ni `aria-expanded`. Il n'est pas naturellement atteignable ou activable au clavier.

**Action :** utiliser `<button type="button">`, fournir un nom, mettre à jour `aria-expanded`, relier le menu et gérer Escape/focus.

#### 4.14 Absence de lien d'évitement et de landmark principal

Il n'existe ni lien « Aller au contenu », ni élément `<main>`. La navigation répétée doit donc être parcourue à chaque chargement par les utilisateurs clavier/lecteur d'écran.

#### 4.15 Motion excessive et aucun mode réduit

Le site cumule : canvas animé en permanence, texte tournant toutes les 3 secondes, réseau animé, timeline automatique, témoignages en marquee via `requestAnimationFrame`, parallax et animations au scroll. Aucun `@media (prefers-reduced-motion: reduce)` n'a été trouvé.

**Impact :** distraction, nausées possibles, consommation CPU/batterie et dégradation potentielle de l'INP.

**Action :** désactiver toute animation non essentielle lorsque l'utilisateur demande moins de mouvement ; fournir pause/lecture pour tout contenu auto-animé ; arrêter les boucles quand l'onglet est masqué.

#### 4.16 Témoignages impossibles à contrôler

Le carrousel démarre automatiquement, ne propose ni pause, ni navigation, ni réduction de mouvement. Le contenu dupliqué est injecté deux fois dans le DOM.

#### 4.17 Focus clavier incomplet

Le CSS définit surtout des états `:hover`. Aucun système global cohérent `:focus-visible` n'est appliqué aux liens, boutons, cartes et contrôles. Les liens projets factices renvoient en haut de la page.

#### 4.18 Statuts du formulaire non annoncés

« Sending… » et « Message Sent! » remplacent le contenu du bouton sans région `aria-live`. Les erreurs serveur et messages de validation accessibles n'existent pas.

#### 4.19 Hiérarchie de titres imparfaite

La section Skills passe d'un `<h2>` directement à plusieurs `<h4>`. Les titres doivent refléter la structure du document, probablement avec des `<h3>`.

#### 4.20 Éléments décoratifs non neutralisés

Le canvas et plusieurs emojis/icônes décoratifs n'ont pas toujours `aria-hidden="true"`. Ils risquent d'ajouter du bruit dans la restitution vocale.

#### 4.21 Contrastes non prouvés

Les couleurs secondaires bleu-gris sur fond sombre, les textes tertiaires et les transparences doivent être mesurés. Aucun audit automatisé ou manuel de contraste n'est fourni.

### P1 — Performance et qualité d'expérience

#### 4.22 Canvas coûteux exécuté à chaque frame

`interactive-bg.js` fait 620 lignes, crée jusqu'à 51 formes plus plusieurs réseaux, maillages et lignes, puis recalcule et redessine tout à chaque `requestAnimationFrame`. `drawConnections()` compare les formes deux à deux. La boucle continue sans tenir compte de la visibilité de l'onglet ou de la préférence de mouvement.

**Action :** supprimer le canvas dans la version sobre recommandée, ou réduire fortement sa complexité, plafonner le DPR, mettre en pause hors écran et mesurer l'impact sur appareils modestes.

#### 4.23 Trop de boucles et d'effets simultanés

Timeline CSS, témoignages JS, hero et canvas fonctionnent en continu. Les transformations JS sur scroll et hover dupliquent en partie le travail déjà réalisé en CSS.

#### 4.24 Transitions globales

`themes.css` applique une transition à `*`. Cela anime potentiellement des propriétés sur tous les éléments lors d'un changement de thème et peut créer un coût inutile.

#### 4.25 Police chargée mais non utilisée

Le HTML télécharge Montserrat depuis Google Fonts, alors que `body` demande Inter. Le navigateur tombe donc sur une police système et le téléchargement Montserrat est inutile.

#### 4.26 Dépendance Font Awesome sur CDN

Une feuille externe complète est chargée pour quelques icônes. Cela ajoute une connexion et une dépendance tierce alors que le site contient déjà des SVG inline.

#### 4.27 Cache explicitement désactivé

Les balises `Cache-Control: no-cache, no-store` contredisent l'objectif de performance. Les balises meta ne remplacent pas une vraie stratégie HTTP et les query strings restent figées à `v=1.0`.

#### 4.28 Pas de budget ni mesure de performance

Aucune trace de Lighthouse CI, WebPageTest, RUM ou budget de poids. Ne pas annoncer un bon score avant de mesurer sur la version déployée et sur mobile.

### P1 — SEO, partage et découvrabilité

#### 4.29 Image Open Graph absente

`og:image` et `twitter:image` pointent vers `assets/images/og-image.jpg`, qui n'existe pas dans le dépôt.

#### 4.30 Favicons et manifeste absents

Les quatre icônes référencées et `site.webmanifest` sont absents. Cela génère des 404 et dégrade l'identité dans les onglets, favoris et aperçus.

#### 4.31 Pages profondes absentes

Sans pages de projets, le site ne peut pas cibler des requêtes spécifiques, obtenir des liens vers des études de cas ou fournir des aperçus sociaux distincts.

#### 4.32 Pas de fichiers SEO techniques visibles

Le dépôt ne contient ni `sitemap.xml` ni `robots.txt`. Pour un site d'une page, l'impact est limité, mais ils deviennent utiles dès l'ajout des études de cas.

#### 4.33 Métadonnées déconnectées du contenu actuel

La description, le JSON-LD et la page répètent « 4 years » et l'ancienne situation professionnelle. Les données structurées doivent rester strictement cohérentes avec ce que voit l'utilisateur.

#### 4.34 `meta keywords` inutile

La longue liste de mots-clés n'apporte pas de bénéfice moderne notable et donne une impression de bourrage. Mieux vaut produire des études de cas réellement indexables.

### P2 — Maintenabilité et robustesse technique

#### 4.35 Erreur JavaScript du composant GitHub

`github-contributions.js` est chargé sur la page, mais aucun `#prev-slide`, `#next-slide` ou `#contribution-grid` n'existe. Le constructeur appelle immédiatement `addEventListener` sur `null`.

**Action :** supprimer le script et ses styles morts, ou protéger l'initialisation et réintroduire un composant réel. Les données actuellement générées par `Math.random()` ne doivent jamais être présentées comme de vraies contributions.

#### 4.36 Script de debug livré en production

`timeline-debug.js` ne sert qu'à écrire des diagnostics dans la console. `hero-animations.js`, `blog-filter.js` et `projects-filter.js` contiennent aussi de nombreux `console.log`.

#### 4.37 Code mort important

Les scripts de filtres Blog/Projects ne sont pas chargés par `index.html` et les pages qu'ils visaient n'existent pas. Une grande partie du CSS concerne blog, article, GitHub contributions, newsletter et autres composants absents.

#### 4.38 Bug à chaque pression sur Escape

Le gestionnaire clavier de `main.js` crée un **nouvel objet `Portfolio`** à chaque pression sur Escape. Chaque instance réenregistre des écouteurs, observateurs et effets de scroll, ce qui peut multiplier le travail et les comportements.

#### 4.39 Gestion du thème incohérente

Le thème initial est fondé sur l'heure, pas réellement sur la préférence système. `setTheme()` enregistre immédiatement ce choix dans `localStorage`, ce qui empêche ensuite l'écoute de la préférence système d'avoir l'effet prévu. La fonction `getSystemTheme()` existe mais n'est pas utilisée.

#### 4.40 Manipulations JS/CSS concurrentes

Les cartes ont des transformations au hover dans le CSS et dans JavaScript. Les animations au scroll écrivent des délais dans `animationDelay` alors que leur apparition utilise surtout des transitions. Cette superposition rend le comportement difficile à prédire.

#### 4.41 Gestionnaires non nettoyables

Le canvas enregistre des fonctions fléchées anonymes, mais `destroy()` tente de retirer d'autres références (`this.resizeCanvas`, `this.updateMouse`). Le nettoyage ne peut donc pas fonctionner correctement.

#### 4.42 Pas de garde sur certains éléments DOM

`ThemeSwitcher` et `GitHubContributions` supposent que leurs éléments existent. Le premier fonctionne aujourd'hui uniquement parce que le bouton est présent ; le second casse déjà.

#### 4.43 Injection HTML depuis JSON

Les témoignages sont assemblés avec des chaînes puis affectés à `innerHTML`, sans échappement. Le JSON est local aujourd'hui, mais ce modèle devient une surface XSS si la source devient éditable ou distante.

#### 4.44 Monolithe CSS

`style.css` dépasse 3 000 lignes et mélange page d'accueil, pages inexistantes, articles, composants, responsive et correctifs successifs. Plusieurs media queries se répètent et de nombreux styles utilisent `transition: all`.

#### 4.45 Absence de tests et de CI

Il manque au minimum : validation des liens locaux, test du formulaire, contrôle des erreurs console, audit axe, Lighthouse, vérification HTML et capture responsive.

#### 4.46 Hygiène du dépôt

`.DS_Store` est suivi. Le CV le plus récent est non suivi. Il n'existe pas de documentation expliquant comment prévisualiser, tester et déployer le site.

## 5. Proposition de version améliorée

### 5.1 Objectif produit

Transformer le site en preuve de compétence pour un poste de ML Engineer / AI Engineer orienté production, avec un parcours qui mène naturellement de la promesse aux preuves puis au contact.

### 5.2 Architecture de l'information recommandée

1. **Navigation sobre** : Projets, Expérience, À propos, CV, Contact.
2. **Hero** : rôle précis, spécialité, disponibilité, deux CTA fonctionnels.
3. **Bandeau de preuves** : 5M de lignes, +18 % sur la détection, quatre certifications vérifiées — seulement si les définitions sont explicites.
4. **Deux ou trois études de cas** : une ML/MLOps, une GenAI/RAG, une Data Platform.
5. **Expérience** : liste verticale courte, sans défilement automatique.
6. **Compétences** : regroupées par capacités, reliées aux études de cas.
7. **À propos** : méthodes de travail, langues, localisation et type d'opportunité.
8. **Contact** : e-mail, LinkedIn, GitHub et formulaire réellement fonctionnel ou absent.
9. **Footer** : mentions minimales, statut de mise à jour, liens utiles.

### 5.3 Nouveau hero proposé

**Sur-titre**

> ML Engineer · Databricks · MLOps · GenAI

**Titre**

> Je transforme des données métier en systèmes ML fiables, déployés et mesurables.

**Description**

> 5 ans d'expérience en assurance, industrie, média et énergie. De la pipeline PySpark au model serving, avec une spécialisation récente en RAG et agents IA.

**CTA**

- Principal : « Voir les études de cas » → `#case-studies`
- Secondaire : « Télécharger le CV » → PDF vérifié
- Tertiaire discret : GitHub / LinkedIn

Supprimer le mot tournant et le réseau d'emojis. Une animation subtile facultative peut rester, mais elle ne doit ni ralentir ni détourner du message.

### 5.4 Modèle d'étude de cas

Chaque étude de cas doit contenir :

- **Contexte** : entreprise réelle, cas anonymisé ou projet personnel ;
- **Problème** : décision métier à améliorer ;
- **Contraintes** : volume, latence, confidentialité, explicabilité, coût ;
- **Rôle** : ce que Rostand a personnellement réalisé ;
- **Architecture** : schéma simple et stack justifiée ;
- **Décisions** : alternatives considérées et compromis ;
- **Résultats** : métriques définies et méthode de mesure ;
- **Qualité** : tests, observabilité, sécurité, évaluation ;
- **Limites** : ce qui reste à améliorer ;
- **Preuves** : dépôt, démo, capture, notebook ou documentation.

### 5.5 Direction visuelle

- Fond neutre, une seule couleur d'accent et typographie cohérente.
- Largeur de lecture limitée, espace vertical généreux, titres plus courts.
- Cartes réservées aux éléments réellement comparables ; éviter de tout encadrer.
- Captures de produits et schémas d'architecture à la place des emojis décoratifs.
- Une seule interaction distinctive, pas cinq animations simultanées.
- Thème sombre/clair fondé sur la préférence système avec bouton accessible.

### 5.6 Architecture technique recommandée

Le site peut rester statique : HTML sémantique, CSS modulaire et JavaScript minimal. Aucun framework n'est nécessaire pour trois études de cas.

Structure possible :

```text
/
├── index.html
├── projects/
│   ├── churn-mlops.html
│   ├── enterprise-rag.html
│   └── data-platform.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── cv/Rostand-Surel-CV.pdf
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── pages.css
├── js/main.js
├── robots.txt
├── sitemap.xml
└── README.md
```

JavaScript uniquement pour : menu mobile, thème, formulaire et éventuelle navigation progressive. Le contenu essentiel doit rester utilisable si JavaScript échoue.

## 6. Roadmap recommandée

### Phase 1 — Assainissement immédiat (P0)

- Retirer les témoignages incorrects.
- Remplacer le faux formulaire par un contact honnête.
- Corriger le lien du CV et versionner le bon PDF.
- Supprimer tous les liens `#` ou fournir de vraies destinations.
- Retirer les liens vers `pages/projects.html` tant que la page n'existe pas.
- Mettre à jour expérience, dates, localisation, certifications et JSON-LD.
- Retirer `github-contributions.js` et `timeline-debug.js` de la production.

**Critère de sortie :** aucun CTA cassé, aucune fausse confirmation, aucune information attribuée à un tiers.

### Phase 2 — Refonte éditoriale

- Choisir un positionnement principal.
- Réécrire le hero.
- Produire deux études de cas complètes avec preuves.
- Réduire les répétitions About/Skills/Experience.
- Définir chaque métrique et vérifier l'autorisation de publication.

**Critère de sortie :** un recruteur peut comprendre le profil et ouvrir une preuve en moins de 60 secondes.

### Phase 3 — UX, accessibilité et visuel

- Remplacer les marquees par du contenu statique.
- Implémenter les contrôles sémantiques, focus, skip link et `<main>`.
- Ajouter `prefers-reduced-motion` et supprimer le canvas permanent.
- Tester clavier, lecteur d'écran, zoom 200 %, contrastes et responsive.
- Créer les images projets et l'image sociale.

**Critère de sortie :** parcours complet au clavier et aucun contenu essentiel auto-animé.

### Phase 4 — Performance, SEO et qualité

- Supprimer CSS/JS morts et dépendances inutiles.
- Corriger la police, le cache, les favicons et le manifeste.
- Ajouter pages projets, sitemap et métadonnées propres à chaque page.
- Mettre en place tests de liens, axe et Lighthouse CI.
- Mesurer la version déployée sur mobile.

**Critère de sortie :** zéro erreur console/404, liens testés, WCAG 2.2 AA ciblé, objectifs LCP/INP/CLS atteints sur données réelles ou explicitement suivis.

## 7. Checklist de recette

### Contenu et confiance

- [ ] Chaque affirmation professionnelle correspond au CV canonique.
- [ ] Chaque chiffre est défini et défendable.
- [ ] Chaque témoignage est authentique et autorisé.
- [ ] Chaque projet indique son statut et le rôle exact.
- [ ] Aucun lien ne pointe vers `#` par défaut.

### Fonctionnel

- [ ] Tous les liens internes répondent sans 404.
- [ ] Le CV se télécharge avec le bon nom.
- [ ] Le formulaire envoie réellement ou n'est pas affiché.
- [ ] Aucun message de succès n'est simulé.
- [ ] La console reste sans erreur au chargement et pendant les interactions.

### Accessibilité

- [ ] Lien d'évitement et `<main>` présents.
- [ ] Menu mobile utilisable au clavier avec états ARIA.
- [ ] Focus visible sur tous les contrôles.
- [ ] Ordre des titres logique.
- [ ] Contrastes AA vérifiés.
- [ ] Zoom à 200 % sans perte de contenu.
- [ ] Mode réduit sans canvas, marquee, parallax ou texte tournant.
- [ ] Messages du formulaire annoncés et associés aux champs.

### Performance et SEO

- [ ] LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1 au 75e percentile lorsque les données terrain sont disponibles.
- [ ] Aucune boucle d'animation permanente inutile.
- [ ] Une seule famille de police réellement utilisée.
- [ ] Image Open Graph, favicons et manifeste valides.
- [ ] Titre, H1, description, canonical et JSON-LD cohérents.
- [ ] Sitemap actualisé dès que les pages projets existent.

### Qualité du dépôt

- [ ] `.DS_Store` ignoré et non versionné.
- [ ] Aucun script de debug en production.
- [ ] Aucun composant absent initialisé par JavaScript.
- [ ] CSS et JavaScript morts supprimés.
- [ ] README avec prévisualisation, tests et déploiement.
- [ ] CI avec vérification des liens et audit automatisé.

## 8. Limites de cet audit

L'audit repose sur le code et les fichiers du dépôt local. Le navigateur intégré n'étant pas disponible pendant cette analyse, les éléments suivants restent à vérifier sur un rendu réel : contrastes calculés, ordre de focus complet, comportement aux largeurs 320/768/1024/1440 px, erreurs réseau de la version déployée, Core Web Vitals, captures sociales et compatibilité multi-navigateurs.

Cette limite ne remet pas en cause les défauts factuels documentés ci-dessus : chemins locaux absents, liens factices, faux envoi, témoignages d'une autre personne, incohérences du CV et initialisation JavaScript sur des éléments inexistants sont directement vérifiables dans le dépôt.
