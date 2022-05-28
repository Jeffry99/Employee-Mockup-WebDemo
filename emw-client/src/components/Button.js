import './Button.css'

const Button = ({ children, id, onClick }) => {
    return (
        <button className='button' id={id} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button