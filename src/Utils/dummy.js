const objectc = {
  userid1: {
    watchlists: {
      watchlistId1: {
        movies: {},
      },
    },
  },
  userid2: {
    watchlists: {
      watchlistId2: {
        movies: {},
      },
    },
  },
  userid3: {
    watchlists: {
      watchlistId2: {
        movies: {},
      },
    },
  },
};

const allwatchlists = [];
for (const userid in objectc) {
  const userwatchlists = objectc[userid].watchlists;
  console.log(userwatchlists);
}
