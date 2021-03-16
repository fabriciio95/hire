import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./useAuth"

export const useHeaderItems = () => {
  const auth = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = [];
    if(auth.isAuthenticated()) {
      items.push({ name: "Buscar", href: "/busca" });
      if(auth.credentials){
        items.push({ name : "Minha Conta", href : `/cadastro/${auth.credentials.id}` });
      }
      items.push({name : "Sair", href: "/busca", onClick: () => auth.logout()});
    } else {
      items.push( { name: "Entre", href: "/login" });
    }
    setItems(items);
    // eslint-disable-next-line
  }, [auth.credentials]);

  return { items };
}