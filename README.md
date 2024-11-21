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

Los screens últimos de screens sólo se pueden ver si se está registrado.

* TabNavigator: maneja los stacks de Shop, Carrito, Órdenes, Favs y Perfil.

* MainNavigator: Principal navegador, maneja la lógica de peguntar si hay usuario registrado, pasar a mostrar la TabNavigator o la AuthNavigator.
