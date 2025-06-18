# Ingeniería de Software 2 - Solemne 2

Este documento reúne la información solicitada para la asignatura **Ingeniería de Software 2** (código 8305) de la Universidad Andrés Bello.

## Identificación del grupo

- **Alfonso Abbott Vidal** – 18570189-1
- **Diego Martínez** – 20952963-7
- **Eduardo Barrueto Vergara** – 14631686-7
- **Profesión:** Ingeniería en Informática
- **Institución:** Universidad Andrés Bello
- **Asignatura:** Ingeniería de Software 2
- **Lapso de estudio:** 7° Semestre, 2024
- **Código asignatura:** 8305
- **Sección:** 655
- **Profesor:** Álvaro Sánchez Colmenares
- **Ciudad – País:** Santiago – Chile
- **Correos:** a.abbottvidal@uandresbello.edu – d.martnezcasanova@uandresbello.edu – e.barruetovergara@uandresbello.edu

## Índice

1. Resumen HU del proyecto
2. Product Backlog del proyecto
3. Estrategia de gestión del Product Backlog y seguimiento del Sprint Backlog
4. Casos de uso documentados
5. Casos de uso: Diagrama
6. Diagrama de secuencia
7. Diagrama de actividad
8. Diagrama de clases
9. Diagrama de Componentes
10. Diagrama de Despliegue
11. Materiales y/o herramientas para el desarrollo
12. Patrón arquitectónico
12.2. Modelo del Árbol de Problemas
13. Evidencias del desarrollo del proyecto
14. Bibliografía

---

## 1. Resumen HU del proyecto

*(Sección pendiente de completar con el resumen de Historias de Usuario.)*

## 2. Product Backlog del proyecto

*(Sección pendiente de completar con el backlog detallado.)*

## 3. Estrategia de gestión del Product Backlog y seguimiento del Sprint Backlog

¿Cómo organizan y actualizan el Product y Sprint Backlog? Para la organización del Product Backlog, compartido en páginas atrás, hemos utilizado métodos manuales y digitales, esto debido a la mayor comodidad para actuar de los miembros. A pesar de utilizar herramientas como Jira, los miembros del grupo han utilizado métodos más ortodoxos como correos y WhatsApp, a la par de la herramienta de Jira.

**Reflexión sobre el avance de proyecto, los principales obstáculos detectados hasta ahora y cómo los han resuelto (Sprint Retrospective)**

Dentro del proyecto hemos notado que ciertas partes de programación requerían más expertiz que poseían todos los miembros del grupo, ciertas actividades se han realizado más grupalmente de lo que se debería, esto también ha llevado a un retraso en ciertas acciones pequeñas y grandes que suman a un problema mayor. La mejor forma de resolver estos conflictos fue a través de la enseñanza extra y una mayor coordinación grupal. A pesar de mantener atrasos el proyecto se ha logrado avanzar, por ahora la fecha final sigue en pie de forma normal.

## 4. Casos de uso documentados

### 1. Caso de Uso: Registrar Usuario
**ID del Caso de Uso:** CU001
**Actor Principal:** Usuario
**Descripción:** Permite a un nuevo usuario registrarse en el sistema proporcionando su nombre, correo electrónico y contraseña.
**Precondiciones:**
- El usuario no debe estar registrado en el sistema.
- El usuario debe tener acceso a la página de registro.
**Postcondiciones:**
- El usuario queda registrado en la base de datos con la información proporcionada.
- El sistema envía un correo de confirmación de registro.
**Flujo Principal de Eventos:**
1. El usuario accede a la página de registro.
2. El sistema muestra el formulario de registro con campos para nombre, correo y contraseña.
3. El usuario completa el formulario y hace clic en "Registrar".
4. El sistema valida los datos.
5. Si los datos son válidos, el sistema guarda la información en la base de datos.
6. El sistema envía un correo de confirmación al usuario.
7. El sistema redirige al usuario a la página de inicio de sesión.
**Flujos Alternativos:**
- Si el correo ya está registrado, el sistema muestra un mensaje de error solicitando otro correo.
- Si los datos ingresados no son válidos, el sistema muestra un mensaje de error para corregir los campos.
**Requerimientos Especiales:**
- La contraseña debe tener al menos 8 caracteres, con una combinación de letras y números.
**Notas y Asunciones:**
- El sistema de correo electrónico está configurado correctamente para enviar los correos de confirmación.

