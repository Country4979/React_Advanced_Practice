import { useState } from "react";

export const useChecked = () => {
    const [checked, setChecked] = useState(false); 

    const handleClickCheckBox = ({ target }) => {
        //Con esto veo si está ckecked o no.
        setChecked({
            ...checked,
            [ target.name ]: !checked[ target.name ],
        });
        console.log(checked)
    }

    return [ checked, handleClickCheckBox ];
};