# Markdown Links
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Planeación](#3-planeacion)
* [4. Entregables](#4-entregables)
* [5. Checklist](#5-checklist)


## 1. Preámbulo

Es muy común encontrar varios archivos en formato [Markdown](https://es.wikipedia.org/wiki/Markdown),
por ejemplo en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.
## 2. Resumen del proyecto
En este proyecto se está construyendo un programa
que se ejecute usando Node.js, donde se interactua con el
sistema archivos, con el entorno (_proceso_, _env_, _stdin/stdout/stderr_), ...

Se creará una herramienta de línea de comando (CLI) así como una librería (o biblioteca - library) en JavaScript.

### ¿Qué es esta herramienta

Estoy realizando una investigación sobre glitch Art, durante el camino he encontrado repositorios sobre el tema, estos contienen links hacia libros pdf, hacia sitios de artistas, herramientas desarrolladas con código :), canales de video, imagenes en la web...
Los he estado reuniendo para mi documentación, sin embargo en algunos archivos los links estan caidos.
Con esta herramienta busco verificar cuales links aun son validos antes de ir clickeando uno por uno.

<img src="/src/glitchInvest/glitchManifesto.png" width="200" height="300"/>

## 3. Planeación
Realicé mi primer diagrama de flujo, esta es la 1er versión
<img src="/src/assets/diagrama1.png" alt="first" width="300" height="900"/>

## 4. Entregables
Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.

## 4. Checklist
¿Qué contiene este repositorio?
Por ahora, tambien una carpeta sobre glitch art
### `README.md`

* [ ] Un board con el backlog para la implementación de la librería.
* [ ] Documentación técnica de la librería.
* [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [ ] El módulo exporta una función con la interfaz (API) esperada.
* [ ] Implementa soporte para archivo individual
* [ ] Implementa soporte para directorios
* [ ] Implementa `options.validate`

### CLI

* [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [ ] Se ejecuta sin errores / output esperado
* [ ] Implementa `--validate`
* [ ] Implementa `--stats`

### Pruebas / tests

* [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [ ] Pasa tests (y linters) (`npm test`).