### 2. Caso de Uso: Iniciar Sesión
**ID del Caso de Uso:** CU002
**Actor Principal:** Usuario
**Descripción:** Permite a un usuario registrado iniciar sesión en el sistema utilizando su correo y contraseña.
**Precondiciones:**
- El usuario debe estar registrado en el sistema.
- El usuario debe tener acceso a la página de inicio de sesión.
**Postcondiciones:**
- El usuario puede acceder a su cuenta y usar la plataforma.
**Flujo Principal de Eventos:**
1. El usuario accede a la página de inicio de sesión.
2. El sistema muestra el formulario de inicio de sesión.
3. El usuario ingresa su correo y contraseña.
4. El sistema valida las credenciales.
5. Si las credenciales son correctas, el sistema redirige al usuario a su página de inicio.
6. El usuario está autenticado y puede interactuar con la plataforma.
**Flujos Alternativos:**
- Si las credenciales son incorrectas, el sistema muestra un mensaje de error.
- Si el usuario olvida la contraseña, puede acceder a la opción de recuperación de contraseña.
**Requerimientos Especiales:**
- El sistema debe mantener la sesión activa durante 30 minutos antes de requerir un nuevo inicio de sesión.

### 3. Caso de Uso: Recuperación de Contraseña
**ID del Caso de Uso:** CU003
**Actor Principal:** Usuario
**Descripción:** Permite a un usuario recuperar su contraseña si la ha olvidado, enviando un enlace para restablecerla a su correo registrado.
**Precondiciones:**
- El usuario debe haber registrado un correo electrónico en el sistema.
**Postcondiciones:**
- El usuario recibe un correo con un enlace para restablecer su contraseña.
- El sistema permite al usuario establecer una nueva contraseña.
**Flujo Principal de Eventos:**
1. El usuario accede a la página de inicio de sesión.
2. El sistema muestra la opción de "¿Olvidaste tu contraseña?".
3. El usuario hace clic en "¿Olvidaste tu contraseña?".
4. El sistema solicita el correo electrónico registrado.
5. El usuario ingresa su correo y hace clic en "Enviar".
6. El sistema valida el correo y envía un enlace para restablecer la contraseña.
7. El usuario hace clic en el enlace y establece una nueva contraseña.
8. El sistema confirma que la contraseña ha sido cambiada.
**Flujos Alternativos:**
- Si el correo ingresado no está registrado, el sistema muestra un mensaje de error.
- Si el enlace para restablecer la contraseña ha caducado, el sistema informa al usuario.
**Requerimientos Especiales:**
- El enlace de restablecimiento debe caducar en 24 horas.
**Notas y Asunciones:**
- El sistema de correo electrónico está correctamente configurado.

