import classes from './LoaderMini.module.css';

function Loader() {
  return (
    <div className={classes['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
