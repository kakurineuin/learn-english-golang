import { useAppSelector } from '../store/hooks';

function Loader() {
  const isLoading = useAppSelector((state) => state.loader.isLoading);

  return (
    <>
      {isLoading && (
        <div>
          <div className="overlay" />
          <div className="loader" />
        </div>
      )}
    </>
  );
}

export default Loader;
