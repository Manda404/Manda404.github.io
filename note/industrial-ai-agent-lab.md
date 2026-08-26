# Industrial AI Agent Lab — cadrage des concepts

Date : 26 août 2026

## Positionnement

Cette section du portfolio présente trois **concepts R&D à construire**. Ils ne doivent jamais être décrits comme des produits livrés, des missions client ou des dépôts existants. Les architectures et KPI sont des propositions destinées à montrer une capacité de cadrage produit et d'AI Engineering industriel.

## Pourquoi ces trois sujets

Le NIST cite notamment la maintenance prédictive, le contrôle qualité, la sécurité, la prévision et les assistants documentaires parmi les usages de l'IA en production. Son programme Industrial AI insiste aussi sur la nécessité de partir d'un besoin système explicite et d'évaluer l'IA dans le contexte de ses utilisateurs.

- Source : [NIST — The Rise of AI in U.S. Manufacturing](https://www.nist.gov/mep/rise-artificial-intelligence-ai-us-manufacturing-text-only)
- Source : [NIST — Industrial Artificial Intelligence Management and Metrology](https://www.nist.gov/programs-projects/industrial-artificial-intelligence-management-and-metrology-iaimm)
- Source : [NIST — AI for Manufacturing](https://www.nist.gov/programs-projects/artificial-intelligence-ai-manufacturing)

Le DOE documente de son côté l'intérêt du demand response industriel : adapter certains plannings de production aux prix ou événements de demande tout en tenant compte des contraintes opérationnelles.

- Source : [DOE — Demand Response in Industrial Facilities](https://betterbuildingssolutioncenter.energy.gov/sites/default/files/attachments/Demand%20Response%20in%20Industrial%20Facilities_Final.pdf)
- Source : [DOE — Industrial Technology Validation software tools](https://www.energy.gov/cmei/ito/ito-software-tools)

## Concepts retenus

### 1. ReliabilityOps Agent

- Problème : réduire le temps entre une alerte machine et une intervention exploitable.
- Données : capteurs, alarmes, historian, GMAO, manuels, ordres de travail.
- Sorties : causes classées et sourcées, checklist, pièces probables, brouillon d'ordre de travail.
- KPI cibles : MTTR, first-time-fix, faux positifs, temps de triage.
- Garde-fou : aucune commande autonome vers PLC, SCADA ou machine ; validation technicien obligatoire.

### 2. QualityRoot Agent

- Problème : accélérer la recherche de cause racine après une non-conformité.
- Données : vision, contrôle, MES, lots matière, paramètres process, FMEA, CAPA.
- Sorties : hypothèses réfutables, périmètre de lots, tests de confirmation, brouillon CAPA.
- KPI cibles : temps de RCA, précision du périmètre, rebuts/retouches, récurrence.
- Garde-fou : l'agent ne déclare pas une causalité et ne libère aucun lot ; approbation qualité obligatoire.

### 3. EnergyShift Agent

- Problème : arbitrer pics de consommation, coût, carbone et planning de production.
- Données : compteurs, BMS, MES, tarifs, météo, stockage, contraintes process.
- Sorties : scénarios calculés, compromis expliqués, proposition de décalage de charge.
- KPI cibles : pic kW, kWh/unité, coût/unité, intensité carbone, respect du planning.
- Garde-fou : mode recommandation/read-only ; aucun accès transactionnel direct aux ICS.

## Règles de crédibilité

1. Toujours afficher « Concept R&D · à construire ».
2. Employer « KPI cibles », jamais « résultats » avant expérimentation.
3. Séparer les décisions probabilistes du LLM des calculs déterministes du solveur.
4. Exiger sources, traces d'outils, contrôles d'accès et approbation humaine.
5. Commencer par du replay historique ou du shadow mode avant tout workflow opérationnel.
6. Évaluer sécurité, fiabilité et impact utilisateur selon une logique de gestion des risques inspirée du [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework).
