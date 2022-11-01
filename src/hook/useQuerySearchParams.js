import queryString from "query-string";
import { useEffect, useState } from "react";

const useQuerySearchParams = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    setResponse(queryString.parse(window.location.search));
  }, [window.location.search]);

  return response;
};

export default useQuerySearchParams;
