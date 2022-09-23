import { useEffect, useState } from "react";

import { Iwilder } from "../types/Iwilders";
import Wilder from "../components/Wilder";
import WilderForm from "../components/WilderForm";
import { getAllWilders } from "../services/wilders";

function Home() {
  const [wilders, setWilders] = useState<Iwilder[]>([]);
  const [loadingWilders, setLoadingWilders] = useState(false);

  const loadWildersIntoState = async () => {
    setLoadingWilders(true);
    try {
      setWilders(await getAllWilders());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilders(false);
    }
  };

  useEffect(() => {
    loadWildersIntoState();
  }, []);

  return (
    <>
      <main className="container">
        <WilderForm loadWildersIntoState={loadWildersIntoState} />
        <h2>Wilders</h2>
        <section className="card-row">
          {loadingWilders
            ? "Loading..."
            : wilders.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  setWilders={setWilders}
                  wilder={wilder}
                />
              ))}
        </section>
      </main>
    </>
  );
}

export default Home