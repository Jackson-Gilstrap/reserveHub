'use client';


const FilingStatus = () => {

    
    return (
        <>
        <div>
            <label htmlFor="jointly_selection_form">Are you filing jointly or separately?</label>
            <input type="radio" name="jointly_selection_form" id="jointly1" value={"jointly"} />
            <input type="radio" name="jointly_selection_form" id="separately1" value={"spepartely"} checked />

        </div>
        <div>
            <label htmlFor="dependent_selection_form">Are you claiming a dependent?</label>
            <input type="radio" name="dependent_selection_form" id="dependent_yes" value={"yes"} />
            <input type="radio" name="dependent_selection_form" id="dependent_no" value={"no"} checked />

        </div>
        </>
    )
    
}

export default FilingStatus