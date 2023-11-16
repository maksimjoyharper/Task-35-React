import { useCallback, useEffect, useState } from "react";
import { useSearchContext } from "../search/SearchProvider";
import "./styleCard.css";

import { Card } from "./Card";
import { IGames } from "../../data/models";
import { getGames } from "../../servises/getGames";
import { Pagination } from "antd";
import { Loading } from "../loading/loading";
import { Genre } from "../genres/genres";

export function RenderCards() {
  const [cards, setCards] = useState<IGames[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState("all");

  const { debounsedSearch } = useSearchContext();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const getGenre = useCallback((genres: string) => {
    setGenre(genres);
  }, []);

  const lastPage = page + pageSize;
  const firstPage = lastPage - pageSize;
  const currentPage = cards.slice(firstPage, lastPage);

  useEffect(() => {
    setLoading(true);
    getGames(debounsedSearch, genre, pageSize, page)
      .then((data) => {
        setCards(data.results);
        setTotal(data.count);
      })
      .finally(() => setLoading(false));
  }, [genre, debounsedSearch, pageSize, page]);
  // console.log(pageSize);

  const onShowSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
  const itemRender = (
    page: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <a>Previos</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    page;
    return originalElement;
  };

  return (
    <>
      <Genre onSelected={getGenre} />

      {loading && <Loading />}

      <div id="container">
        {currentPage.map((card) => (
          <Card card={card} key={card.id} />
        ))}

        <div id="paginatoin_box">
          <Pagination
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            defaultCurrent={pageSize}
            pageSize={pageSize}
            pageSizeOptions={[20, 40]}
            total={total}
            current={page}
            showSizeChanger={true}
            onShowSizeChange={onShowSizeChange}
            itemRender={itemRender}
          />
        </div>
      </div>
    </>
  );
}
