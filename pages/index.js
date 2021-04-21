import Head from "next/head";
import { connectToDatabase } from "../util/mongodb";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ isConnected }) {
	const fetch = async () => {
		const data = await axios.get("/api/movies");
		const resp = await data.data;
		console.log(resp);
	};
	const postData = async () => {
		const data = { item: "card", john: "oh long johnson" };
		axios.post("/api/movies", data);

		console.log("post");
	};
	const [fetchedData, setFetchedData] = useState([]);
	useEffect(() => {
		fetch();
	});

	return (
		<div>
			<h1>daaamn</h1>
			{console.log(isConnected)}
			<button onClick={postData}>Add data</button>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
	};
}
