import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// actions
import { deleteItem, fetchAll } from "../store/slices/listReducer";

// custom component
import EditPs from "./EditPs";

const Details = () => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.list.list);

	useEffect(() => {
		dispatch(fetchAll());
	}, [dispatch]);

	const delfun = (id) => {
		dispatch(deleteItem({ id: id }));
	};

	return (
		<section className="container">
			<table className="table table-striped border">
				<thead>
					<tr>
						<th>#</th>
						<th>title</th>
						<th>username</th>
						<th>description</th>
						<th>last modified</th>
						<th>actions</th>
					</tr>
				</thead>
				<tbody>
					{list.map((l, i) => (
						<tr key={l.id}>
							<td>{1 + i}</td>
							<td>{l.title}</td>
							<td>{l.username}</td>
							<td>{l.description}</td>
							<td>
								{new Date(
									l.passwords[l.passwords.length - 1].datetime
								).toLocaleDateString()}
							</td>
							<td>
								<div className="actions">
									<button
										data-bs-toggle="modal"
										data-bs-target={`#det${l.id}`}
										className="btn btn-info"
									>
										<i className="bi bi-eye"></i>
									</button>
									<button
										className="btn btn-danger rounded"
										style={{ zIndex: 100 }}
										onClick={(e) => delfun(l.id)}
									>
										<i className="bi bi-trash"></i>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{list.map((l) => (
				<EditPs key={l.id} pop={l} />
			))}
		</section>
	);
};

export default Details;
