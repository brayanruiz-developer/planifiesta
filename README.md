# Planifiesta

## 📝 Descripción

Este proyecto es una aplicación que permite organizar fiestas, al ingresar puede:
1. **Crear invitación**, al crear la invitación debe seleccionar el evento, ingresar nombre del usuario y descripción de la invitación.
2. **Ver el listado de los usuarios invitados** y así mismo proceder a aceptar o rechazar dicha invitación.
3. **Consultar el estado financiero hasta una fecha en específico** (entre 1 y 60 días).
4. **Visualizar el estado financiero consultado**, el cual mostrará el costo total acumulado, presupuesto restante disponible y el historial de aportes.

## 💡 Justificaciones técnicas

* **Framework Backend:** Se eligió **FastAPI** por su rapidez, tipado con Pydantic y facilidad para crear APIs RESTful.
* **SQLAlchemy:** Librería ORM más poderosa y popular de Python.
* **Frontend SPA:** Se eligió React con el framework **Next.js** por su flexibilidad, rendimiento, capacidad para construir aplicaciones complejas y a gran escala.
* **Control de versiones:** Se sigue la convención de **commits semánticos** para un historial limpio en el repositorio.
* **Clean Architecture:** Permite separar responsabilidades, reutilización de lógica de negocio y flexibilidad para hacer cambios.

## ⚙️ Instrucciones precisas

* **Ejecución del backend localmente:** Desde la raíz del proyecto ejecutar el comando **uvicorn app.main:app --reload --app-dir backend**, este corre desde http://localhost:8000/docs.
* **Ejecución del frontend localmente:** Acceder a frontend/planifiesta, desde allí ejecutar el comando **npm run dev**, este corre desde http://localhost:3000.