### 4. Caso de Uso: Búsqueda de seguros
**ID del Caso de Uso:** CU004
**Actor Principal:** Usuario
**Descripción:** Permite al Usuario filtrar los seguros disponibles en la plataforma según criterios como tipo de seguro, precio, cobertura, etc.
**Precondiciones:**
- El usuario debe estar registrado e iniciar sesión.
- El sistema debe tener seguros disponibles para filtrar.
**Postcondiciones:**
- El sistema muestra un conjunto de seguros que cumplen con los criterios de filtro seleccionados.
**Flujo Principal de Eventos:**
1. El usuario accede a la página de búsqueda de seguros.
2. El sistema muestra los filtros disponibles (tipo de seguro, rango de precios, cobertura).
3. El usuario selecciona los filtros deseados.
4. El sistema aplica los filtros a la base de datos de seguros.
5. El sistema muestra los seguros que coinciden con los filtros seleccionados.
6. El usuario puede seleccionar un seguro para obtener más detalles o realizar una cotización.
**Flujos Alternativos:**
- Si no hay seguros que coincidan con los filtros, el sistema muestra un mensaje indicando que no se encontraron resultados.
**Requerimientos Especiales:**
- Los filtros deben aplicarse en tiempo real al seleccionar las opciones, sin necesidad de recargar la página.
**Notas y Asunciones:**
- El sistema debe actualizar la lista de seguros sin recargar la página.

### 5. Caso de Uso: Recomendaciones Personalizadas
**ID del Caso de Uso:** CU007
**Actor Principal:** Usuario
**Descripción:** Permite al Usuario recibir recomendaciones personalizadas de seguros basadas en su perfil (edad, tipo de seguro preferido, etc.).
**Precondiciones:**
- El usuario debe haber iniciado sesión.
- El usuario debe haber completado su perfil o haber interactuado con la plataforma de alguna manera que permita hacer recomendaciones.
**Postcondiciones:**
- El sistema muestra una lista de seguros recomendados para el usuario.
**Flujo Principal de Eventos:**
1. El usuario accede a la sección de recomendaciones personalizadas.
2. El sistema solicita al usuario completar su perfil o ingresar información adicional sobre sus preferencias.
3. El usuario ingresa los datos solicitados (tipo de seguro, edad, etc.).
4. El sistema procesa los datos y genera una lista de seguros recomendados.
5. El sistema muestra la lista de seguros recomendados al usuario.
**Flujos Alternativos:**
- Si el usuario no ingresa suficiente información, el sistema muestra un mensaje indicando que se necesita más información para hacer recomendaciones precisas.
**Requerimientos Especiales:**
- El sistema debe garantizar que las recomendaciones estén basadas en datos actualizados y relevantes para el usuario.
**Notas y Asunciones:**
- El sistema de recomendaciones se basa en algoritmos que evalúan las preferencias del usuario y las ofertas de seguros disponibles.

### 6. Caso de Uso: Guardar Cotización
**ID del Caso de Uso:** CU005
**Actor Principal:** Usuario
**Descripción:** Permite a un Usuario guardar una cotización para revisarla o compartirla más tarde.
**Precondiciones:**
- El usuario debe haber iniciado sesión.
- El usuario debe haber generado una cotización previamente.
**Postcondiciones:**
- La cotización se guarda en el perfil del usuario para futuras consultas.
**Flujo Principal de Eventos:**
1. El usuario genera una cotización para un seguro.
2. El sistema muestra la cotización calculada.
3. El usuario selecciona la opción de "Guardar Cotización".
4. El sistema guarda la cotización en la base de datos vinculada al perfil del usuario.
5. El sistema muestra un mensaje de confirmación indicando que la cotización ha sido guardada correctamente.
6. El usuario puede acceder a la cotización guardada desde su perfil.
**Flujos Alternativos:**
- Si el usuario no está autenticado, el sistema solicita que inicie sesión antes de guardar la cotización.
**Requerimientos Especiales:**
- El sistema debe permitir al usuario visualizar sus cotizaciones guardadas en cualquier momento desde su perfil.
**Notas y Asunciones:**
- Las cotizaciones guardadas deben asociarse con el perfil del usuario para garantizar que se puedan recuperar en sesiones futuras.

