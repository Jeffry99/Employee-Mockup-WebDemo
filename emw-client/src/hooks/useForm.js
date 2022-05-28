import { useState } from 'react'

const useForm = (init) => {
    const [form, setForm] = useState(init)
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        })
    }

    const reset = () => {
        setForm(init)
    }

    return [form, handleChange, reset]
}

export default useForm