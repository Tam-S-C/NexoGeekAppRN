<h1><img src="https://img.shields.io/badge/NEXO GEEK-32286E?logo=null&logoColor=black&style=flat" width="240" height="60"/></h1>

<h3>App para la compra de tickets de eventos del mundo Geek</h3>

<h3>Realizada con:  <img src="https://img.shields.io/badge/ReactNative-61DAFB?logo=React&logoColor=black&style=flat"/> </h3>


---

> Curso: React Native - CoderHouse - Comisión 59525

* Alumna: Tamara S. Canzobre

* Profesor: Pablo Macia
* Tutor: Rene Nicolas Palenque
* Tutor Adjunto: Leonardo Monzon

---

> [!IMPORTANT]
> Herramientas Utilizadas / Dependencias:

* expo/metro-runtime => Proporciona un entorno para el bundling de aplicaciones en Expo.

* react-native-async-storage/async-storage: Permite almacenar datos de manera persistente en el dispositivo.

* react-navigation/bottom-tabs => Para realizar la barra de navegación inferior.

* react-navigation/native => Proporciona las funcionalidades básicas de navegación.

* react-navigation/native-stack: Para la implementación de una pila/stack de navegación.

* reduxjs/toolkit: Simplifica el uso de Redux para la gestión del estado de la aplicación.

* expo: Marco de trabajo para crear aplicaciones móviles usando React Native con herramientas de Expo.

* expo-font: Para cargar fuentes personalizadas, "PressStart2P".

* expo-linear-gradient: Componente para crear degradados lineales, en Login, Signup y el Header.

* expo-splash-screen: Controla la pantalla de inicio (splash screen).

* expo-status-bar: Maneja la barra de estado, (modo: light)

* firebase: SDK de Firebase para integrar funcionalidades como autenticación y bases de datos con RealTime DataBase.
  
* react: Biblioteca principal de JavaScript para construir la interface de usuario.

* react-dom: Proporciona funcionalidades para renderizar componentes de React en el DOM (para web).

* react-native: Framework principal para desarrollar la app móvile nativa con React.

* react-native-safe-area-context: Proporciona el contexto para gestionar las áreas seguras en pantallas de dispositivos.

* react-native-screens: Optimiza la navegación mediante un manejo eficiente de las pantallas.

* react-native-vector-icons: Ofrece iconos vectoriales, utilizados: FontAwesome5

* react-native-web: Permite usar componentes de React Native en aplicaciones web.

* react-redux: Conecta Redux con React para gestionar el estado de la aplicación.

* yup: Biblioteca de validación de esquemas para JavaScript.

* expo-image-picker: Permite seleccionar imágenes y videos desde el dispositivo.

* Redux Toolkit + RTK Query + Solititudes HTTP

<br>

---

> [!NOTE] 
> ESTRUCTURA

- [x] Carpeta 'Global' => en este caso sólo se utilizó para manejar globalmente y de forma mas efectiva y prolija los colores de la app.

- [x] Carpeta 'Firebase' => contiene las conecciones con la base de datos.

- [x] Carpeta 'Components' => contiene la creación de componentes reutilizables en toda la app para no generar código repetido, como el estilo de los Modals, el Header, Search, CameraIcon y las Cards.

- [x] Carpeta 'App' => contiene 'store.js' que es el contenedor global del estado de la app utilizando Redux Toolkit en combinación con RTK Query para manejar la lógica relacionada con las API. Su funcionalidad principal es combinar todos los reducers y middleware para que el estado global sea accesible.

- [x] Archivos 'Services' => en Redux Toolkit permiten definir y gestionar endpoints de APIs dentro de la app (consultas y mutations). Automáticamente manejan solicitudes HTTP y el estado relacionado (carga, éxito, error), del user, shop y órdenes de compra.

- [x] Carpeta 'Features' => contiene las 'porciones' o 'slices' que poseen las acciones para establecer, cargar/actualizar y borrar información del shop, del carrito y del usuario.

- [x] Archivos 'Validations' => Se utilizó la librería Yup para la validación de los formularios de SigupScreen.

- [x] Carpeta 'Screens' y 'Navigator' => Con todas las vistas y stacks de cada pantalla: 

* Stacks de "ShopNavigator": Categorías(CategoriesScreen), Lista de Eventos(EventsScreen), Vista detalle del evento elegido (OneEventScreen).

* Stacks de "CartNavigator": Carrito de compras (CartScreen). 

* Stack de "OrdersNavigator": Mis órdenes de compra (OrdersScreen).

* Stacks de "AuthNavigator: SignupScreen y LoginScreen.

* Stack de "FavNavigator": Eventos favoritos (FavsScreen).

* Stack de "ProfileNavigator: Perfil (ProfileScreen).

