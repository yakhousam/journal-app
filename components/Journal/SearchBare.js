import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";


export default function SearchBare(props) {
  const [titles, useTitles] = useState([]);
  const [search, useSearch] = useState([]);
  useEffect(() => {
    // console.log('search bare use effect')
    const getTitles = async() => {
      if(!props.userId) return 
      const res = await fetch(`/api/getNotesTitles/${props.userId}`);
      const json = await res.json();
      const titles = json.map(title => title.title)
      // console.log('searchbare =', titles)
      useTitles(titles);
    };
    getTitles();
    
  },[props.updateNotes, props.userId]);

  const handleChange = (e)=>{
    useSearch(e.target.value)
  }
  const doSearch = (e)=>{
    e.preventDefault();
    if(!search) return;
    const query = `?title=${search}`
    props.setNoteListQuery(query)
    useSearch('')
  }
  return (
    <div className="search">
      <form onSubmit={doSearch}>
        <input list="list-titles" placeholder="Search Entries" value={search} onChange={handleChange}/>
        <datalist id="list-titles">
           {titles.map((title, i)=> <option key={i} value={title}></option>)}
        </datalist>
        <input type="submit" value="Search" />
      </form>
      <style jsx>{`
        .search {
          background: purple;
          padding: 1em;
        }
      `}</style>
    </div>
  );
}
