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
  // state = {
  //   images: [],
  //   clickedImageUrl: null,
  //   page: 1,
  //   query: null,
  //   isLoading: false,
  //   totPages: null,
  // };
  const [images, setImages] = useState([]);
  const [clickedImageUrl, setClickedImageUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [totPages, setTotPages] = useState(null);

  // componentDidUpdate (_, prev) {
  //   const { page, query, totPages, images } = this.state;

  //   if (prev.page !== page || prev.query !== query) {
  //     getImages();
  //   }
  //   if (page >= totPages && images !== prev.images && page !== 1) {
  //     // toast.error("We're sorry, but you've reached the end of search results.");
  //     lastPageNotify();
  //   }

  //   scrollHandler();
  // };

  useEffect(() => {
    // const array = api.fetchImages(query, page);
    // console.log(array);
    // console.log(array.totalHits);
    getImages();
    // scrollHandler();
  }, [page, query]);

  const getCkickedImgUrl = data => {
    setClickedImageUrl(data);
  };

  // getImages = async () => {
  //   const { page, query } = this.state;
  //   this.setState({ isLoading: true });
  //   try {
  //     const array = await api.fetchImages(query, page);

  //     if (!array.hits.length) {
  //       toast.warning(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //     }
  //     this.setState({ totPages: Math.ceil(array.totalHits / 12) });

  //     console.log(array);
  //     console.log(array.totalHits);
  //     this.setState(prev => ({
  //       images: [...prev.images, ...imagesMapper(array.hits)],
  //     }));
  //     // this.setState({ isLoading: false });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

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
      scrollHandler();

      setImages(prevImages => [...prevImages, ...imagesMapper(array.hits)]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  // nextPage = () => {
  //   this.setState(({ page }) => ({
  //     page: page + 1,
  //   }));
  // };
  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  // closeModal = () => {
  //   this.setState({ clickedImageUrl: null });
  // };
  const closeModal = () => {
    setClickedImageUrl(null);
  };

  // onFormSubmit = query => {
  //   if (query !== this.state.query) {
  //     this.setState({ page: 1, images: [], query });
  //   }
  // };
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

  // lastPageNotify() {
  //   toast.error("We're sorry, but you've reached the end of search results.", {
  //     position: 'top-right',
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'colored',
  //   });
  // }

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
      {images && <ImagesGallery options={images} onClick={getCkickedImgUrl} />}

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
