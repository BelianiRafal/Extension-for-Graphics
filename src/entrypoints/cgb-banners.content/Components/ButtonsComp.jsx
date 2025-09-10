import Loader from './Loader';
import '../styles/style.scss';

export default function ButtonsComp(props) {
  return (
    <div>
      <button
        onClick={props.componentFunction}
        className={props.loading ? `loaderClass ${props.className}` : `animated-button ${props.className}`}
      >
        {props.loading ? <Loader /> : props.name}
      </button>
    </div>
  );
}
