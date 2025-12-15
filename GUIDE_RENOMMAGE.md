# Guide de Renommage du Projet

## ✅ Modifications déjà effectuées dans les fichiers

Tous les fichiers de configuration ont été mis à jour avec le nouveau nom **Fahem_Elaa_G5** :

- ✅ `package.json` - nom du projet
- ✅ `app.json` - nom et displayName
- ✅ `android/settings.gradle` - rootProject.name
- ✅ `android/app/build.gradle` - namespace et applicationId
- ✅ Tous les fichiers Java (packages et noms de composants)
- ✅ Dossiers Java renommés : `com/coffee_shop_app` → `com/fahem_elaa_g5`
- ✅ Fichiers iOS (Info.plist, AppDelegate.mm, Podfile, etc.)
- ✅ README.md mis à jour

## 📁 Renommage des dossiers restants

### Option 1 : Utiliser le script PowerShell (Recommandé)

1. **Fermez Cursor/VS Code** et tous les processus qui utilisent le projet
2. Ouvrez PowerShell dans le dossier du projet
3. Exécutez le script :
   ```powershell
   .\rename_folders.ps1
   ```

### Option 2 : Renommage manuel

#### Pour les dossiers iOS :

1. **Fermez Cursor/VS Code** et Xcode si ouvert
2. Dans l'Explorateur Windows, naviguez vers le dossier `ios`
3. Renommez les dossiers suivants :
   - `Coffee_Shop_App` → `Fahem_Elaa_G5`
   - `Coffee_Shop_App.xcodeproj` → `Fahem_Elaa_G5.xcodeproj`
   - `Coffee_Shop_App.xcworkspace` → `Fahem_Elaa_G5.xcworkspace`
   - `Coffee_Shop_AppTests` → `Fahem_Elaa_G5Tests`
4. Dans `Fahem_Elaa_G5.xcodeproj/xcshareddata/xcschemes/`, renommez :
   - `Coffee_Shop_App.xcscheme` → `Fahem_Elaa_G5.xcscheme`

#### Pour le dossier racine du projet :

1. **Fermez Cursor/VS Code** et tous les processus
2. Ouvrez PowerShell dans le dossier parent (`D:\3emeing\cross`)
3. Exécutez :
   ```powershell
   Rename-Item -Path "Coffee-Shop-App-React-Native-main" -NewName "Fahem_Elaa_G5"
   ```

## 🔄 Après le renommage

Une fois les dossiers renommés :

1. **Nettoyez le build Android** :
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Réinstallez les pods iOS** :
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Testez la compilation** :
   ```bash
   npm run android
   # ou
   npm run ios
   ```

## ⚠️ Notes importantes

- Les fichiers de build (`node_modules`, `android/build`, `ios/build`) contiennent des chemins absolus avec l'ancien nom. Ce n'est pas grave, ils seront régénérés lors du prochain build.
- Si vous avez des problèmes après le renommage, supprimez les dossiers `node_modules`, `android/build`, `android/app/build`, et `ios/Pods`, puis réinstallez :
  ```bash
  npm install
  cd ios && pod install && cd ..
  ```

## 📝 Résumé des changements

- **Nom du projet** : `Coffee_Shop_App` → `Fahem_Elaa_G5`
- **Package Android** : `com.coffee_shop_app` → `com.fahem_elaa_g5`
- **Dossiers Java** : `com/coffee_shop_app` → `com/fahem_elaa_g5`
- **Dossiers iOS** : `Coffee_Shop_App*` → `Fahem_Elaa_G5*`
- **Dossier racine** : `Coffee-Shop-App-React-Native-main` → `Fahem_Elaa_G5` (à faire manuellement)

