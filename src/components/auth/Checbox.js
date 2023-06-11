const CheckBox = ({ name, checked, handleChange }) => {
    return (
        <>
            <label htmlFor='rememberLogin'>Remember login?</label>
            <input
                type='checkbox'
                name={name}
                checked={checked}
                onChange={handleChange}
            />
        </>
    );
};

export default CheckBox;
