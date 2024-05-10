function SearchPeople({ handleSearchPeople, searchQueryUser }) {
  function handleChange(e) {
    handleSearchPeople(e.target.value);
  }

  return (
    <form className="mb-4">
      <label htmlFor="searchPeople"></label>
      <input
        type="text"
        id="searchPeople"
        name="searchPeople"
        value={searchQueryUser}
        onChange={(e) => handleChange(e)}
        placeholder="Search..."
        className="w-100"
      />
    </form>
  );
}

export default SearchPeople;
