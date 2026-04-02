# ADIPA Landing - Version A (Next.js)

## Descripción
Landing page de catálogo de cursos ADIPA construida con Next.js 14+, Tailwind CSS y TypeScript.

## Incluye:
- Header (TopBar + Navbar)
- Hero section
- Grilla de cursos con data estática
- Filtro por categoría (client-side)
- Formulario de contacto con validación
- Footer
- Modo oscuro (dark mode)
- Diseño responsive

---

## Repositorios
- Versión A (Next.js): https://github.com/Rambell/version-a.git
- Versión B (Laravel): https://github.com/Rambell/version-b.git

## Deploy



## Tecnologías
- Next.js 14+ (App Router)
- Tailwind CSS 4
- TypeScript (strict mode)
- Framer Motion
- Radix UI Slider
- next-themes (dark mode)
- Lucide

## Versiones utilizadas

- Next.js: 16.2.2
- React: 19.2.4
- Node.js: v22+

## Instalación
```bash
cd version-a
npm install
```

## Desarrollo
```bash
npm run dev
```

## Build producción
```bash
npm run build
npm run start
```


## Tests
Para correr los tests:

\```bash
npm test
\```


### Tests unitarios con JEST

- **validateForm** — verifica la validación del formulario de contacto
- **filterCourses** — verifica el filtrado de cursos por categoría y modalidad


PASS  __test__/filterCourses.test.ts
PASS  __test__/validateForm.test.ts

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.218 s, estimated 12 s
Ran all test suites.


# Notas técnicas
- La data es estática (no se consume API externa)
- Se utilizó arquitectura basada en componentes reutilizables
- El manejo de estado y lógica de UI se implementa con React (client-side)
- Implementación de dark mode con persistencia en localStorage (next-themes)
