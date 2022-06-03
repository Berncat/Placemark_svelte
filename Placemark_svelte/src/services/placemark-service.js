import axios from "axios";
import { user } from "../stores";

export class PlacemarkService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const placemarkCredentials = localStorage.placemark;
    if (placemarkCredentials) {
      const savedUser = JSON.parse(placemarkCredentials);
      user.set({
        email: savedUser.email,
        id: savedUser.userId,
        token: savedUser.token,
        loggedIn: true,
      });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/authenticate`,
        { email, password }
      );
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          id: response.data.userId,
          token: response.data.token,
          loggedIn: true,
        });
        localStorage.placemark = JSON.stringify({
          email: email,
          id: response.data.userId,
          token: response.data.token,
          loggedIn: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      id: "",
      token: "",
      loggedIn: false,
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("placemark");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCategoriesByUser() {
    try {
      const obj = JSON.parse(localStorage.getItem("placemark"));
      const response = await axios.get(
        this.baseUrl + "/api/categories/user/" + obj.id
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async createCategory(name, filter) {
    try {
      const newCategory = {
        name: name,
        filter: filter,
      };
      const obj = JSON.parse(localStorage.getItem("placemark"));
      const response = await axios.post(
        this.baseUrl + "/api/categories/user/" + obj.id,
        newCategory
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async deleteCategory(id) {
    try {
      const response = await axios.delete(
        this.baseUrl + "/api/categories/" + id
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCategory(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories/" + id);
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async editCategory(name, filter, id) {
    try {
      const updatedCategory = {
        name: name,
        filter: filter,
      };
      const response = await axios.post(
        this.baseUrl + "/api/categories/" + id,
        updatedCategory
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }
}
