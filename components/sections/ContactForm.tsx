'use client';

import { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';

interface FormFields {
  nombre: string;
  email: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio.';
  } else if (fields.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (!fields.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Ingresa un email válido.';
  }

  if (!fields.mensaje.trim()) {
    errors.mensaje = 'El mensaje es obligatorio.';
  } else if (fields.mensaje.trim().length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

export default function ContactForm() {
    const [fields, setFields] = useState<FormFields>({ nombre: '', email: '', mensaje: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updated = { ...fields, [name]: value };
        setFields(updated);
        if (touched[name]) {
        setErrors(validate(updated));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(fields));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched = { nombre: true, email: true, mensaje: true };
        setTouched(allTouched);
        const validationErrors = validate(fields);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
     
        await new Promise((res) => setTimeout(res, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    const inputBase = 'w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-all duration-200 bg-white';
    const inputNormal = 'border-gray-200 focus:border-[#6b46ff] focus:ring-2 focus:ring-[#6b46ff]/10';
    const inputError = 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100';

    if (submitted) {
        return (
        <section id="contacto" className="bg-[#f8f7ff] py-20 px-4">
            <div className="max-w-xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="bg-green-100 p-5 rounded-full">
                <CheckCircle size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#2d3748]">¡Mensaje enviado!</h3>
                <p className="text-[#5b6987] text-[15px]">
                Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo a la brevedad.
                </p>
                <button
                onClick={() => {
                    setSubmitted(false);
                    setFields({ nombre: '', email: '', mensaje: '' });
                    setTouched({});
                    setErrors({});
                }}
                className="mt-2 text-[#6b46ff] text-[13px] hover:underline"
                >
                Enviar otro mensaje
                </button>
            </div>
            </div>
        </section>
        );
    }

    return (
        <section id="contacto" className="bg-[#f8f7ff] py-20 px-4">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[40px]">
                <div className="max-w-2xl mx-auto">

        
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#2d3748] mb-3">
                        Encuentra el curso ideal para tí
                    </h2>
                    <p className="text-[#5b6987] text-[15px]">
                        Déjanos tu mensaje y te ayudaremos a elegir la mejor opción
                    </p>
                </div>

        
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

             
                    <div>
                        <label className="block text-[13px] font-semibold text-[#2d3748] mb-1.5">
                            Nombre <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={fields.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Tu nombre completo"
                            className={`${inputBase} ${errors.nombre && touched.nombre ? inputError : inputNormal}`}
                            />
                            {errors.nombre && touched.nombre && (
                                <p className="text-red-500 text-[12px] mt-1.5">{errors.nombre}</p>
                            )}
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-[#2d3748] mb-1.5">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="tu@email.com"
                            className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
                            />
                            {errors.email && touched.email && (
                                <p className="text-red-500 text-[12px] mt-1.5">{errors.email}</p>
                            )}
                    </div>

                
                <div>

                    <label className="block text-[13px] font-semibold text-[#2d3748] mb-1.5">
                        Mensaje <span className="text-red-400">*</span>
                    </label>

                    <textarea
                        name="mensaje"
                        value={fields.mensaje}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Escribe tu consulta aquí..."
                        rows={5}
                        maxLength={300}
                        className={`${inputBase} resize-none ${
                            errors.mensaje && touched.mensaje ? inputError : inputNormal
                            }`}
                    />

                    <div className="flex items-center justify-between mt-1"> 
                        {errors.mensaje && touched.mensaje ? (
                            <p className="text-red-500 text-[12px]">{errors.mensaje}</p>
                        ) : (
                        <span className="text-[12px] text-gray-400">
                            Mínimo 10 caracteres
                        </span>
                        )}

    
                        <span
                            className={`text-[11px] ml-auto ${
                                fields.mensaje.length === 300
                                ? "text-red-500"
                                : fields.mensaje.length >= 10
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                        >
                            {fields.mensaje.length}/300
                        </span>
                    </div>
                </div>

             
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#6b46ff] hover:bg-[#5a35ee] disabled:opacity-70 disabled:cursor-not-allowed
                        text-white font-semibold py-3.5 rounded-xl transition-all duration-200
                        flex items-center justify-center gap-2 text-[15px]"
                >
                    {loading ? (
                    <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                            Enviando...
                    </>
                    ) : (
                    <>
                        <Send size={16} />
                        Enviar mensaje
                    </>
                    )}

                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}