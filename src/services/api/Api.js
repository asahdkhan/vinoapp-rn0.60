export default (api, blogAPI) => ({
  auth: {
    /*
     * Authenticate request to api.vinoapp.co
     * @param {String} username (email)
     * @param {String} password
     * @return {Object} axios promise
     */
    login: (username, password) => {
      return api.post("auth/signin", {
        email: username,
        password: password,
      });
    },

    /*
     * SignUp a new app-user to the platform.
     * @param {Object} user
     * @return {Object} axios promise
     */
    signup: (user) => {
      user["userType"] = "app_user";
      return api.post("auth/signup", user);
    },

    forgotPassword: (user) => {
      return api.post("auth/forgotpassword", user);
    },

    /*
     * Social authentication request
     * @param {String} type : facebook | twitter
     * @param {String} token
     * @return {Object} axios promise
     */
    socialSignup: (type = "facebook", token) =>
      api.post("auth/social/?type=" + type + "&access_token=" + token),

    /*
     * Request the profile info of the current user.
     * @return {Object} axios promise
     */
    getInfo: () => api.get("profiles/info"),

    /*
     * Request the rates of the current user
     * @return {Object} axios promise
     */
    getRates: () => api.get("profiles/rates"),

    updateInfo: (info) => api.post(`profiles/edit/`, info),

    changeAvatar: (newPhoto) => {
      const fileHeaders = {
        "Content-Type": "multipart/form-data; boundary=-----",
      };
      let formData = new FormData();
      formData.append("photo", {
        uri: newPhoto,
        name: "image.jpg",
        type: "multipart/form-data",
      });
      return api.post("profiles/avatar/", formData, fileHeaders);
    },

    sendMessage: (message) => api.post("profiles/contact", { message }),
  },

  feed: {
    get: (page, limit) => api.get(`feeds?page=${page}&limit=${limit}`),
    getPublicFeed: (page, limit) =>
      api.get(`feeds/public?page=${page}&limit=${limit}`),
  },

  blog: {
    abc: () => blogAPI.get(`categories`),
    getAllPost: (page, limit) =>
      blogAPI.get(
        `posts/?categories_exclude=99&page=${page}&per_page=${limit}`
      ),
    getPostByCategory: (page, limit, category) =>
      blogAPI.get(
        `posts?page=${page}&per_page=${limit}&categories=${category}`
      ),
  },

  articles: {
    getDetail: (id) => api.get(`articles/${id}`, { populate: "likes" }),

    getComments: (id) =>
      api.get(`comments`, {
        objectId: id,
        objectType: "article",
        populate: "createdBy,likes",
        sort: "createdAt%20DESC",
      }),

    setLike: (id, accountId, like) => {
      if (like) {
        return api.post(`articles/${id}/likes/${accountId}`);
      } else {
        return api.delete(`articles/${id}/likes/${accountId}`);
      }
    },

    comment: (id, accountId, comment) => {
      return api.post(`comments`, {
        objectType: "article",
        objectId: id,
        createdBy: accountId,
        text: comment,
      });
    },

    likeComment: (commentId, accountId, like = true) => {
      if (like) {
        return api.post(`comments/${commentId}/likes/${accountId}`);
      } else {
        return api.delete(`comments/${commentId}/likes/${accountId}`);
      }
    },
  },

  wines: {
    search: (data) => api.post("search/wines", data),

    /**
     * Get wine count by zones
     * @return {Object} axios promise
     */
    getZonesWineCount: () => api.get("wines/state"),

    /**
     * Get wine detail data
     * @return {Object} axios promise
     */
    getDetail: (id, extras) => api.get(`wines/${id}`, extras),

    /**
     * Get related wines
     * @return {Object} axios promise
     */
    getRelatedWines: (wine) => api.post(`wines/related`, { wine }),

    /**
     * Get wine comments
     * @return {Object} axios promise
     */
    getComments: (id) =>
      api.get(
        `comments?objectId=${id}&objectType=wine&populate=createdBy,likes&sort=createdAt%20DESC`
      ),

    getPairings: (pairings) => api.get(`pairings`, { id: pairings }),

    setFavorite: (wineId, favorite) =>
      api.post("profiles/favorite", {
        wineID: wineId,
        favorite,
      }),

    comment: (id, accountId, comment) => {
      return api.post(`comments`, {
        objectType: "wine",
        objectId: id,
        createdBy: accountId,
        text: comment,
      });
    },

    likeComment: (commentId, accountId, like = true) => {
      if (like) {
        return api.post(`comments/${commentId}/likes/${accountId}`);
      } else {
        return api.delete(`comments/${commentId}/likes/${accountId}`);
      }
    },
  },

  vintages: {
    search: (data) => api.post("search/vintages", data),

    /**
     * Get wine detail data
     * @return {Object} axios promise
     */
    getDetail: (id, extras) => api.get(`vintages/${id}`, extras),

    /**
     * Get wine comments
     * @return {Object} axios promise
     */
    getComments: (id) =>
      api.get(
        `comments?objectId=${id}&objectType=vintage&populate=createdBy,likes&sort=createdAt%20DESC`
      ),

    getRetailers: (id) =>
      api.get(
        `retailervintages?vintage=${id}&populate=retailer,likes&sort=createdAt%20DESC`
      ),

    comment: (id, accountId, comment) => {
      return api.post(`comments`, {
        objectType: "vintage",
        objectId: id,
        createdBy: accountId,
        text: comment,
      });
    },

    likeComment: (commentId, accountId, like = true) => {
      if (like) {
        return api.post(`comments/${commentId}/likes/${accountId}`);
      } else {
        return api.delete(`comments/${commentId}/likes/${accountId}`);
      }
    },

    setWishlist: (vintageId, wishlist) =>
      api.post("profiles/wishlist", {
        vintageID: vintageId,
        wishlist,
      }),

    rate: (vintageId, points, comment) =>
      api.post("rates", { vintageID: vintageId, points, comment }),
  },

  wineries: {
    getAll: (data) => api.get(`wineries`, data),
    getDetail: (id, extra) => api.get(`wineries/${id}`, extra),
    getReputation: (id) => api.get(`wineries/reputation?id=${id}`),
  },

  pairings: {
    /*
     * Fetch the pairing videos for determinated ingredients or foods
     * @param {String} foodType
     * @param {String} ingredients
     * @param {Integer} limit
     * @return {Object} axios promise
     */
    search: (foodType, ingredients, current, limit = false) => {
      if (current) {
        query += `where={"id":{"!":"${current}"}`;
        if (foodType) {
          query += `, "typeOfFoods" : ["${foodType}"]`;
        }

        if (ingredients && ingredients != "") {
          query += `, "ingredients" : ["${ingredients}"]`;
        }

        query += "}";

        if (limit) {
          query += `&limit=${limit}`;
        }
      } else {
        if (foodType || ingredients) {
          query += foodType ? "typeOfFoods=" + foodType + "&" : "";
          query += ingredients ? "ingredients=" + ingredients + "&" : "";
        }

        if (limit) {
          query = query + "limit=" + limit;
        }
      }

      return api.get("pairings" + query);
    },

    /**
     * Fetch related wines based on the pairing.
     */
    relatedWines: (pairing) => {
      return api.get(`wines`, {
        populate: "vintages,winery,zone,subZone",
        limit: 3,
        pairings: pairing,
      });
    },
  },

  profiles: {
    getAll: (page = 0, limit = 30) =>
      api.get(
        `profiles?populate=rates,user,following,followers&page=${page}&limit=${limit}`
      ),
    search: (query, page = 0, limit = 30) =>
      api.get(`search?q=${query}&models=profile&page=${page}&limit=${limit}`),
    getDetail: (id, extras) => api.get(`profiles/${id}`, extras),
    getFeed: (id) => api.post("profiles/activity", { profileID: id }),
    setFollower: (profileID, following = false) => {
      if (following) {
        return api.delete("profiles/follow?profileID=" + profileID);
      } else {
        return api.post("profiles/follow", { profileID: profileID });
      }
    },
  },

  zones: {
    getAll: () => api.get(`zones`),
  },

  subZones: {
    getAll: () => api.get(`subzones`),
  },

  devices: {
    create: (accountId, token, lang, platform) =>
      api.post(`devices`, {
        profile: accountId,
        token,
        lang,
        platform,
      }),

    update: (id, data) => api.put(`devices/${id}`, data),
  },
});
