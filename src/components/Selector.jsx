import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Selector = ({setType}) => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setType(event.target.value)
        // console.log(event.target.value)
      // setAge(event.target.value);
    };

  return (
    
<form className="max-w-sm mx-auto">
  <select
  onChange={handleChange} 
  id="countries" 
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose Emission type</option>
    <option value="Oil">Oil</option>
    <option value="Coal">Coal</option>
    <option value="Gas">Gas</option>
    <option value="Cement">Cement</option>
    <option value="Flaring">Flaring</option>
    <option value="Other">Other</option>
  </select>
</form>

)
}

export default Selector