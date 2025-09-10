import { MagnifyingGlass } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="loaderWrapper">
      <MagnifyingGlass
        visible={true}
        height="40"
        width="40"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#7a5f61ff"
      />
      <p>Please wait...</p>
    </div>
  );
}
