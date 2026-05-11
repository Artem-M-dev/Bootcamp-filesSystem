import './search.scss';

import searchIcon from '../../icons/searchIcon.svg';

const Search = () => {
    return (
        <div className="search">
            <img src={searchIcon} alt="" />
            <input name='file' type="text" placeholder='Go to file'/>
        </div>
    )
}

export default Search;