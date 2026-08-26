# Portfolio de Rostand Surel

Portfolio statique orienté ML Engineering, MLOps et IA générative. Le site présente les expériences vérifiables du CV canonique et trois études de cas professionnelles.

## Prévisualiser localement

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Structure

- `index.html` : page d'accueil et parcours de conversion ;
- `projets/` : études de cas détaillées ;
- `css/style.css` : design system et responsive ;
- `js/main.js` : menu, thème et année dynamique ;
- `assets/cv/Rostand-Surel-CV.pdf` : CV public canonique ;
- `assets/images/rostand-surel-og.png` : aperçu social ;
- `note/` : audit et documentation de refonte.

## Vérifications avant déploiement

1. Tester tous les liens locaux et externes.
2. Vérifier la console sur les quatre pages.
3. Tester clavier, contraste, zoom 200 % et `prefers-reduced-motion`.
4. Auditer la version publiée avec Lighthouse et PageSpeed Insights.
5. Mettre à jour `sitemap.xml` et les dates lors d'un changement de contenu.

Le site n'utilise ni framework, ni police distante, ni bibliothèque d'icônes, ni formulaire simulé.
