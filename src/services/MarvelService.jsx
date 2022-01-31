class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=6ca5ae70a337e9cd63b6cd813ca09821';
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const informAboutAllChar = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return informAboutAllChar.data.results.map(this._transformChar)
  };

  getCharacter = async id => {
    const informAboutChar = await this.getResource(`${this._apiBase}characters/${id}?apikey=6ca5ae70a337e9cd63b6cd813ca09821`);
    return this._transformChar(informAboutChar.data.results[0]);
  };

  _transformChar = (char) => {
    return {
         id: char.id,
         name: char.name,
         descr: char.description ? `${char.description.slice(0,210)}...` : 'There is no description for this character', 
         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items
        }
  }
}

export default MarvelService;
