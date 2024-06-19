import "./Table.css";
// import Loader from "react-loader-spinner";

const Table = ({ placesList, loading, startIndex }) => {
  return (
    <div className="table-main-container">
      <h1 className="table-title">Places List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <div>
              {/* <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" /> */}
            </div>
          )}
          {!loading && placesList.length === 0 && (
            <div className="start-searching-container">
              <div className="start-searching">Start searching</div>
            </div>
          )}
          {!loading &&
            placesList.map((place, index) => (
              <tr key={place.id}>
                <td className="place-index">{startIndex + index + 1}</td>
                <td>{place.city}</td>
                <td>
                  <div className="country-code">
                    <p>{place.country}</p>
                    <img
                      src={`https://flagsapi.com/${place.countryCode}/flat/32.png`}
                      alt={`${place.country} flag`}
                      className="flag"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
