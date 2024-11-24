<h1><img src="https://img.shields.io/badge/NEXO GEEK-32286E?logo=null&logoColor=black&style=flat" width="240" height="60"/></h1>

<h3>App para la compra de tickets de eventos del mundo Geek</h3>

<h3>Realizada con:  <img src="https://img.shields.io/badge/ReactNative-61DAFB?logo=React&logoColor=black&style=flat" width="120" /> </h3>

<h6>La app cuenta con posibilidad de navegar por los eventos sin estar logueado, pero estándolo se puede acceder al perfil, editar tus datos y subir tu foto, crear una lista de tus eventos favoritos, tener persistencia de la sesión, comprar tickets para los eventos, ver tus órdenes de compra y mirar la ubicación del evento en un mapa. <h6>

<h6> Se buscó seguir las medidas establecidas para Andriod según MaterialDesign para lograr una UI eficiente, como en los márgenes, calles, componentes, botones, tipografía y sus medidas, legibilidad, contrastes de color, uso de modales y toast para generar un buen flujo con el usuario y las pantallas, con carteles de error y éxito, y de preguntas antes de realizar una acción como la de eliminar un evento del carrito. </h6>

* [VIDEO DEMOSTRATIVO](https://drive.google.com/file/d/1lSMtOP4Z-2pazq9Im4axOPDyWxic2V_q/view)
(El video se encuenta en velocidad x1.3)

---

> Curso: React Native - CoderHouse - Comisión 59525

* Alumna: Tamara S. Canzobre

* Profesor: Pablo Macia
* Tutor: Rene Nicolas Palenque
* Tutor Adjunto: Leonardo Monzon

---

> [!IMPORTANT]
> Herramientas Utilizadas / Dependencias / Librerías:

* react-native-maps y expo-location => para renderizar mapas con las coordenadas de cada evento y el Marker con el pin y su título en el mapa.

* react-native-toast-message => Para la visualización de un Toast/mensaje en la creación exitosa del usuario en el Signup.

* expo/metro-runtime => Proporciona un entorno para el bundling de aplicaciones en Expo.

* react-native-async-storage/async-storage: Permite almacenar los datos de manera persistente en el dispositivo.

* expo-sqlite => para la persistencia de sesión.

* react-navigation/bottom-tabs => Para realizar la barra de navegación inferior / la TabNavigation.

* react-navigation/native => Proporciona las funcionalidades básicas de navegación.

* react-navigation/native-stack: Para la implementación de una pila/stack de navegación.

* reduxjs/toolkit: Simplifica el uso de Redux para la gestión del estado de la aplicación.

* expo: Marco de trabajo para crear aplicaciones móviles usando React Native con herramientas de Expo.

* expo-font: Para cargar fuentes personalizadas, como la usada en los títulos: "PressStart2P", en el resto se utilizó "Roboto" la cual, según MaterialDesign, es la más aconsejada para apps Android.

* expo-linear-gradient: Componente para crear degradados lineales, en Login, Signup y el Header.

* expo-splash-screen: Controla la pantalla de inicio (splash screen).

* expo-status-bar: Maneja la barra de estado, (modo: light)

* firebase: SDK de Firebase para integrar funcionalidades como autenticación y bases de datos con RealTime DataBase para las categorías, eventos, usuarios.
  
* react: Biblioteca principal de JavaScript para construir la interface de usuario.

* react-dom: Proporciona funcionalidades para renderizar componentes de React en el DOM (para web).

* react-native: Framework principal para desarrollar la app móvile nativa con React.

* react-native-safe-area-context: Proporciona el contexto para gestionar las áreas seguras en pantallas de dispositivos.

* react-native-screens: Optimiza la navegación mediante un manejo eficiente de las pantallas.

* react-native-vector-icons: Ofrece íconos vectoriales, utilizados: 'FontAwesome5' y 'FontAwesome'.

* react-native-web: Permite usar componentes de React Native en aplicaciones web.

* react-redux: Conecta Redux con React para gestionar el estado de la aplicación.

* yup: Biblioteca de validación de esquemas usado para las validaciones en los inputs del registro de usuarios nuevos.

* expo-image-picker: Permite seleccionar imágenes y videos desde el dispositivo.

* Redux Toolkit + RTK Query + Solititudes HTTP.

* Iconos de las categorías obtenidos de: <a href="https://www.flaticon.es/iconos-gratis/comercio-y-compras" title="comercio y compras iconos">Comercio y compras iconos creados por Freepik - Flaticon</a>

* tabBarBadge => para que se renderice el n° de eventos agregados en el ícono del carrito en la TabBar.


<br>

---

<h3>UI</h3>

![UI](https://i.postimg.cc/WpQ0Y3DV/ui-ng-TAM.png)

---

> [!NOTE] 
> ESTRUCTURA

- [x] Carpeta 'Global' => en este caso sólo se utilizó para manejar globalmente y de forma mas efectiva y prolija los colores de la app.

- [x] Archivo .env para ocultar las Api Key/url de FireBase.

- [x] Carpeta 'Components' => contiene la creación de componentes reutilizables en toda la app para no generar código repetido, como el estilo de los Modals, el Header, Search, CameraIcon y las Cards.

- [x] Carpeta 'App' => contiene 'store.js' que es el contenedor global del estado de la app utilizando Redux Toolkit en combinación con RTK Query para manejar la lógica relacionada con las API. Su funcionalidad principal es combinar todos los reducers y middleware para que el estado global sea accesible.

- [x] Archivos 'Services' => en Redux Toolkit permiten definir y gestionar endpoints de APIs dentro de la app (consultas y mutations). Automáticamente manejan solicitudes HTTP y el estado relacionado (carga, éxito, error), del user, shop, favs y órdenes de compra.

- [x] Carpeta 'Features' => contiene las 'porciones' o 'slices' que poseen las acciones para establecer, cargar/actualizar y borrar información del shop, del carrito y del usuario.

- [x] Archivos 'Validations' => Se utilizó la librería Yup para la validación de los formularios de SignupScreen.

- [x] Carpeta 'Screens' y 'Navigator' => Con todas las vistas y stacks de cada pantalla: 

* Stacks de "AuthNavigator: SignupScreen y LoginScreen.

* TabNavigator: maneja los stacks de Shop, Carrito, Órdenes, Favs y Perfil.

* MainNavigator: Principal navegador, maneja la lógica de peguntar si hay usuario registrado, pasar a mostrar la TabNavigator o la AuthNavigator.

* Stacks de "ShopNavigator": Categorías(CategoriesScreen), Lista de Eventos(EventsScreen), Vista detalle del evento elegido (OneEventScreen).

* Stacks de "CartNavigator": Carrito de compras (CartScreen). 

* Stack de "OrdersNavigator": Mis órdenes de compra (OrdersScreen).

* Stack de "FavNavigator": Eventos favoritos (FavsScreen).

* Stack de "ProfileNavigator: Perfil (ProfileScreen).

> (Los últimos 3 screens, y en 'OneEventScreen' sólo se pueden ver si se está registrado.)


<br>

------

<h4>CAPTURAS</h4>

<br>

| **Splash** | **Signup** | **Login** | **Home** | **Evento** | **Zoom a Foto** |
|:--:|:--:|:--:|:--:|:--:|:--:|
| ![Splash](https://i.postimg.cc/6q8rTTXT/Whats-App-Image-2024-11-21-at-01-23-03.jpg) | ![Signup](https://i.postimg.cc/9XkPKPd9/Whats-App-Image-2024-11-21-at-01-23-02-2.jpg) | ![Login](https://i.postimg.cc/7hjgzDH9/Whats-App-Image-2024-11-21-at-01-23-02-3.jpg) | ![Home](https://i.postimg.cc/d0tnVr1c/Whats-App-Image-2024-11-24-at-00-33-50.jpg) | ![Evento](https://i.postimg.cc/x8dxnvtz/Whats-App-Image-2024-11-23-at-09-37-35-2.jpg) | ![ZoomFoto](https://i.postimg.cc/qMnmGDPq/Whats-App-Image-2024-11-21-at-01-22-59.jpg) |

<br>

| **Carrito Vacío** | **Carrito** | **Modal** | **Checkout** | **Órdenes** | **Zoom a Órden** | 
|:--:|:--:|:--:|:--:|:--:|:--:|
![Carrito Vacío](https://i.postimg.cc/J7sYszKb/Whats-App-Image-2024-11-21-at-01-23-00.jpg) | ![Carrito](https://i.postimg.cc/wj8XT6bT/Whats-App-Image-2024-11-21-at-01-23-02.jpg) | ![Modal](https://i.postimg.cc/vmG5f0sJ/Whats-App-Image-2024-11-21-at-01-23-01-3.jpg) | ![Checkout](https://i.postimg.cc/mgYQP003/Whats-App-Image-2024-11-21-at-01-23-01-2.jpg) | ![ordenes](https://i.postimg.cc/bvLkT1Ys/Whats-App-Image-2024-11-21-at-01-23-01-1.jpg) | ![Zoom a Órden](https://i.postimg.cc/T15bfSVD/Whats-App-Image-2024-11-21-at-01-23-01.jpg) | 

<br>


| **Sin acceso** | **Perfil** | **Edit** | **Favs** | **Mapa** | **Toast** | 
|:--:|:--:|:--:|:--:|:--:|:--:|
![Sin Acceso](https://i.postimg.cc/WprNjrfx/Whats-App-Image-2024-11-23-at-03-29-41.jpg) | ![Perfil](https://i.postimg.cc/G25Y0ryR/Whats-App-Image-2024-11-21-at-01-23-00-2.jpg) | ![Edit](https://i.postimg.cc/nM8Dzk2w/Whats-App-Image-2024-11-21-at-01-23-00-1.jpg) | ![Favs](https://i.postimg.cc/m2dVPkdR/Whats-App-Image-2024-11-23-at-05-03-15.jpg) | ![Mapa](https://i.postimg.cc/G2fDrsBK/Whats-App-Image-2024-11-24-at-00-22-44.jpg) | ![Toast](https://i.postimg.cc/7LxDnWHk/Whats-App-Image-2024-11-23-at-03-25-33.jpg) | 

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
Instalar Expo Go (versión 51): Descargar e instalar la app Expo Go desde la App Store (iOS) o Google Play (Android).
Escanea el QR y listo!

* Usar un emulador:
Descargar e instalar Android Studio, iniciar el emulador desde la interfaz de Android Studio y seleccionar la opción "Run on Android device/emulator" o "a" en consola.

<br>

-------

<br>

<a href="https://postimg.cc/DmZp57LX">
   <img src="https://i.postimg.cc/DfdVvZzB/gracias.png" width="810" />
</a>


<br>
