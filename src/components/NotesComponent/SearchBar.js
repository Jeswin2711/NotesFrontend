import SearchIcon from '@mui/icons-material/Search';


const Search = ({ handleSearch }) => {
    
    return (<div className='search'>
        <SearchIcon />
        <input type="text" placeholder="Search here" onChange={(e) => handleSearch(e.target.value)} />
    </div>)
}

export default Search