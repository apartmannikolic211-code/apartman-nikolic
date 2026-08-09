# Apartman Nikolić — site vitrine et de réservation

Site multi-pages en **HTML / CSS / JavaScript pur** (aucun framework, aucun backend, aucune base de
données), conforme au cahier des charges « Maison Kamena » v1.0, avec deux évolutions demandées par le
client :

1. Le nom du projet a été remplacé par **Apartman Nikolić**.
2. Le site est disponible en **4 langues** : Hrvatski (Croate, langue par défaut), English, Deutsch,
   Français — sélecteur de langue dans l'en-tête, choix mémorisé dans le navigateur (`localStorage`).

## Démarrage

Le site est 100 % statique. Deux façons de le tester :

- **Ouvrir `index.html` directement dans un navigateur** (double-clic) — fonctionne car aucun fichier
  n'est chargé via `fetch()`.
- **Servir le dossier avec un petit serveur local** (recommandé, plus proche des conditions réelles
  d'hébergement) :
  ```
  npx serve .
  # ou
  python -m http.server 8000
  ```

## Arborescence

```
index.html      Accueil
rooms.html      Nos chambres (fiches détaillées en fenêtre modale)
gallery.html    Galerie (filtres + visionneuse plein écran)
booking.html    Réservation (calendrier, calcul du prix, envoi email)
about.html      À propos
reviews.html    Avis clients
faq.html        FAQ
contact.html    Contact (carte, WhatsApp, formulaire)

assets/css/style.css     Design system complet (couleurs, typographies, composants)
assets/js/config.js      *** Toutes les valeurs à personnaliser (voir ci-dessous) ***
assets/js/i18n.js        Dictionnaire de traduction HR / EN / DE / FR + moteur de traduction
assets/js/rooms-data.js  Données des 3 chambres (prix, photos)
assets/js/main.js        Navigation, sélecteur de langue, bouton WhatsApp
assets/js/rooms-ui.js    Fenêtre modale « fiche chambre », affichage des prix
assets/js/calendar.js    Calendrier de réservation réutilisable
assets/js/booking.js     Logique de la page Réservation
assets/js/contact.js     Logique du formulaire de contact
assets/js/faq.js         Accordéon FAQ
assets/js/gallery.js     Filtres et visionneuse de la galerie
```

## Configuration à faire avant mise en ligne

Tout se passe dans **`assets/js/config.js`** :

| Clé | Description |
|---|---|
| `whatsappNumber` | Numéro WhatsApp au format international, chiffres seuls (ex. `385991234567`) |
| `contactPhoneDisplay` | Numéro affiché sur le site |
| `contactEmail` | Adresse email de réception des demandes |
| `address` | Adresse complète affichée sur le site |
| `mapEmbedSrc` / `mapLink` | Voir « Localisation » ci-dessous |
| `emailjs.*` | Voir « Envoi des emails » ci-dessous |

### Tarifs et données des chambres

Dans **`assets/js/rooms-data.js`** : prix par nuit (`price`) et photos (`heroImage`, `images`).

Les noms, descriptions et équipements des chambres sont dans `assets/js/i18n.js`, sous
`I18N.<langue>.rooms.I / II / III`, à modifier dans les 4 langues.

Le calendrier de réservation ne bloque volontairement aucune date : toutes les dates futures sont
sélectionnables, y compris celles déjà réservées ailleurs (le site n'a pas de base de données, voir
section 6.2 du cahier des charges — c'est au propriétaire de détecter les doublons en validant les
emails reçus). Une gestion des dates indisponibles pourra être réintroduite plus tard si le volume de
réservations le justifie (voir recommandation section 6.2 du cahier des charges).

### Photos

Toutes les images sont actuellement des **photos de démonstration libres de droits** (service Picsum),
utilisées comme visuels de substitution en attendant les vraies photos (cahier des charges, section 7).
Pour les remplacer :
- Chambres/galerie/hero : remplacer les URLs `https://picsum.photos/seed/...` par vos propres fichiers
  (ex. `assets/img/chambre-more-1.webp`) dans `rooms-data.js`, `index.html`, `rooms.html`, `gallery.html`.
- Compresser les photos et les convertir en WebP avant mise en ligne (exigence de performance du cahier
  des charges, section 4.2).

### Localisation (Google Maps)

`SITE_CONFIG.mapEmbedSrc` pointe actuellement sur un repère provisoire (Split, Croatie). Une fois
l'adresse exacte connue :
1. Ouvrir Google Maps → rechercher l'adresse → **Partager → Intégrer une carte** → copier l'URL du
   `src="..."` de l'iframe fournie.
2. Coller cette URL dans `mapEmbedSrc`.
3. Mettre à jour `mapLink` avec le lien classique Google Maps (bouton « Itinéraire »).
4. Mettre à jour l'adresse structurée (`address`, `PostalAddress`) dans `assets/js/config.js` **et** dans
   le bloc JSON-LD `LodgingBusiness` en haut de `index.html`.

### Envoi des emails de réservation (EmailJS)

Le site n'a pas de backend : l'envoi des emails passe par [EmailJS](https://www.emailjs.com), comme
recommandé dans le cahier des charges (section 6.3).

1. Créer un compte gratuit sur EmailJS.
2. **Email Services** → ajouter un service (ex. Gmail) → noter le **Service ID**.
3. **Email Templates** → créer un modèle pour les demandes de réservation, avec les variables :
   `{{room_name}}`, `{{arrival_date}}`, `{{departure_date}}`, `{{nights}}`, `{{total_price}}`,
   `{{guest_name}}`, `{{guest_phone}}`, `{{guest_email}}`, `{{guest_message}}` → noter le **Template ID**.
4. Créer un second modèle pour le formulaire de contact avec les variables : `{{sender_name}}`,
   `{{sender_email}}`, `{{subject}}`, `{{message}}` → noter ce **Template ID**.
5. **Account → General** → copier la **Public Key**, puis la restreindre au nom de domaine du site une
   fois celui-ci en ligne (onglet Security / Allowed origins).
6. Renseigner ces 4 valeurs dans `assets/js/config.js` → `emailjs: { publicKey, serviceId,
   bookingTemplateId, contactTemplateId }`.

Tant que ces valeurs restent à `"YOUR_..."`, les formulaires affichent un message d'erreur explicite
(au lieu d'échouer silencieusement) et un avertissement apparaît dans la console du navigateur.

### Anti-spam (section 4.4 du cahier des charges)

En l'absence de clé reCAPTCHA/hCaptcha réelle, deux protections légères sont déjà actives sur les deux
formulaires :
- un **champ honeypot** invisible (les robots le remplissent, les humains ne le voient jamais) ;
- un **délai minimum** avant envoi (`minFormFillTimeMs` dans `config.js`), un remplissage trop rapide
  étant un signe classique de robot.

Pour ajouter un vrai reCAPTCHA/hCaptcha : créer une clé de site sur
[hCaptcha](https://www.hcaptcha.com) ou [Google reCAPTCHA](https://www.google.com/recaptcha), ajouter
son script et son widget dans `booking.html`/`contact.html`, puis vérifier le jeton côté EmailJS
(fonction « Auto-Reply » + Zapier/Make) ou via un petit service serverless si un backend est ajouté plus
tard.

## Traductions

Toutes les chaînes du site sont centralisées dans `assets/js/i18n.js` (objet `I18N`), avec une entrée par
langue : `fr`, `en`, `de`, `hr`. La structure est identique dans les 4 langues (vérifié
automatiquement) — pour ajouter ou modifier un texte, répéter le changement dans les 4 blocs.

Le HTML ne contient jamais de texte traduisible en dur : chaque élément porte un attribut
`data-i18n="chemin.de.la.cle"` (ou `data-i18n-placeholder`, `data-i18n-aria-label`) qui est rempli au
chargement de la page et à chaque changement de langue par `applyI18n()`.

**Les traductions croate et allemande ont été rédigées avec soin mais n'ont pas été relues par un
locuteur natif.** Une relecture est recommandée avant mise en ligne définitive, notamment pour le
registre de politesse et les tournures locales.

Pour ajouter une 5e langue : ajouter son code dans `SUPPORTED_LANGS`, une entrée dans `LANG_META`, un
bloc complet dans `I18N`, et un bouton dans le sélecteur de langue (`.lang-switch__menu`) de chaque page.

## Hors périmètre (conforme au cahier des charges)

Comme spécifié, cette version n'inclut pas : vérification de disponibilité en temps réel, paiement en
ligne, espace client, back-office de gestion des réservations. Le calendrier de réservation laisse
toutes les dates ouvertes à la sélection ; deux visiteurs peuvent en théorie demander les mêmes dates,
au propriétaire de détecter les doublons en validant les emails reçus.
