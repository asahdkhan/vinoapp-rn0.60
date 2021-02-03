export const WINE_FILTERS = {
  'wine.type': '',
  'wine.sweetness': '',
  'wine.varieties': [],
  'province': [],
  'zone': [],
  'wine.singleVineyard': 0,
  'wine.averageScore': {
    gte: 70,
    lte: 100,
  },
  'intensity.acidity': {
    gte: 0,
    lte: 5,
  },
  'intensity.aroma': {
    gte: 0,
    lte: 5,
  },
  'intensity.fruit': {
    gte: 0,
    lte: 5,
  },
  'intensity.spice': {
    gte: 0,
    lte: 5,
  },
  'intensity.wood': {
    gte: 0,
    lte: 5,
  },
  'wine.elevation': {
    gte: 0,
    lte: 3000,
  },
  'suggestedPrice': {
    gte: 1,
    lte: 300,
  },
  'wine.ageability': {
    gte: 0,
    lte: 50,
  },
  'year': {
    gte: 0,
    lte: 0,
  },
  /* 'cases_9l': {
    gte: 0,
    lte: 1000,
  }, */
  'barrelAging': {
    gte: 0,
    lte: 36,
  },
  'oak': [],
}


export const BODY_OPTIONS = {
  es: [
    { name: 'Ninguno', value: ''},
    { name: 'Ligero', value: 'light'},
    { name: 'Medio', value: 'medium'},
    { name: 'Completo', value: 'full'},
  ],
  en: [
    { name: 'None', value: ''},
    { name: 'Light', value: 'light'},
    { name: 'Medium', value: 'medium'},
    { name: 'Full', value: 'full'},
  ]
}

export const FINISH_OPTIONS = {
  en: [
    { name: 'None', value: ''},
    { name: 'Short', value: 'short'},
    { name: 'Medium', value: 'medium'},
    { name: 'Long', value: 'long'},
  ],
  es: [
    { name: 'Ninguno', value: ''},
    { name: 'Corto', value: 'short'},
    { name: 'Medio', value: 'medium'},
    { name: 'Largo', value: 'long'},
  ]
}

export const DECANTER_OPTIONS = {
  en: [
    { name: 'None', value: ''},
    { name: 'Esencial', value: 'Esencial'},
    { name: 'Ideal', value: 'Ideal'},
    { name: 'No need', value: 'No need'},
  ],

  es: [
    { name: 'Ninguno', value: ''},
    { name: 'Necesario', value: 'Esencial'},
    { name: 'Idealmente', value: 'Ideal'},
    { name: 'No hace falta', value: 'No need'},
  ]
}