### 7. Caso de Uso: Notificaciones Personalizadas
**ID del Caso de Uso:** CU013
**Actor Principal:** Usuario
**Descripción:** Permite al Usuario recibir notificaciones personalizadas sobre los cambios en los precios de los seguros que ha marcado como favoritos o en los que está interesado.
**Precondiciones:**
- El usuario debe estar registrado e iniciar sesión en la plataforma.
- El usuario debe haber marcado al menos un seguro como favorito.
- El sistema debe tener implementado un mecanismo de notificación.
**Postcondiciones:**
- El sistema envía una notificación al usuario cuando el precio de un seguro favorito cambia.
- La notificación puede ser por correo electrónico o dentro de la plataforma.
**Flujo Principal de Eventos:**
1. El usuario accede a la página de seguros y marca uno o más como favoritos.
2. El sistema guarda estos seguros en la lista de favoritos del usuario.
3. Si el precio de uno de los seguros favoritos cambia, el sistema detecta el cambio.
4. El sistema envía una notificación al usuario con el detalle del cambio de precio.
5. El usuario recibe la notificación y puede acceder al detalle del seguro actualizado.
**Flujos Alternativos:**
- Si el correo del usuario no está configurado correctamente o hay un error en el envío de la notificación, el sistema muestra un mensaje de error o no envía la notificación.
- Si el usuario no tiene ningún seguro favorito, no se enviarán notificaciones.
**Requerimientos Especiales:**
- El sistema debe verificar que el correo electrónico del usuario sea válido antes de enviar notificaciones.
- La notificación debe ser enviada en tiempo real tan pronto como el precio del seguro cambie.
**Notas y Asunciones:**
- El sistema de notificaciones debe estar correctamente configurado.
- El usuario puede desactivar las notificaciones desde su configuración de cuenta si lo desea.

### 8. Caso de Uso: Formulario de Contacto
**ID del Caso de Uso:** CU008
**Actor Principal:** Usuario
**Descripción:** Permite al Usuario enviar un mensaje al soporte o a la atención al cliente a través de un formulario de contacto.
**Precondiciones:**
- El usuario debe tener acceso a la página de contacto.
**Postcondiciones:**
- El sistema envía el mensaje del usuario al área de soporte o atención al cliente.
- El sistema muestra un mensaje de confirmación de envío.
**Flujo Principal de Eventos:**
1. El usuario accede a la página de contacto en el sitio web.
2. El sistema muestra un formulario de contacto con campos para nombre, correo electrónico y mensaje.
3. El usuario completa el formulario y hace clic en "Enviar".
4. El sistema valida que los campos estén completos y correctamente formateados.
5. El sistema envía el mensaje al área de soporte.
6. El sistema muestra un mensaje de confirmación al usuario, indicando que su mensaje ha sido enviado.
**Flujos Alternativos:**
- Si el formulario tiene campos vacíos o incorrectos, el sistema muestra un mensaje de error y solicita al usuario completar los campos correctamente.
**Requerimientos Especiales:**
- El sistema debe verificar que el correo ingresado tenga un formato válido.
**Notas y Asunciones:**
- El sistema de correo electrónico debe estar correctamente configurado.

### 9. Caso de Uso: Cargar Póliza Actual
**ID del Caso de Uso:** CU009
**Actor Principal:** Usuario
**Descripción:** Permite a un Usuario cargar su póliza de seguro actual para compararla con otros seguros disponibles.
**Precondiciones:**
- El usuario debe estar registrado e iniciado sesión.
- El usuario debe tener una póliza de seguro activa que pueda cargar.
**Postcondiciones:**
- La póliza cargada se muestra al usuario y se almacena en su perfil.
**Flujo Principal de Eventos:**
1. El usuario accede a la sección de "Cargar Póliza" en su perfil.
2. El sistema muestra un formulario para cargar la póliza, ya sea a través de un archivo PDF o imagen.
3. El usuario selecciona el archivo de su póliza y lo carga.
4. El sistema valida que el archivo sea del tipo correcto y que no esté dañado.
5. El sistema almacena la póliza en la base de datos vinculada al perfil del usuario.
6. El sistema muestra una vista previa de la póliza cargada y permite al usuario compararla con otros seguros disponibles.
**Flujos Alternativos:**
- Si el archivo cargado no es del tipo permitido, el sistema muestra un mensaje de error.
**Requerimientos Especiales:**
- El sistema debe permitir la carga de archivos de diferentes tipos (PDF, imagen).
- La póliza cargada debe estar vinculada al perfil del usuario para su futura referencia.
**Notas y Asunciones:**
- El sistema de almacenamiento de archivos debe estar correctamente configurado para manejar archivos grandes y garantizar que no haya problemas de seguridad al procesar los documentos cargados.

