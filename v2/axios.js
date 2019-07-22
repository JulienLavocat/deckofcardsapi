const axios = require("axios").default;
const CardError = require("./cardError");

//TODO: use baseUrl property
//axios.defaults.baseURL = "https://api.themoviedb.org/3/"

module.exports = async function (url, config) {
	url = encodeURI(url);

	try {
		const result = await axios.get(url, config);
		return result;
	} catch (error) {
		if (error.response) {
			if (error.response.status === 401)
				throw new CardError(401, "Permission denied")

			if (error.response.status === 404) {
				//console.log(error.response);

				throw new CardError(404, "Resource not found");
			}


		} else if (error.request) {
			throw new CardError(103, "No response received");
		} else {
			throw error;
		}
	}

}