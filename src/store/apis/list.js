import axios from "axios";

// export const api = axios.create({
// 	baseURL: "http://localhost/<pas>/psmgr"
// });

// export const fetchAll = () => api.get("/get_ps.php");
// export const addNew = (obj) => api.post("/add_ps.php", obj);
// export const editItem = (id) => api.post(`/delete_ps.php?id=${id}`);
// export const deleteItem = (obj) => api.post(`/update_ps.php?id=${obj.id}`, obj);

export const api = axios.create({
	baseURL: "http://localhost:5000/psmgr"
});

export const fetchAll = () => api.get("/");
export const addNew = (obj) => api.post("/", obj);
export const editItem = (obj) => api.patch(`/${obj.id}`, obj);
export const deleteItem = (id) => api.delete(`/${id}`);
