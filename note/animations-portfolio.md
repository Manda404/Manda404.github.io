# Système d'animation du portfolio

Date : 26 août 2026

## Objectif

Redonner un aspect dynamique et mémorable au portfolio sans nuire à la lecture RH, aux performances ou à l'accessibilité.

## Animations ajoutées

- Entrée scénarisée et progressive du hero.
- Animation séquencée des contenus pendant le scroll.
- Barre de progression de lecture en haut de la page.
- Mouvement ambiant très lent du fond lumineux.
- Pulsation du statut de disponibilité.
- Reflet animé sur les boutons d'action.
- Ligne animée dans le panneau de présentation.
- Survol 3D léger sur les cartes de projets et d'expertise.
- Déplacement des flèches sur les liens de projets.
- Micro-interactions sur le logo, la navigation et les étapes du pipeline.

## Principes de qualité

- Les animations utilisent principalement `transform` et `opacity` pour limiter les recalculs de mise en page.
- Les événements de scroll sont regroupés via `requestAnimationFrame`.
- Les révélations utilisent `IntersectionObserver` et s'arrêtent après leur première exécution.
- L'effet 3D est réservé aux périphériques disposant d'un pointeur précis.
- Toutes les animations sont désactivées avec `prefers-reduced-motion: reduce`.
- Le contenu reste visible si `IntersectionObserver` n'est pas disponible.

## Fichiers concernés

- `css/style.css`
- `js/main.js`
