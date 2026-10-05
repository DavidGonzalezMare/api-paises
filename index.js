require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Países',
    endpoints: [
      '/continentes',
      '/paises',
      '/paises/:continente',
      '/infopais/:pais'
    ]
  });
});

app.get('/continentes', async (req, res) => {

  const { data, error } = await supabase
    .from('continentes')
    .select('nombre, imagen');

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get('/infopais/:pais', async (req, res) => {

  const pais = req.params.pais;

  const { data, error } = await supabase
    .from('paises')
    .select('*')
    .eq('nombre', pais)
    .single();

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get('/paises', async (req, res) => {

  const { data, error } = await supabase
    .from('paises')
    .select('*');

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get('/paises/:continente', async (req, res) => {

  const continente = req.params.continente;

  const { data, error } = await supabase
    .from('paises_con_continente')
    .select('nombre, imagen')
    .eq('continente', continente);

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});