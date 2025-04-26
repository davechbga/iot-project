
# 🌐 IoT Dashboard - Tecnologías Emergentes (UNIR)

Proyecto realizado para la asignatura **Tecnologías Emergentes** de la **UNIR**.



## 📚 Índice

- [Descripción](#-descripción)
- [Objetivos logrados](#-objetivos-logrados)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Vista general del Dashboard](#-vista-general-del-dashboard)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Mejoras futuras](#-mejoras-futuras)
- [Licencia](#-licencia)



## 🧠 Descripción

Esta aplicación web permite la gestión **intuitiva** de datos ambientales provenientes de sensores **IoT** utilizando **ThingSpeak** como plataforma de backend.

Construido con una stack moderna, el proyecto integra **APIs REST** para la obtención y visualización de datos en **tiempo real**.



## 🎯 Objetivos logrados

- ✅ **Integración con ThingSpeak**: obtención y envío de datos de sensores IoT de manera ágil.
- ✅ **Interfaz React + Tailwind**: gestión intuitiva y moderna de datos ambientales.
- ✅ **Prototipado rápido**: uso de frameworks modernos para acelerar el desarrollo funcional.
- ✅ **Escalabilidad**: diseño preparado para futuras integraciones en smart cities o sistemas reales.



## 🚀 Tecnologías utilizadas

- ⚛️ **React**
- 🛡️ **TypeScript**
- ⚡ **Vite**
- 🎨 **TailwindCSS**
- 🖌️ **Shadcn/ui**
- ✨ **Lucide-react** (iconografía)
- 🔔 **Sonner** (notificaciones)



## 📸 Vista general del Dashboard

El Dashboard principal de la app contiene:

- 🔄 Botón de actualización de datos en tiempo real.
- 📊 Gráficas dinámicas de datos ambientales (**temperatura**, **humedad**, etc.).
- 📈 Sección de estado del sistema con actualización automática.
- 📥 Formulario de envío de datos a ThingSpeak.
- 📋 Tabla de datos recibidos del canal.

### 🛠 Estructura básica del Dashboard (fragmento)

```tsx
<div className="space-y-6">
  <header> {/* Título y botón de refrescar */} </header>
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
    <SystemStatus />
    <Charts />
    <SensorForm />
  </div>
  <DataDisplay />
</div>
```

El Dashboard **refresca automáticamente** los datos cada 30 segundos y permite envío manual de nuevos datos a través del formulario.



## 🛠 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno

Crea un archivo `.env` en la raíz del proyecto con tus claves de API de ThingSpeak:

```env
VITE_THINGSPEAK_API_KEY=tu_api_key
VITE_THINGSPEAK_CHANNEL_ID=tu_channel_id
```

### 4. Iniciar la app

```bash
npm run dev
```

Accede a la app en 👉 **[http://localhost:5173](http://localhost:5173)**


## 📂 Estructura del proyecto

```bash
src/
├── components/
│   ├── Charts.tsx
│   ├── DataDisplay.tsx
│   ├── SensorForm.tsx
│   └── SystemStatus.tsx
├── utils/
│   └── api.ts
├── types/
│   └── SensorData.ts
├── pages/
│   └── Dashboard.tsx
└── App.tsx
```



## ⚡ Mejoras futuras

- 🌍 Implementar geolocalización de sensores.
- 📡 Soporte para múltiples canales y tipos de sensores.
- 📈 Integración de dashboards personalizados con filtros avanzados.
- ☁️ Despliegue en plataformas cloud como **Vercel** o **Netlify**.



## 📜 Licencia

Este proyecto se entrega como **actividad académica** para **UNIR**.  
Código abierto para fines **educativos** y **demostrativos**.