### 10. Caso de Uso: Gestión de Usuarios
**ID del Caso de Uso:** CU010
**Actor Principal:** Administrador
**Descripción:** Permite al Administrador gestionar los usuarios registrados en la plataforma, incluyendo la posibilidad de agregar, editar o eliminar usuarios.
**Precondiciones:**
- El Administrador debe estar autenticado en el sistema.
- El Administrador debe tener acceso a la sección de gestión de usuarios.
**Postcondiciones:**
- El sistema actualiza la base de datos con los cambios realizados.
- El Administrador recibe una confirmación de la acción realizada.
**Flujo Principal de Eventos:**
1. El Administrador accede a la página de gestión de usuarios.
2. El sistema muestra la lista de usuarios registrados en la plataforma.
3. El Administrador selecciona un usuario para gestionar (editar o eliminar).
4. El Administrador realiza los cambios deseados.
5. El sistema valida los cambios.
6. El sistema guarda los cambios en la base de datos.
7. El sistema muestra una confirmación de la acción realizada.
**Flujos Alternativos:**
- Si el Administrador intenta eliminar un usuario con cotizaciones activas, el sistema muestra un mensaje de advertencia antes de proceder.
- Si los datos del usuario editado son incorrectos, el sistema muestra un mensaje de error.
**Requerimientos Especiales:**
- El sistema debe permitir que el Administrador busque usuarios por nombre o correo electrónico.
**Notas y Asunciones:**
- El Administrador debe tener privilegios especiales para acceder a la sección de gestión de usuarios.

### 11. Caso de Uso: Gestión de Aseguradoras
**ID del Caso de Uso:** CU011
**Actor Principal:** Administrador
**Descripción:** Permite al Administrador gestionar las aseguradoras que están registradas en el sistema, lo que incluye agregar, editar o eliminar aseguradoras.
**Precondiciones:**
- El Administrador debe estar autenticado en el sistema.
- El Administrador debe tener acceso a la sección de gestión de aseguradoras.
**Postcondiciones:**
- El sistema actualiza la base de datos con los cambios realizados.
- El Administrador recibe una confirmación de la acción realizada.
**Flujo Principal de Eventos:**
1. El Administrador accede a la página de gestión de aseguradoras.
2. El sistema muestra la lista de aseguradoras registradas.
3. El Administrador selecciona una aseguradora para gestionar (editar o eliminar).
4. El Administrador realiza los cambios deseados.
5. El sistema valida los cambios realizados.
6. El sistema guarda los cambios en la base de datos.
7. El sistema muestra una confirmación de la acción realizada.
**Flujos Alternativos:**
- Si el Administrador intenta eliminar una aseguradora que tiene seguros activos en el sistema, el sistema muestra un mensaje de advertencia.
- Si los datos de la aseguradora editada son incorrectos, el sistema muestra un mensaje de error.
**Requerimientos Especiales:**
- El sistema debe permitir que el Administrador busque aseguradoras por nombre o NIT.
**Notas y Asunciones:**
- El Administrador debe tener privilegios especiales para acceder a la sección de gestión de aseguradoras.

