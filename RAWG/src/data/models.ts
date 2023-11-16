export interface IGames {
  id?: string;
  name: string;
  background_image: string;
  released: string;
}

export interface IGenres {
  id?: string;
  name: string;
  slug?: string;
}

export interface ISearchContext {
  search: string;
  debounsedSearch: string;
  onSearch(newSearch: string): void;
}
