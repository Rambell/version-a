interface FormFields {
    nombre: string
    email: string
    mensaje: string
}

function validate(fields: FormFields) {
    const errors: Record<string, string> = {}
    if (!fields.nombre.trim()) errors.nombre = 'El nombre es obligatorio.'
    else if (fields.nombre.trim().length < 2) errors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    if (!fields.email.trim()) errors.email = 'El email es obligatorio.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Ingresa un email válido.'
    if (!fields.mensaje.trim()) errors.mensaje = 'El mensaje es obligatorio.'
    else if (fields.mensaje.trim().length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    return errors
}

describe('validate formulario contacto', () => {
    it('retorna errores si todos los campos están vacíos', () => {
        const errors = validate({ nombre: '', email: '', mensaje: '' })
        expect(errors.nombre).toBe('El nombre es obligatorio.')
        expect(errors.email).toBe('El email es obligatorio.')
        expect(errors.mensaje).toBe('El mensaje es obligatorio.')
    })

    it('retorna error si el email es inválido', () => {
        const errors = validate({ nombre: 'Juan', email: 'correo-invalido', mensaje: 'Hola, necesito info' })
        expect(errors.email).toBe('Ingresa un email válido.')
    })

    it('retorna error si el mensaje tiene menos de 10 caracteres', () => {
        const errors = validate({ nombre: 'Juan', email: 'juan@test.com', mensaje: 'corto' })
        expect(errors.mensaje).toBe('El mensaje debe tener al menos 10 caracteres.')
    })

    it('no retorna errores si todos los campos son válidos', () => {
        const errors = validate({ nombre: 'Juan', email: 'juan@test.com', mensaje: 'Hola, necesito información sobre los cursos.' })
        expect(Object.keys(errors)).toHaveLength(0)
    })
})