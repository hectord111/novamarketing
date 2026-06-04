# Nova Marketing — Web

Landing page de **Nova Marketing**: soluciones de marketing digital para empresas de
**reformas** e **instalaciones de energía renovable**, con un servicio completo por **400 €/mes**.

Hecha con **HTML, CSS y JavaScript puro**, sin dependencias ni paso de compilación.
Se abre directamente en el navegador y se despliega en cualquier hosting estático.

## 📁 Estructura

```
index.html     → contenido y estructura de la página
styles.css     → diseño, colores y responsive
script.js      → menú móvil, animaciones, FAQ y formulario
favicon.svg    → icono de la pestaña
```

## 👀 Ver la web en local

Solo tienes que abrir `index.html` en el navegador. Para verla con un pequeño servidor
(recomendado, evita limitaciones del modo `file://`):

```bash
# con Python
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## ✏️ Qué personalizar

Estos son los datos de ejemplo que conviene cambiar por los reales:

| Dónde | Qué cambiar |
|------|-------------|
| `index.html` | Email `hola@novamarketing.es`, WhatsApp `+34 600 000 000`, textos y testimonios |
| `index.html` | Cifras de la barra de estadísticas (`data-count`) |
| `script.js` | `DESTINO_EMAIL` (a dónde llegan las solicitudes del formulario) |
| Footer | Enlaces de Aviso legal, Privacidad y Cookies |

> Los **testimonios** son de ejemplo. Sustitúyelos por opiniones reales de tus clientes.

## ✉️ Formulario de contacto

Por defecto, al enviar el formulario se abre el cliente de correo del visitante con la
solicitud ya redactada (no necesita servidor).

Para **recibir los envíos automáticamente** en tu bandeja sin que el visitante haga nada:

1. Crea una cuenta gratuita en [Formspree](https://formspree.io) y copia tu endpoint.
2. En `script.js`, pon `USE_FORMSPREE = true` y sustituye `FORMSPREE_ENDPOINT`.

## 🚀 Desplegar (gratis)

Al ser estática, vale cualquiera de estas opciones:

- **Netlify** o **Vercel**: arrastra la carpeta o conecta el repositorio.
- **GitHub Pages**: Settings → Pages → publica desde la rama.
- **Cloudflare Pages**: conecta el repo, sin comando de build.

## 🎨 Diseño y colores

El estilo es **editorial**: fondo papel, tinta casi negra, un único acento tangerina,
titulares en serif (Fraunces), etiquetas en monoespaciada y retícula con reglas finas.
Sin degradados ni glassmorphism.

Los colores están centralizados al principio de `styles.css` en `:root`:

```css
--paper:   #F4F1EA;   /* fondo papel */
--paper-2: #EBE6DA;   /* fondo de secciones alternas */
--ink:     #171511;   /* tinta (texto y secciones oscuras) */
--accent:  #FF5A1F;   /* acento tangerina */
```

Tipografías: **Fraunces** (titulares serif) e **Inter** (texto), cargadas desde Google Fonts.
Las etiquetas pequeñas usan la monoespaciada del sistema.