### 12. Caso de Uso: Comparar Seguros
**ID del Caso de Uso:** CU006
**Actor Principal:** Usuario
**Descripción:** Permite al Usuario comparar varios seguros seleccionados en función de diferentes características, como precio, cobertura, etc.
**Precondiciones:**
- El usuario debe haber iniciado sesión.
- El usuario debe haber filtrado o seleccionado al menos dos seguros para comparar.
**Postcondiciones:**
- El sistema muestra una tabla comparativa entre los seguros seleccionados.
**Flujo Principal de Eventos:**
1. El usuario selecciona varios seguros de la lista de resultados.
2. El sistema muestra un botón o enlace de "Comparar Seguros".
3. El usuario hace clic en "Comparar Seguros".
4. El sistema genera y muestra una tabla comparativa con las características de los seguros seleccionados.
5. El usuario puede decidir cuál seguro le interesa más o iniciar el proceso de compra.
**Flujos Alternativos:**
- Si el usuario intenta comparar solo un seguro, el sistema muestra un mensaje indicando que debe seleccionar al menos dos seguros.
**Requerimientos Especiales:**
- La tabla comparativa debe ser clara y fácil de leer, con una diferenciación visual de las características de cada seguro.
**Notas y Asunciones:**
- Los resultados de la comparación se deben actualizar en tiempo real, sin recargar la página.

## 5. Casos de uso: Diagrama

*(Incluir diagramas correspondientes en esta sección.)*

## 6. Diagrama de secuencia

*(Incluir diagramas de secuencia.)*

## 7. Diagrama de actividad

*(Incluir diagramas de actividad.)*

## 8. Diagrama de clases

*(Incluir diagrama de clases.)*

## 9. Diagrama de Componentes

*(Incluir diagrama de componentes.)*

## 10. Diagrama de Despliegue

*(Incluir diagrama de despliegue.)*

## 11. Materiales y/o herramientas para el desarrollo

| Área | Herramienta / Tecnología |
| --- | --- |
| Lenguaje Frontend | JavaScript |
| Framework Principal | React.js |
| Estilos | Tailwind CSS |
| Manejo de Estados | React Context |
| Backend | Node.js + Express |
| Base de Datos | MongoDB |
| Control de Versiones | Git + GitHub |
| Gestión de Proyecto | Jira |
| Entorno de Desarrollo | Visual Studio Code |
| Testing | Jest + React Testing Library |
| Integración Continua | GitHub Actions |
| Despliegue | Vercel |
| Modelado UML | Visual Paradigm + Lucidchart |

## 12. Patrón arquitectónico

La arquitectura utilizada en el proyecto fue la **Arquitectura por Capas**, donde el código se organiza en:
- **Capa de presentación**: interacción del usuario mediante React.js.
- **Capa de lógica de negocio**: gestionada por Node.js.
- **Capa de base de datos**: MongoDB para almacenar información.
- **Capa de integración**: comunicación con sistemas externos o integración de servicios adicionales como notificaciones.

**Beneficios**: facilidad de mantenimiento, pruebas más simples y desarrollo en paralelo. También permite escalar componentes de manera independiente.

Entre los principios aplicados destacan la **responsabilidad única**, la **separación de preocupaciones**, la **abstracción** y la **escalabilidad**.

### 12.2. Modelo del Árbol de Problemas

*(Sección opcional para describir el árbol de problemas.)*

## 13. Evidencias del desarrollo del proyecto

Repositorio en GitHub: <https://github.com/ebarruetovergara/AISeguros>

Se incluyen capturas de la interfaz y funcionalidades desarrolladas en el informe original.

## 14. Bibliografía

- Visual Paradigm. "Visual Paradigm: Plataforma de modelado UML, SysML y BPMN todo en uno." Recuperado el 23 de mayo de 2025.
- Lucid Software Inc. "Lucidchart: Diagramas creados con inteligencia." Recuperado el 23 de mayo de 2025.
- Sánchez Colmenares, Á. "Ingeniería de Software 2 (NCR 8305)." Universidad Andrés Bello.

