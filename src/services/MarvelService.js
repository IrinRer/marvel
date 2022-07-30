import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=6ca5ae70a337e9cd63b6cd813ca09821";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (char) => {
    return {
      id: char.id,
      title: char.title,
      prices: char.prices[0].price
        ? `${char.prices[0].price}$`
        : "not available",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      desc: char.description || "There no description",
      language: char.textObjects.language || "en-rus",
      pageCount: char.pageCount || "No information about the number of pages",
    };
  };
  return {
    loading,
    error,
    getCharacter,
    getAllComics,
    getAllCharacters,
    clearError,
    getComic,
  };
};

export default MarvelService;
