import "./DetailsMediatation.css";
import BackButton from "../../components/BackButton/BackButton";
import Stats from "../../components/Stats/Stats";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const DetailsMediatation = () => {
  const [tracksData, setTracksData] = useState();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(`/api/spotify/tracks`, params);
      setTracksData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Meditation details</h1>
      <section>
        <div>
          <BackButton />
        </div>
        <div>
          <Stats />
          {tracksData?.items?.map((track) => (
            <div key={track.track.id}>
              <NavLink to={`/meditationplayer/${track.track.id}`}>
                <h1>KLICK MICh</h1>
              </NavLink>
              <h3>{track.track.name}</h3>
              <p>{(track.track.duration_ms / 60000).toFixed()} MIN</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DetailsMediatation;
