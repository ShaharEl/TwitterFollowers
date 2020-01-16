import React, {useState} from "react";
import './SelectDropDown.css'

const SelectDropDown = (props) => {

    const {options, onChange} = props;
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="dropDown">
            <h5>Sort Followers</h5>
            <select id="selectDropDown" className="selectBox" onChange={handleChange} value={selectedOption}>
                {Object.keys(options).map((option, index) => {
                    return <option key={index} name={option} value={options[option]}>{options[option]}</option>
                })}
            </select>
        </div>
    )
};

export default SelectDropDown;
