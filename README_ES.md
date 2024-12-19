# Lista de Tareas Interactivas con JavaScript

Este código implementa una lista de tareas interactivas en un navegador web usando JavaScript. A continuación, se desglosa paso a paso:

## Estructura General

```javascript
document.addEventListener("DOMContentLoaded", () => {
```
Este código se ejecuta cuando el documento HTML ha terminado de cargarse (el evento `DOMContentLoaded`). Dentro de este evento se garantiza que los elementos del DOM ya estén disponibles para ser manipulados.

## Variables Iniciales

```javascript
const inputBox = document.getElementById("input-box") as HTMLInputElement | null;
const listContainer = document.getElementById("list-container") as HTMLUListElement | null;
```
- **`inputBox`**: Hace referencia al elemento HTML del input donde el usuario escribe la tarea. Si no existe, será `null`.
- **`listContainer`**: Hace referencia al contenedor donde se añadirán las tareas como elementos `<li>`.

Ambos elementos están tipados con `as` para definir sus tipos (`HTMLInputElement` y `HTMLUListElement`), garantizando seguridad de tipo.

## Evento para Detectar "Enter"

```javascript
inputBox.addEventListener("keypress", function (e: KeyboardEvent): void {
  if (e.key === "Enter") {
    addTask();
  }
});
```
- `inputBox.addEventListener`: Escucha el evento `keypress` en el cuadro de texto.
- `e.key === "Enter"`: Si el usuario presiona la tecla "Enter", se llama a la función `addTask()` para agregar una tarea.

## Función `addTask`

Esta función se encarga de agregar una nueva tarea a la lista.

### Verificaciones Iniciales

```javascript
if (!inputBox || !listContainer) return;
```
Si los elementos no están disponibles (`null`), la función termina para evitar errores.

### Validación de Entrada

```javascript
if (inputBox.value.trim() === "") {
  alert("You must write something!");
}
```
Si el valor del input está vacío (o solo contiene espacios), muestra un mensaje de alerta.

### Creación de la Tarea

```javascript
const li = document.createElement("li");
li.textContent = inputBox.value;
listContainer.appendChild(li);
```
- Se crea un elemento `<li>` que contendrá el texto de la tarea.
- Se añade al contenedor `listContainer`.

### Botón de Eliminación

```javascript
const span = document.createElement("span");
span.textContent = "\u00d7"; // Unicode para "×"
li.appendChild(span);
```
- Se crea un elemento `<span>` que actúa como botón de eliminación.
- Se añade al elemento `<li>`.

### Limpieza del Input y Guardado

```javascript
inputBox.value = "";
saveData();
```
- Se vacía el input para permitir al usuario escribir otra tarea.
- Se llama `saveData()` para guardar la lista en `localStorage`.

## Evento para Completar o Eliminar Tareas

```javascript
listContainer.addEventListener("click", function (e: MouseEvent): void {
  const target = e.target as HTMLElement;

  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
  } else if (target.tagName === "SPAN") {
    target.parentElement?.remove();
    saveData();
  }
});
```

### Detectar el Elemento Clickeado

```javascript
const target = e.target as HTMLElement;
```
El evento `click` detecta cuál elemento fue presionado (`target`).

### Marcar como Completada

```javascript
if (target.tagName === "LI") {
  target.classList.toggle("checked");
  saveData();
}
```
- Si el usuario hace clic en una tarea (`LI`), alterna la clase `checked` para marcarla como completada o desmarcarla.
- Luego guarda los cambios en el `localStorage`.

### Eliminar la Tarea

```javascript
else if (target.tagName === "SPAN") {
  target.parentElement?.remove();
  saveData();
}
```
- Si el clic fue sobre el botón de eliminación (`SPAN`), elimina el elemento padre (`LI`).
- Guarda los cambios en el `localStorage`.

## Función `saveData`

```javascript
function saveData(): void {
  if (!listContainer) return;
  localStorage.setItem("data", listContainer.innerHTML);
}
```
- **Objetivo**: Guardar el contenido de `listContainer` (las tareas) en el almacenamiento local del navegador (`localStorage`).
- `localStorage.setItem`: Almacena la propiedad `innerHTML` del contenedor bajo la clave "data", lo que incluye tanto las tareas como sus botones.

## Función `showTask`

```javascript
function showTask(): void {
  if (!listContainer) return;
  listContainer.innerHTML = localStorage.getItem("data") || "";
}
```
- **Objetivo**: Restaurar las tareas desde el `localStorage` al recargar la página.
- `localStorage.getItem`: Obtiene los datos almacenados bajo la clave "data". Si no hay datos, utiliza una cadena vacía como valor predeterminado.

### Invocación de `showTask`

```javascript
showTask();
```
Al cargar la página, se llama a `showTask()` para mostrar las tareas guardadas previamente.

## Resumen Completo del Flujo

1. Cuando se carga la página, `showTask()` recupera y muestra las tareas guardadas.
2. El usuario puede agregar tareas presionando "Enter", lo que crea un nuevo elemento `<li>` con un botón de eliminación.
3. El usuario puede:
   - Hacer clic en una tarea para marcarla como completada (alternar clase `checked`).
   - Hacer clic en el botón de eliminación para quitar la tarea.
4. Cada cambio (agregar, completar, eliminar) se guarda en `localStorage` mediante `saveData()`.

Esto asegura que la lista de tareas sea persistente incluso al recargar la página.
