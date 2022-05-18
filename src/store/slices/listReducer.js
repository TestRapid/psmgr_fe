import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../apis/list";

const initialState = {
	list: []
};

export const fetchAll = createAsyncThunk("list/fetchAll", async () => {
	const res = await api.fetchAll();
	const data = res.data;
	return data;
});

export const addNew = createAsyncThunk("list/addNew", async (obj, thunkApi) => {
	try {
		obj.passwords = [
			{
				password: obj.password,
				datetime: Date.now()
			}
		];
		delete obj.password;
		const res = await api.addNew(obj);
		const data = res.data;
		return data;
	} catch (err) {
		console.log(err);
	}
});

export const editItem = createAsyncThunk(
	"list/editItem",
	async (obj, thunkApi) => {
		try {
			const res = await api.editItem(obj);
			const data = res.data;
			return data;
		} catch (err) {
			console.log(err);
		}
	}
);

export const deleteItem = createAsyncThunk(
	"list/deleteItem",
	async (obj, thunkApi) => {
		try {
			const res = await api.deleteItem(obj.id);
			const data = res.data;
			return { data, id: obj.id };
		} catch (err) {
			console.log(err);
		}
	}
);

export const psmgr = createSlice({
	name: "list",
	initialState,
	reducers: {},
	extraReducers: (s) => {
		s.addCase(fetchAll.fulfilled, (state, action) => {
			action.payload.sort(
				(a, b) =>
					b.passwords[b.passwords.length - 1].datetime -
					a.passwords[a.passwords.length - 1].datetime
			);
			state.list = action.payload;
		});
		s.addCase(addNew.fulfilled, (state, action) => {
			state.list.unshift(action.payload);
		});
		s.addCase(deleteItem.fulfilled, (state, action) => {
			state.list = state.list.filter((li) => li.id !== action.payload.id);
		});
		s.addCase(editItem.fulfilled, (state, action) => {
			state.list = state.list.map((f) => {
				if (f.id === action.payload.id) {
					return action.payload;
				}
				return f;
			});
		});
	}
});

export const actions = psmgr.actions;
export default psmgr.reducer;
