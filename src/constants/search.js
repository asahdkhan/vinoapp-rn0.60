export const SPECIAL_SEARCH_KEYS = {
  score: "averageScore",
  value: "suggestedPrice",
  varietal: "varieties",
  varietal: "wine.varieties",
  mood: "mood",
  cellar: "winery.id",
  featured: "personality"
}

export const SPECIAL_SEARCH_CONFIG = {
  en : {
    score: {
      label: 'SCORE RANGE',
      helpText: 'Search wines with the range score between',
      type: 'range',
      unity: 'pts',
      min: 1,
      max: 100,
      searchType: 'vintage'
    },

    value: {
      label: 'PRICE RANGE',
      helpText: 'Search wines within your price range',
      type: 'range',
      unity: 'USD',
      min: 1,
      max: 300,
      searchType: 'vintage'
    },

    featured: {
      label: 'FEATURED',
      helpText: 'Search for one or more characteristics that we have found in the wines.',
      type: 'list',
      searchType: 'vintage'
    }, 

    varietal: {
      label: 'VARIETIES',
      helpText: 'Select the varietals that you \nwant in your wine',
      type: 'list',
      searchType: 'vintage'
    },  

    mood: {
      label: 'Mood Pairing',
      helpText: 'Select the mood that you \nwant in your wine',
      helpText: `Pick a mood and we'll show you some wines that are most suited to your mood`,
      type: 'list',
      searchType: 'vintage'
    },  

    cellar: {
      label: 'WINERIES',
      helpText: 'Selec the winery',
      type: 'list',
      searchType: 'wine'
    }
  }, 
  es : {
    score: {
      label: 'RANGO DE PUNTOS',
      helpText: 'Busque vinos entre los puntajes',
      type: 'range',
      unity: 'pts',
      min: 1,
      max: 100,
      searchType: 'vintage'
    },

    value: {
      label: 'RANGO DE PRECIOS',
      helpText: 'Seleccione el rango de precios.',
      type: 'range',
      unity: 'USD',
      min: 1,
      max: 1000,
      searchType: 'vintage'
    },

    featured: {
      label: 'CATEGORÍAS',
      helpText: 'Busque por una o más características que hemos detectado en los vinos.',
      type: 'list',
      searchType: 'vintage'
    }, 

    varietal: {
      label: 'VARIEDADES',
      helpText: 'Selecciones los varietales que busca.',
      type: 'list',
      searchType: 'wine'
    },  

    cellar: {
      label: 'BODEGAS',
      helpText: 'Seleccione la bodega',
      type: 'list',
      searchType: 'wine'
    }
  }
}