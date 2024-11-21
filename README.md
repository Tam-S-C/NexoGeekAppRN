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
> Herramientas Utilizadas:

* Redux =>

* Firebase => RealTime DataBase / Authentication

* Features => Uso de Cámara / ...

* YUP => para validaciones


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


------

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
