import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './utils/GlobalStyles';
import { APP } from './App.styled';
import api from 'services/apiFetcher';
import { Searchbar } from './Searchbar/Searchbar';
import { imagesMapper } from '../services/imageMapper';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [clickedImageUrl, setClickedImageUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [totPages, setTotPages] = useState(null);

  useEffect(() => {
    if (query === null) {
      return;
    }
    async function getImages() {
      setIsloading(true);
      try {
        const array = await api.fetchImages(query, page);

        if (!array.hits.length) {
          toast.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setTotPages(Math.ceil(array.totalHits / 12));

        console.log(array);
        console.log(array.totalHits);
        // scrollHandler();

        setImages(prevImages => [...prevImages, ...imagesMapper(array.hits)]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getImages();
    scrollHandler();
  }, [page, query]);

  useEffect(() => {
    if (page >= totPages && page !== 1) {
      lastPageNotify();
    }
  }, [page, totPages]);

  //* Пробую сократить до вызова в онКлик setClickedImageUrl
  // const getCkickedImgUrl = data => {
  //   setClickedImageUrl(data);
  // };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setClickedImageUrl(null);
  };

  const onFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const scrollHandler = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  //* ФУ чтоб вызвать Нотификашку react-toastify с кастомными настройками типа...
  const lastPageNotify = () => {
    toast.error("We're sorry, but you've reached the end of search results.", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  // const { images, isLoading, page, totPages, clickedImageUrl } = this.state;

  return (
    <APP>
      <Searchbar onSubmit={onFormSubmit} loading={isLoading}></Searchbar>
      {images && (
        <ImagesGallery options={images} onClick={setClickedImageUrl} />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        images &&
        page < totPages && <Button onClick={nextPage} loading={isLoading} />
      )}
      {clickedImageUrl && (
        <Modal closeModal={closeModal} url={clickedImageUrl} />
      )}

      <GlobalStyle />
      <ToastContainer />
    </APP>
  );
}
