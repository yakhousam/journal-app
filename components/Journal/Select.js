

const Select = props => {
    const handleChange = (e)=>{
        // console.log('select value = ', e.target.value)
        const query = e.target.value ? `?date=${e.target.value}` : '';
        props.setNoteListQuery(query)
    }
  return (
    <select onChange={handleChange}>
      <option value='month' defaultValue>This month</option>
      <option value='day'>Today</option>
      <option value=''>All</option>
    </select>
  );
};

export default Select