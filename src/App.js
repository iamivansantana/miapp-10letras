import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cancion from './components/Cancion';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import Info from './components/Info';


function App() {

  //Definir el state
  const [busquedaLetra,guardarBusquedaLetra]=useState({});
  const [letra,guardarLetra]=useState('');
  const [info,guardarInfo]=useState({});

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;

    const consultarAPIletra = async()=>{
      const {artista,cancion}=busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        Axios(url),
        Axios(url2)
      ]);
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]); 
      
      
    }
    consultarAPIletra();
    
  }, [busquedaLetra]);

  return (
    <>
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col md-6">
            <Info 
              info={info}
            />
          </div>
          <div className="col md-6">
            <Cancion 
              letra={letra}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
