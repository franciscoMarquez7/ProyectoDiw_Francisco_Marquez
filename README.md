# 📊 Proyecto de Gestión de Ciudades y Monumentos

## 📝 Descripción del Proyecto
Este proyecto es una aplicación web para la gestión de **Ciudades y Monumentos**, permitiendo visualizar listados, realizar CRUD, generar gráficos de datos y exportar información en distintos formatos.  

La aplicación consta de:
- 📌 **Frontend:** React + Material UI + Recharts + jsPDF + React-PDF.
- 🔥 **Backend:** Node.js + Express + Sequelize + MySQL.
- 🚀 **Despliegue:** Railway.

---

## 🎨 **Gráfica de Datos**
Se han generado gráficas a partir de los datos manejados en la aplicación.  

### **📊 Gráfica de Monumentos**
✔ **Tipo:** Gráfica de Barras.  
✔ **Elementos incluidos:**
  - **Título** de la gráfica.
  - **Serie de datos** (Año de construcción de monumentos).
  - **Ejes X e Y** para representar la información.
  - **Grid** para facilitar la visualización.
  - **Leyenda** con los datos representados.
  - **Información sobreimpresa (Tooltip)** al pasar el cursor.

### **📈 Gráfica de Ciudades**
✔ **Tipo:** Gráfica de Torta/PieChart.  
✔ **Elementos incluidos:**  
  - **Título** de la gráfica.  
  - **Distribución de población en ciudades.**  
  - **Colores diferenciados por ciudad.**  
  - **Tooltip con detalles de cada segmento.**  

✅ **Ambas gráficas pueden exportarse a PDF mediante un botón (jsPDF + html2canvas).**

---

## 📄 **Opciones de Impresión**
Se ha implementado la impresión de los listados de la aplicación utilizando tres técnicas:

1️⃣ **Botón que lanza la impresión del navegador** (`window.print()`).  
2️⃣ **Botón que exporta la tabla como imagen en PDF** (`jsPDF + html2canvas`).  
3️⃣ **Botón que genera un informe en PDF** (`react-pdf`).  

✅ **Los listados de Monumentos y Ciudades incluyen estas opciones.**

---

## 🧪 **Test de la API REST**
Se han realizado pruebas con **Jest + Supertest** para validar la API REST.  

✔ **Entidad Testeada:** `Monumentos`.  
✔ **Se han definido 6 tests mínimos:**  
  1. 🏛️ **POST** `/api/monumentos` → Creación de un nuevo monumento.  
  2. 📋 **GET** `/api/monumentos` → Obtener lista de monumentos.  
  3. 🔍 **GET** `/api/monumentos/:id` → Obtener un monumento por ID.  
  4. ✏ **PUT** `/api/monumentos/:id` → Actualizar un monumento existente.  
  5. ❌ **DELETE** `/api/monumentos/:id` → Eliminar un monumento.  
  6. 🚫 **GET** `/api/monumentos/:id` después de eliminar → Validar que ya no existe.  

✅ **Todos los tests han sido ejecutados y validados.**

---

## 📜 **Documentación del Proyecto**
El código del frontend ha sido documentado de dos formas:

### 1️⃣ **JSDoc**
Se han generado comentarios de documentación en cada archivo clave del frontend.  

### 2️⃣ **Comentarios en el código**
Cada función importante cuenta con comentarios explicativos en el código.

✅ **Ambos métodos facilitan la comprensión y mantenimiento del código.**

---

## 🚀 **Despliegue en Railway**
La aplicación ha sido desplegada en **Railway** y está operativa en la siguiente URL:

🔗 **[Enlace a la aplicación en Railway](infotur-production.up.railway.app)**

📌 **Pasos para desplegar en Railway:**  
1️⃣ Crear un proyecto en Railway.  
2️⃣ Conectar el repositorio de GitHub.  
3️⃣ Configurar las variables de entorno (`.env`).  
4️⃣ Ejecutar `npm run build` y desplegar el frontend.  
5️⃣ Verificar que la API y el frontend están corriendo correctamente.  

---

## 🖥️ **Repositorio en GitHub**
El código fuente del proyecto está disponible en GitHub en el siguiente enlace:

🔗 **[Repositorio en GitHub](URL_AQUI)**