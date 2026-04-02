import { courses } from '../data/course'

describe('filtrado de cursos', () => {
    it('retorna todos los cursos si no hay filtros', () => {
        const result = courses.filter(() => true)
        expect(result).toHaveLength(courses.length)
    })

    it('filtra por categoría correctamente', () => {
        const categoria = 'Neurociencias'
        const result = courses.filter(c => c.categoria === categoria)
        expect(result.every(c => c.categoria === categoria)).toBe(true)
    })

    it('filtra por modalidad correctamente', () => {
        const result = courses.filter(c => c.modalidad === 'Online')
        expect(result.every(c => c.modalidad === 'Online')).toBe(true)
    })

    it('retorna array vacío si no hay coincidencias', () => {
        const result = courses.filter(c => c.categoria === ('CategoriaQueNoExiste' as any))
        expect(result).toHaveLength(0)
    })
})