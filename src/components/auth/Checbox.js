const CheckBox = ({ name, checked, setChecked}) => {

    return (
        <>
            <label htmlFor="rememberLogin">Remember login?</label>
            <input
                name={ name }
                type="checkbox"
                checked={checked}
                onChange={setChecked}/>
        </>
    );
};

export default CheckBox