(Los últimos 2 screens sólo se pueden ver si se está registrado.)

* TabNavigator: maneja los stacks de Shop, Carrito, Órdenes, Favs y Perfil.

* MainNavigator: Principal navegador, maneja la lógica de peguntar si hay usuario registrado, pasar a mostrar la TabNavigator o la AuthNavigator.

<br>

------

<h4>CAPTURAS</h4>

<br>

| **Splash** | **Signup** | **Login** | **Home** | **Evento** | **Zoom a Foto** |
|:--:|:--:|:--:|:--:|:--:|:--:|
| ![Splash](https://i.postimg.cc/6q8rTTXT/Whats-App-Image-2024-11-21-at-01-23-03.jpg) | ![Signup](https://i.postimg.cc/9XkPKPd9/Whats-App-Image-2024-11-21-at-01-23-02-2.jpg) | ![Login](https://i.postimg.cc/7hjgzDH9/Whats-App-Image-2024-11-21-at-01-23-02-3.jpg) | ![Home](https://i.postimg.cc/fT07N3Cr/Whats-App-Image-2024-11-21-at-01-23-02-1.jpg) | ![Evento](https://i.postimg.cc/Pf03YnF0/Whats-App-Image-2024-11-21-at-01-22-59-1.jpg) | ![ZoomFoto](https://i.postimg.cc/qMnmGDPq/Whats-App-Image-2024-11-21-at-01-22-59.jpg) |

<br>

| **Carrito Vacío** | **Carrito** | **Modal** | **Checkout** | **Órdenes** | **Zoom a Órden** | 
|:--:|:--:|:--:|:--:|:--:|:--:|
![Carrito Vacío](https://i.postimg.cc/J7sYszKb/Whats-App-Image-2024-11-21-at-01-23-00.jpg) | ![Carrito](https://i.postimg.cc/wj8XT6bT/Whats-App-Image-2024-11-21-at-01-23-02.jpg) | ![Modal](https://i.postimg.cc/vmG5f0sJ/Whats-App-Image-2024-11-21-at-01-23-01-3.jpg) | ![Checkout](https://i.postimg.cc/mgYQP003/Whats-App-Image-2024-11-21-at-01-23-01-2.jpg) | ![ordenes](https://i.postimg.cc/bvLkT1Ys/Whats-App-Image-2024-11-21-at-01-23-01-1.jpg) | ![Zoom a Órden](https://i.postimg.cc/T15bfSVD/Whats-App-Image-2024-11-21-at-01-23-01.jpg) | 

<br>


| **Sin acceso** | **Perfil** | **Edit** | **Favs** | **ver** | **ver** | 
|:--:|:--:|:--:|:--:|:--:|:--:|
![Sin Acceso](https://i.postimg.cc/B66DwttN/Whats-App-Image-2024-11-21-at-01-23-00-3.jpg) | ![Perfil](https://i.postimg.cc/G25Y0ryR/Whats-App-Image-2024-11-21-at-01-23-00-2.jpg) | ![Edit](https://i.postimg.cc/nM8Dzk2w/Whats-App-Image-2024-11-21-at-01-23-00-1.jpg) | ![Favs](https://i.postimg.cc/nM8Dzk2w/Whats-App-Image-2024-11-21-at-01-23-00-1.jpg) | ![ver](https://i.postimg.cc/nM8Dzk2w/Whats-App-Image-2024-11-21-at-01-23-00-1.jpg) | ![ver](https://i.postimg.cc/nM8Dzk2w/Whats-App-Image-2024-11-21-at-01-23-00-1.jpg) | 

<br>

------

> [!IMPORTANT]
> ¿CÓMO INSTALAR LA APP?

1. Instalar Node.js: https://nodejs.org/en/download/package-manager

2. En la consola instalar Expo CLI con:
```
npm install -g expo-cli
```

3. Clonar el repositorio: 
```
git clone https://github.com/Tam-S-C/NexoGeekAppRN.git
```

4. Instalar dependencias en la carpeta del proyecto:
```
npm install
```

5. Ejecutar el proyecto con:
```
npx expo start
```

Esto abrirá un código QR y las opciones para emuladores.

* Desde un celular:
Instalar Expo Go (versión 51): Descarga e instala la app Expo Go desde la App Store (iOS) o Google Play (Android).
Escanea el qr y listo!

* Usar un emulador:
Descargar e instalar Android Studio, inicia el emulador desde la interfaz de Android Studio y seleccionar la opción "Run on Android device/emulator"/ a en consola.

<br>

-------

<br>

<a href="https://postimg.cc/DmZp57LX">
   <img src="https://i.postimg.cc/DfdVvZzB/gracias.png" width="800" />
</a>


<br>
